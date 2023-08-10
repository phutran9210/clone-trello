import { Button, Modal } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SuccessModal: React.FC = () => {
  const [modal, contextHolder] = Modal.useModal();
  const navigate = useNavigate();
  const countDown = () => {
    let secondsToGo = 5;

    const instance = modal.success({
      title: "Hoàn tất đăng kí",
      content: `Sẽ chuyển về trang chủ sau ${secondsToGo} giây.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Sẽ chuyển về trang chủ sau ${secondsToGo} giây.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
      navigate("/");
    }, secondsToGo * 1000);
  };
  useEffect(() => {
    countDown();
  }, []);

  return <>{contextHolder}</>;
};

export default SuccessModal;
