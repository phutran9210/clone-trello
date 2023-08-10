import React, { useState, useRef, useEffect } from "react";
import { Button, message, Steps, theme, Modal } from "antd";
import Confirm from "./formSteps/Confirm";
import { FirstStep } from "./formSteps/firstStep";
import Complete from "./formSteps/Complete";
import { useDispatch, useSelector } from "react-redux";
import { registerUserRequest, setCode } from "../redux/slices/createUser";
import { DataForm } from "../interfaces/regiterUpload";
import { successRegiter, confirmMesage } from "../redux/selectors/selector";
import "./formSteps/regiter.css";
import { useNavigate } from "react-router-dom";

const Regiter: React.FC = () => {
  const formData = useRef<DataForm | null>();
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regiterMessage = useSelector(confirmMesage);
  const success = useSelector(successRegiter);
  console.log(success);

  useEffect(() => {
    if (success && current === 0) {
      setCurrent(current + 1);
    }
    dispatch(setCode(0));
  }, [success]);

  const handleNextClick = () => {
    if (current === 0) {
      const data: DataForm = {
        username: formData.current!.username,
        email: formData.current!.email,
        password: formData.current!.password,
      };
      dispatch(registerUserRequest(data));
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const handleConfirmSuccess = () => {
    setCurrent(current + 1);
  };
  const handleConfirmFail = () => {
    Modal.error({
      title: "Đã xảy ra lỗi",
      content: `${regiterMessage}`,
      okText: "Close",
    });
  };

  const steps = [
    {
      title: "Thông tin đăng kí",
      content: <FirstStep formData={formData} />,
    },
    {
      title: "Xác nhận đăng kí",
      content: (
        <Confirm
          onConfirmSuccess={handleConfirmSuccess}
          onConfirmFail={handleConfirmFail}
        />
      ),
    },
    {
      title: "Hoàn tất đăng kí",
      content: <Complete />,
    },
  ];
  const gohome = () => {
    navigate("/");
    message.success("Success");
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "50vh",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  return (
    <div className="regiter">
      <Steps className="step" current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && current !== 1 && (
          <Button type="primary" onClick={handleNextClick}>
            Tiếp theo
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={gohome}>
            Done
          </Button>
        )}
        {current > 0 && current !== 1 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Quay trở lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default Regiter;
