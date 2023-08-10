import { Form, Input, Checkbox } from "antd";
import { DataForm } from "../../interfaces/regiterUpload";

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const FirstStep = ({ formData }: { formData: any }) => {
  const [form] = Form.useForm();

  const handleFormChange = (changedValues: any, allValues: DataForm) => {
    formData.current = allValues;
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={handleFormChange}
      scrollToFirstError
      name="register"
    >
      <Form.Item
        label="Tên đăng nhập"
        name="username"
        rules={[{ required: true, message: "Vui lòng nhập Tên đăng nhập !" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Mật khẩu"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập Mật khẩu !",
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Xác nhận mật khẩu"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Vui lòng xác nhận lại Mật khẩu!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Xác nhận mật khẩu không đúng !")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: "email",
            message: "Email không đúng định dạng",
          },
          {
            required: true,
            message: "Vui lòng nhập E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
        {...tailFormItemLayout}
      >
        {/* <Checkbox>
          Tôi đồng ý với <a href="">Điều khoản sử dụng</a>
        </Checkbox> */}
      </Form.Item>
    </Form>
  );
};
