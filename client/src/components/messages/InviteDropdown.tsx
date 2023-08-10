import React, { useState,useRef, useEffect } from 'react';
import { Button, Input, Dropdown, Menu } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import {useDispatch,useSelector} from "react-redux"
import {createChatRequess,selectedChatUserRequest} from "../redux/slices/createNewChat"
import {inviteUserSelector,loggedUserSelector} from "../redux/selectors/selector"
import {userBasicInfo} from "../interfaces/reduxActions"


const generateRoomId = (userId: string, loggedId: string) => {
  return [userId, loggedId].sort().join("-");
};
const ButtonGroupStyled = styled.div`
  display: flex;
`;

const InviteDropdown: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const userCurrentRef = useRef<userBasicInfo>()
  const [showDropdown, setShowDropdown] = useState(false);
  const responseUser = useSelector(inviteUserSelector)
  const loggedUser = useSelector(loggedUserSelector)
 
  useEffect(()=>{
    if (!loggedUser) {
      return
    }
    userCurrentRef.current = loggedUser
  },[loggedUser])
  
const dispatch = useDispatch()

  const handleInviteClick = () => {
    setShowDropdown(true);
  };

  const handleInviteSubmit = () => {
    const payload = {
      data : inputValue
    }
    dispatch(createChatRequess(payload))
    setInputValue('');
    setShowDropdown(false);
  };

  const handleInviteCancel = () => {
    // Hủy bỏ mời người dùng
    setShowDropdown(false);
  };

  const handleUserItemClick = (user: any) => {
    const roomId = generateRoomId(user.user_id,userCurrentRef.current!.userId)
    const payload = {
      participants : [{user_id : user.user_id,username : user.username}, {user_id : userCurrentRef.current!.userId,username : userCurrentRef.current!.username}],
      roomId :roomId
    }
    dispatch(selectedChatUserRequest(payload))
    
  };

  const menu = (
    <Menu>
     
      {responseUser && responseUser.length > 0 ? (
        responseUser.map((user) => (
          <Menu.Item key={user.user_id} onClick={() => handleUserItemClick(user)}>
            {user.username}
          </Menu.Item>
        ))
      ) : (
       
        <div style={{ padding: '8px' }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleInviteSubmit}
            onBlur={handleInviteCancel}
          />
        </div>
      )}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <ButtonGroupStyled>
        <Button icon={<UserAddOutlined />} type="text" onClick={handleInviteClick}>
          Mời
        </Button>
      </ButtonGroupStyled>
    </Dropdown>
  );
};

export default InviteDropdown;
