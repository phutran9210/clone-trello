import React, { useState, useEffect,ChangeEvent,useRef } from "react";
import socketIOClient from "socket.io-client";
import { Socket } from "socket.io-client";
import axios from "axios";
import { message, notification } from "antd";
import {
  openChatWindowRequest,
  closeChatWindow,
} from "../redux/slices/chatWindow";
import {changeChatState,getPreChat} from "../redux/slices/getChat"
import ChatWindow from "./ChatWindow";
import { useDispatch } from "react-redux";
import {inputChatData} from "../redux/selectors/selector"
import { useSelector } from "react-redux";

const ENDPOINT = "http://localhost:3000";




interface User {
  UserId: string;
  Name: string;
}

const users: User[] = [
  { UserId: "2HIrE6EJnLS2Sw_LbZWyc", Name: "phutran.jp1" },
  { UserId: "702d840b48", Name: "phutran167" },
];

function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [loggedId, setLoggedId] = useState("");
  const [currentRoom, setCurrentRoom] = useState<string>("");
  const currentRoomRef = useRef<string>("");
  const currentUserNameRef = useRef<string>("");
  const dispatch = useDispatch();
  const inputChat = useSelector(inputChatData)
  if (!currentRoomRef.current) {
    currentRoomRef.current = currentRoom;
  }
  
  useEffect (()=>{
    if (!inputChat) {
      return
    }
    const _sendMessage = async () => {
      if (socket && inputChat.trim() !== "") {
   
        const roomname = currentRoom ?  currentRoom : currentRoomRef.current
     
        const messageObject = {
          sender_id: loggedId,
          content: inputChat,
          room: roomname,
        };
        socket.emit("message", messageObject);
        const mesPushToState ={
          content : inputChat,
          create_at : Date.now(),
          sender_id : loggedId,
          sender_name : currentUserNameRef.current
        }
        dispatch(changeChatState({room :  roomname, content :mesPushToState }))
        console.log(mesPushToState);
        
      }
    };
    _sendMessage()
  },[inputChat])

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

        setLoggedId(userId);
        const socket = socketIOClient(ENDPOINT, { query: { userId: userId } });

        setSocket(socket);

        socket.on("message", (data: any) => {
          console.log("đây là data",data);
        const roomCurrent = currentRoom ? currentRoom : currentRoomRef.current

          if (data?.room  === roomCurrent ) {
              const payload: string = data.room;
              dispatch(openChatWindowRequest(payload));
          if (data.content.sender_id !== userId ) {
            dispatch(changeChatState(data))
          }
            
          }
          // if (data === roomCurrent) {
          //   dispatch(openChatWindowRequest(data));
          // }

      
          
        });

        socket.on("error", (error) => {
          message.error(`Error: ${error.message}`);
        });

        socket.on("invite", (data) => {
          console.log(data);
          if (data.room) {
            socket.emit("joinRoom", data.room);
            currentRoomRef.current = data.room;
            dispatch(getPreChat(data.room))
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

  const handleUserClick = (user: User) => {
    const roomId = generateRoomId(loggedId, user.UserId);
    setCurrentRoom(roomId)
    joinRoom(roomId);
    inviteToRoom(user.UserId, roomId);
    dispatch(openChatWindowRequest(roomId));
  };

  const joinRoom = (roomId: string) => {
    console.log(roomId);
    
    if (socket) {
      socket.emit("joinRoom", roomId);
      setCurrentRoom(roomId);
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

  const generateRoomId = (userId: string, loggedId: string) => {
    return [userId, loggedId].sort().join("-");
  };



  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.UserId} onClick={() => handleUserClick(user)}>
            {user.Name}
          </li>
        ))}
      </ul>
           <ChatWindow />
    </div>
  );
}

export default Chat;
