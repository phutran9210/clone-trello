import React from "react";
import { Button, Result } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const NotFound: React.FC = () => (
  <Result
    title="404"
    icon={<FrownOutlined style={{ color: "red" }} />}
    subTitle="Xin lỗi, trang không tồn tại"
    extra={<Button type="primary">Back Home</Button>}
  />
);

export default NotFound;
