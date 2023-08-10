import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input, Typography, Divider } from "antd";
import {
  confirmRegiter,
  user_idRegiter,
  confirmSuccess,
} from "../../redux/selectors/selector";
import { confirmRequest } from "../../redux/slices/confirmRegister";

interface FormValues {
  confirmCode: string;
}
const Confirm: React.FC<{
  onConfirmSuccess: () => void;
  onConfirmFail: () => void;
}> = ({ onConfirmSuccess, onConfirmFail }) => {
  const [form] = Form.useForm();
  const confirmCode = useSelector(confirmRegiter);
  const user_id = useSelector(user_idRegiter);
  const success = useSelector(confirmSuccess);
  console.log(success);

  const dispatch = useDispatch();

  const [, forceUpdate] = useState({});

  useEffect(() => {
    forceUpdate({});
  }, []);

  useEffect(() => {
    if (success === 200) {
      onConfirmSuccess();
    } else if (success === 400) {
      onConfirmFail();
    }
  }, [success, onConfirmSuccess, onConfirmFail]);

  const onFinish = (values: FormValues) => {
    dispatch(confirmRequest({ user_id: user_id, code: values.confirmCode }));
  };

  return (
    <>
      <Typography.Title level={3}>Mã xác nhận đăng nhập</Typography.Title>
      <Typography.Paragraph copyable>{confirmCode}</Typography.Paragraph>
      <Form
        form={form}
        name="horizontal_login"
        layout="inline"
        onFinish={onFinish}
      >
        <Form.Item
          name="confirmCode"
          rules={[{ required: true, message: "Vui lòng nhập mã xác nhận!" }]}
        >
          <Input className="site-form-item-icon" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Xác nhận
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default Confirm;
