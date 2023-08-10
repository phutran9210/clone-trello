import React, { useState, useEffect } from "react";
import { Steps, message, theme } from "antd";
import ReconfirmFirstStep from "./formReConfirm/ReconfirmFirstStep";
import { confirmRegiter, confirmMesage } from "../redux/selectors/selector";
import { useSelector } from "react-redux";
import Confirm from "./formSteps/Confirm";
import SuccessModal from "./formReConfirm/SuccessModal";
import { Modal } from "antd";
import "./formSteps/reconfirm.css";
import { useNavigate } from "react-router-dom";

const ReConfirm: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const confirmCode = useSelector(confirmRegiter);
  const navigate = useNavigate();
  const regiterMessage = useSelector(confirmMesage);

  const handleConfirmSuccess = () => {
    navigate("/");
  };
  const handleConfirmFail = () => {
    Modal.error({
      title: "Đã xảy ra lỗi",
      content: `${regiterMessage}`,
      okText: "Close",
    });
  };

  const next = () => {
    setCurrent(current + 1);
  };

  useEffect(() => {
    if (!confirmCode) {
      return;
    }
    next();
  }, [confirmCode]);

  const steps = [
    {
      title: "Xác thực đăng nhập",
      content: <ReconfirmFirstStep />,
    },
    {
      title: "Hoàn tất xác thực",
      content: (
        <Confirm
          onConfirmSuccess={handleConfirmSuccess}
          onConfirmFail={handleConfirmFail}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    marginLeft: "-3.5em",
  };

  return (
    <div className="reConfirm">
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      {/* {isSuccess && <SuccessModal />} */}
    </div>
  );
};

export default ReConfirm;
