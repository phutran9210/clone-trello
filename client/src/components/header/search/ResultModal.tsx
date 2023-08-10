import React, { useState, useEffect } from "react";
import { resultData } from "../../redux/selectors/selector";
import { useSelector } from "react-redux";
import { Modal } from "antd";
import ResultTable from "./ResultTable";
const ResultModal: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const searchChange = useSelector(resultData);
  console.log("modal", searchChange);

  const hideModal = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    if (!searchChange) {
      return;
    }
    setModalVisible(true);
  }, [searchChange]);

  return (
    <div>
      <Modal
        title="Kết quả tìm kiếm"
        open={modalVisible}
        onCancel={hideModal}
        footer={null}
      >
        <ResultTable />
      </Modal>
    </div>
  );
};

export default ResultModal;
