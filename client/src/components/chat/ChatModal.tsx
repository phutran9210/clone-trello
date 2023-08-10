// ChatModal.tsx
import React, { useState } from "react";
import { Modal, Input, List } from "antd";

interface Message {
  ioID: string;
  content: {
    sender: string;
    content: string;
  };
  room: string;
}

interface Props {
  visible: boolean;
  messages: Message[];
  sendMessage: (message: string) => void;
  onClose: () => void;
}

const ChatModal: React.FC<Props> = ({
  visible,
  messages,
  sendMessage,
  onClose,
}) => {
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <Modal title="Chat" open={visible} onOk={onClose} onCancel={onClose}>
      <List
        itemLayout="horizontal"
        dataSource={messages}
        renderItem={(msg, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              title={msg.content?.sender}
              description={msg.content?.content}
            />
          </List.Item>
        )}
      />
      <Input
        value={newMessage}
        onChange={handleNewMessageChange}
        onPressEnter={handleSendMessage}
      />
    </Modal>
  );
};

export default ChatModal;
