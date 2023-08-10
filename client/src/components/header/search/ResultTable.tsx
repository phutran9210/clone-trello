import React, { useState } from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { resultData } from "../../redux/selectors/selector";
import { useSelector } from "react-redux";
import { inviteUserRequest } from "../../redux/slices/invite";
import { confirmUserRequest } from "../../redux/slices/confirmInvite";
import { useDispatch } from "react-redux";
import { inviteInfo } from "../../interfaces/reduxActions";
import { cancelUserRequest } from "../../redux/slices/cancelInvite";
import { Link } from "react-router-dom";

interface DataType {
  key: string;
  user_id: string;
  username: string;
  sentFriendships: any[];
  requestedFriendships: any[];
}

const ResultTable: React.FC = () => {
  const dataSearch = useSelector(resultData);
  const [invite, setInvite] = useState<string[]>([]);

  const dispatch = useDispatch();

  console.log(dataSearch);

  const dataSource: DataType[] = dataSearch.map(
    (
      dataItem: {
        user_id: string;
        username: string;
        sentFriendships: any[];
        requestedFriendships: any[];
      },
      index
    ) => ({
      key: index.toString(),
      username: dataItem.username,
      user_id: dataItem.user_id,
      sentFriendships: dataItem.sentFriendships,
      requestedFriendships: dataItem.requestedFriendships,
    })
  );

  const loggedUserRaw = localStorage.getItem("loggedUser");
  const loggedUser = loggedUserRaw ? JSON.parse(loggedUserRaw) : null;
  const loggedUserId = loggedUser.user_id;

  const handleAddFriend = (userId: string) => {
    setInvite((prev) => [...prev, userId]);
    const inviteReq: inviteInfo = {
      requesterId: loggedUserId,
      requestedId: userId,
      status: "pending",
    };
    dispatch(inviteUserRequest(inviteReq));
  };

  const handleConfirmFriend = (userId: string) => {
    const confirmReq: inviteInfo = {
      requesterId: loggedUserId,
      requestedId: userId,
      status: "accepted",
    };

    dispatch(confirmUserRequest(confirmReq));
  };
  const handleDeleteFriend = (userId: string) => {
    const cancelReq: inviteInfo = {
      requesterId: loggedUserId,
      requestedId: userId,
      status: "cancel",
    };
    dispatch(cancelUserRequest(cancelReq));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Người dùng",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link to={`/user/${record.user_id}`}>{text}</Link>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (text, record: DataType) => {
        if (loggedUserId === record.user_id) {
          return null;
        }

        const hasSentFriendRequest = record.requestedFriendships.some(
          (friendship) => friendship.requester_id === loggedUserId
        );
        if (hasSentFriendRequest) {
          invite.push(record.user_id);
        }

        const friendshipExists = record.sentFriendships.some(
          (friendship) =>
            friendship.requested_id === loggedUserId &&
            friendship.status_id === 1
        );
        if (friendshipExists) {
          return (
            <>
              <Button
                type="primary"
                onClick={() => handleConfirmFriend(record.user_id)}
              >
                Xác nhận
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => handleDeleteFriend(record.user_id)}
              >
                Xóa
              </Button>
            </>
          );
        }

        const frCheck =
          record.sentFriendships.some(
            (friendship) =>
              friendship.requested_id === loggedUserId &&
              friendship.status_id === 2
          ) ||
          record.requestedFriendships.some(
            (friendship) =>
              friendship.requester_id === loggedUserId &&
              friendship.status_id === 2
          );
        console.log(frCheck);

        if (frCheck) {
          return (
            <Button type="primary" danger>
              Bạn bè
            </Button>
          );
        }

        return (
          <Button
            type={invite.includes(record.user_id) ? "dashed" : "primary"}
            onClick={() => handleAddFriend(record.user_id)}
            danger={invite.includes(record.user_id)}
          >
            {invite.includes(record.user_id) ? "Đã gửi lời mời" : "Kết bạn"}
          </Button>
        );
      },
    },
  ];
  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default ResultTable;
