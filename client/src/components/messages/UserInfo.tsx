import React from "react";
import { Button, Avatar, Typography } from "antd";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

const UserInfo: React.FC = () => {
  return (
    <WrapperStyled>
      <div>
        <Avatar>Avatar</Avatar>
        <Typography.Text className="username">Avatar</Typography.Text>
      </div>
      <Button ghost onClick={() => {}}>
        Đăng xuất
      </Button>
    </WrapperStyled>
  );
};
export default UserInfo;
