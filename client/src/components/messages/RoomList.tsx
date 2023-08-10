import React,{useEffect} from "react";
import { Collapse, Typography, Button } from "antd";
import styled from "styled-components";
import {useParams} from "react-router-dom"
import {getPreviewChatRequet,selectRoom} from "../redux/slices/getPreviewChat"
import {useDispatch,useSelector} from "react-redux"
import {previewChatSelector} from "../redux/selectors/selector"
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }

    .add-room {
      color: white;
      padding: 0;
    }
  }
`;

const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;

const RoomList: React.FC = () => {
  const dispatch = useDispatch()
  const { userID } = useParams();
  const previewChatData = useSelector(previewChatSelector)
  console.log(previewChatData);
  
useEffect(()=>{
  dispatch(getPreviewChatRequet(userID))
},[])

  const setSelectedRoomId = (room_name) => {
    dispatch(selectRoom(room_name))
  };

  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách chat" key="1">
        {previewChatData.map((room,index) => (
          <LinkStyled key={index} onClick={() => setSelectedRoomId(room.room_name)}>
            {room.room_name}
          </LinkStyled>
        ))}
      </PanelStyled>
    </Collapse>
  );
};
export default RoomList;
