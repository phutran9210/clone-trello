import React, { ReactNode, useEffect } from "react";
import {
  LockOutlined,
  MessageOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Card, Typography, Dropdown, Button } from "antd";
import { useParams } from "react-router-dom";
import { profileUserRequest } from "../redux/slices/profile";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { profileSelector, inviteSelector } from "../redux/selectors/selector";
import { inviteInfo } from "../interfaces/reduxActions";
import { inviteUserRequest } from "../redux/slices/invite";
import { blockUserRequest } from "../redux/slices/blockUser";

const { Meta } = Card;
const { Text, Link } = Typography;

interface User {
  user_id: string;
  username: string;
}

interface FriendUser {
  status: number;
  result: User[];
}

interface ForbiddenUser {
  status: number;
  result: {
    username: string;
    email: string;
  };
}

interface NonFriendUser {
  username: string;
  email: string;
}

interface ResultInvite {
  status?: number;
  message?: string;
}

const Profile: React.FC = () => {
  const { userID } = useParams();
  const dispatch = useDispatch();
  let isFriendUser: FriendUser | NonFriendUser | ForbiddenUser =
    useSelector(profileSelector);
  const resultInvite: ResultInvite = useSelector(inviteSelector);

  const loggedUserRaw = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
  const loggedUserId = loggedUser.user_id;

  useEffect(() => {
    dispatch(profileUserRequest(userID));
  }, [dispatch]);

  const isFriend = "status" in isFriendUser && isFriendUser.status === 200;
  const isForbidden = "status" in isFriendUser && isFriendUser.status === 403;
  const isResult = "result" in isFriendUser;

  const items: MenuProps["items"] = isFriendUser?.result?.map((user) => ({
    key: user.user_id,
    label: user.username,
  }));

  const addFriend = () => {
    const infoReq: inviteInfo = {
      requesterId: loggedUserId,
      requestedId: userID!,
      status: "pending",
    };
    dispatch(inviteUserRequest(infoReq));
  };

  const blockFriend = () => {
    const infoReq: inviteInfo = {
      requesterId: loggedUserId,
      requestedId: userID!,
      status: "block",
    };
    dispatch(blockUserRequest(infoReq));
  };

  const getTitle = (): ReactNode => {
    if (
      isForbidden &&
      "result" in isFriendUser &&
      typeof isFriendUser.result !== "undefined" &&
      isFriendUser.result && // Add this line
      "username" in isFriendUser.result
    ) {
      return isFriendUser.result.username;
    } else if (isFriendUser.user && "username" in isFriendUser.user) {
      // And this line
      return isFriendUser.user.username;
    } else {
      return "N/A";
    }
  };

  return (
    <>
      <Card
        style={{ width: 300 }}
        actions={[
          resultInvite.status === 200 ? (
            <UserSwitchOutlined key="switch" />
          ) : isFriend ? (
            <UserOutlined key="userOutlined" />
          ) : isForbidden ? (
            <UserAddOutlined key="addFriend" onClick={addFriend} />
          ) : null,
          <MessageOutlined key="sendMesseger" />,
          <LockOutlined onClick={blockFriend} />,
        ]}
      >
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          title={getTitle()}
          description="Welcome to my profile"
        />
      </Card>
      <Dropdown
        menu={{ items }}
        placement="top"
        arrow={{ pointAtCenter: true }}
      >
        <Button type="dashed" danger>
          {isFriend && Array.isArray(isFriendUser.result) && (
            <>Bạn chung : {isFriendUser.result.length}</>
          )}
        </Button>
      </Dropdown>
    </>
  );
};

export default Profile;
