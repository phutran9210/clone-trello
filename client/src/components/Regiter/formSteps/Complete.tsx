import React, { useEffect, useState } from "react";
import { SmileOutlined } from "@ant-design/icons";
import { Result } from "antd";
import { useNavigate } from "react-router-dom";

const Complete: React.FC = () => {
  let navigate = useNavigate();
  // const [count, setCount] = useState(15);
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount((prevCount) => prevCount - 1);
  //     console.log("ac");
  //   }, 1000);
  //   const timeout = setTimeout(() => {
  //     navigate("/");
  //   }, 15000);
  //   return () => {
  //     clearTimeout(timer);
  //     clearTimeout(timeout);
  //   };
  // }, [navigate]);

  return (
    <div>
      <Result
        icon={<SmileOutlined />}
        title="Great, we have done all the operations!"
        // subTitle={`Returning to home in ${count} seconds...`}
      />
    </div>
  );
};

export default Complete;
