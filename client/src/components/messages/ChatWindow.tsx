import socketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";
import axios from "axios";
import { UserAddOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Message from "./Message";
import InviteDropdown from "./InviteDropdown"
import { Button, Tooltip, Avatar, Form, Input, Alert,message,notification } from "antd";
import {userBasicInfo} from "../interfaces/reduxActions"
import {dataRoomSelector,roomNameSelector,inviteUserSelector,selectedUserSelector} from "../redux/selectors/selector"
import {useDispatch,useSelector} from "react-redux"
import {updateRoomData,setLoggedUserRequest,getPreviewData,setFirstRoomRequest} from "../redux/slices/getPreviewChat"

export const generateRoomId = (userId: string, loggedId: string) => {
  return [userId, loggedId].sort().join("-");
};

const ENDPOINT = "http://localhost:3000";

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);

  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__title {
      margin: 0;
      font-weight: bold;
    }

    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

const ChatWindow: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loggedId, setLoggedId] = useState("");
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const currentRoomRef = useRef<string>("");
  const currentUserNameRef = useRef<string>("");
  const dispatch = useDispatch();

  if (!currentRoomRef.current) {
    currentRoomRef.current = currentRoom;
  }
  const dataRoom = useSelector(dataRoomSelector)
  const selectedRoom = useSelector(roomNameSelector)
  const selectedUserId = useSelector(selectedUserSelector)
  console.log("đây là room",dataRoom.messages);

useEffect(()=>{
if (!selectedUserId) {
  return
}
const handleUserClick = () => {
  const roomId = generateRoomId(loggedId, selectedUserId);
  setCurrentRoom(roomId);
  joinRoom(roomId);
  inviteToRoom(selectedUserId, roomId);
};
handleUserClick()
},[selectedUserId])

useEffect(()=>{
  if (!selectedRoom) {
    return
  }
  currentRoomRef.current = selectedRoom
  joinRoom(selectedRoom);
  const userIds = selectedRoom.split("-")
  const remainingUserId = userIds.filter((userId) => userId !== loggedId)[0];
  inviteToRoom(remainingUserId, selectedRoom);
},[selectedRoom])

  useEffect(() => {
    const fetchTokenAndInitializeSocket = async () => {
      try {
        const response = await axios.post(
          `${ENDPOINT}/user/get-token`,
          {},
          { withCredentials: true }
        );
        const userId = response.data.userId;
        const username = response.data.username;
        currentUserNameRef.current = username;
        const userInfo : userBasicInfo = {
          userId : userId,
          username : username
        }
        dispatch(setLoggedUserRequest(userInfo))
        setLoggedId(userId);
        const socket = socketIOClient(ENDPOINT, { query: { userId: userId } });

        setSocket(socket);

        socket.on("message", (data: any) => {
          console.log("đây là data",data);
        const roomCurrent = currentRoom ? currentRoom : currentRoomRef.current
          if (data.room && data.content) {
            console.log("lần 2");
            
            dispatch(updateRoomData(data))
          }

          if (data  === roomCurrent ) {
            console.log("lần 1");
            
            dispatch(setFirstRoomRequest(data))
            
          // if (data.content.sender_id !== userId ) {
          //   // dispatch(changeChatState(data))
          // }
            
          }

        });

        socket.on("error", (error) => {
          message.error(`Error: ${error.message}`);
        });

        socket.on("invite", (data) => {
          console.log(data);
          if (data.room) {
            socket.emit("joinRoom", data.room);
            currentRoomRef.current = data.room;
            console.log(data.room);
            
            dispatch(getPreviewData(data.room))
          }
        });

        return () => {
          socket.disconnect();
        };
      } catch (error) {
        console.log(error);
      }
    };

    fetchTokenAndInitializeSocket();
  }, []);
  
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
console.log(inputValue);

  const handleOnSubmit = () => {
    const room_name = dataRoom.room_name
    if (inputValue.trim() !== "") {
      const messageObject = {
        sender_id: loggedId,
        content: inputValue,
        room: room_name,
      };
     
      if (socket) {
        socket.emit("message", messageObject); 
       
        form.resetFields();
      }
    }
   
  };


  const joinRoom = (roomId: string) => {
    console.log(roomId);
    
    if (socket) {
      socket.emit("joinRoom", roomId);
      // setCurrentRoom(roomId);
    }
  };

  const inviteToRoom = (recipientId: string, roomId: string) => {
    if (socket) {
      const inviteMessage = {
        sender: loggedId,
        content: `Please join me in room ${roomId}`,
        room: roomId,
      };
      console.log(inviteMessage);
      
      socket.emit("invite", { payload: inviteMessage, recipientId });
    }
  };
  console.log("đây là room",currentRoomRef.current);
  

  return (
   <>
    <WrapperStyled>
      {dataRoom ? (
        <>
          <HeaderStyled>
            <div className="header__info">
              <p className="header__title">{dataRoom?.room_name}</p>
              <span className="header__description">
                Đây là mô tả
              </span>
            </div>
            <InviteDropdown/>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled ref={messageListRef}>
              {dataRoom?.messages?.map((mes,index) => (
                <Message
                  key={index}
                  text={mes.content}
              
                  displayName={mes.sender_name}
                  createdAt={mes.create_at}
                />
              ))}
            </MessageListStyled>
            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  // ref={inputRef}
                  onChange={handleInputChange}
                  onPressEnter={handleOnSubmit}
                  placeholder="Nhập tin nhắn..."
                  bordered={false}
                  autoComplete="off"
                  value={inputValue}
                />
              </Form.Item>
              <Button type="primary" onClick={handleOnSubmit}>
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </>
      ) : (
        <Alert
          message="Hãy chọn phòng"
          type="info"
          showIcon
          style={{ margin: 5 }}
          closable
        />
      )}
    </WrapperStyled>
    </>
  );
};

export default ChatWindow;
