import React from "react";
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { registerConfirmUserRequest } from "../../redux/slices/createUser";
import { useDispatch } from "react-redux";

const ReconfirmFirstStep: React.FC = () => {
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    const userConfirm = {
      username: values.username,
      password: values.password,
    };
    dispatch(registerConfirmUserRequest(userConfirm));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Typography.Title level={3}>
        Vui lòng đăng nhập để lấy mã xác nhận
      </Typography.Title>

      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default ReconfirmFirstStep;
