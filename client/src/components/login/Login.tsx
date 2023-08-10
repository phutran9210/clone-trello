import {
  LockOutlined,
  UserOutlined,
  FacebookOutlined,
  GoogleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Space, message, Modal } from "antd";
import type { CSSProperties } from "react";
import { loginUserRequest, setErr } from "../redux/slices/loginUser";
import { useDispatch, useSelector } from "react-redux";
import { messageErr, messageSuccess } from "../redux/selectors/selector";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const iconStyles: CSSProperties = {
  marginInlineStart: "16px",
  color: "#69b1ff",
  fontSize: "24px",
  verticalAlign: "middle",
  cursor: "pointer",
};

const Login: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mesErr = useSelector(messageErr);
  console.log(mesErr);

  const mesSuccess = useSelector(messageSuccess);

  useEffect(() => {
    if (!mesErr) {
      return;
    }
    if (mesErr === "User is not active") {
      setIsModalVisible(true);
      dispatch(setErr());
    } else if (mesErr === "Invalid username or password.") {
      Modal.error({
        title: "Đã xảy ra lỗi",
        content: `Tài khoản hoặc mật khẩu không đúng`,
        okText: "Close",
      });
      dispatch(setErr());
    }
  }, [mesErr, dispatch]);

  useEffect(() => {
    if (!mesSuccess) {
      return;
    }
    setIsSuccessModalVisible(true);
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [mesSuccess]);

  useEffect(() => {
    if (countdown <= 0) {
      setIsSuccessModalVisible(false);
      setCountdown(5);
      navigate("/");
    }
  }, [countdown]);

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/reconfirm");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFinish = async (values: any): Promise<boolean | void> => {
    const userInfoLogin = {
      username: values.username,
      password: values.password,
    };
    dispatch(loginUserRequest(userInfoLogin));
  };
  return (
    <>
      <ProConfigProvider hashed={false}>
        <div style={{ backgroundColor: "white" }}>
          <LoginForm
            onFinish={handleFinish}
            submitter={{
              searchConfig: {
                submitText: "Đăng nhập",
              },

              submitButtonProps: {
                size: "large",
              },
            }}
            // logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
            // title="Github"
            // subTitle="Nền tảng lưu trữ mã nguồn lớn nhất thế giới"
            actions={
              <Space>
                Hoặc đăng nhập bằng
                <FacebookOutlined style={iconStyles} />
                <GoogleOutlined style={iconStyles} />
                <GithubOutlined style={iconStyles} />
              </Space>
            }
          >
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={"Tên đăng nhập"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tên đăng nhập!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: "large",
                  prefix: <LockOutlined className={"prefixIcon"} />,
                }}
                placeholder={"Mật khẩu"}
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập mật khẩu!",
                  },
                ]}
              />
            </>
            <div
              style={{
                marginBlockEnd: 24,
              }}
            >
              <ProFormCheckbox noStyle name="autoLogin">
                Tự động đăng nhập
              </ProFormCheckbox>
              <a
                style={{
                  float: "right",
                }}
              >
                Quên mật khẩu
              </a>
            </div>
          </LoginForm>
        </div>
      </ProConfigProvider>
      <Modal
        title="Đã xảy ra lỗi"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Tài khoản chưa kích hoạt</p>
        <p>Bạn có muốn chuyển tới trang xác nhận tài khoản không ?</p>
      </Modal>
      <Modal
        title="Đăng nhập thành công"
        open={isSuccessModalVisible}
        footer={null}
        closable={false}
      >
        <p>
          Đăng nhập thành công, sẽ tự chuyển hướng về trang chủ sau {countdown}{" "}
          giây...
        </p>
      </Modal>
    </>
  );
};

export default Login;
