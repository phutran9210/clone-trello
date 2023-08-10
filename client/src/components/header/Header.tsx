import React, { useState, useEffect } from "react";
import type { MenuProps } from "antd";
import { Menu, message } from "antd";
import {
  DownOutlined,
  HolderOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  LoginOutlined,
  LogoutOutlined,
  NotificationOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./header.css";
import logo from "../../assets/trello-icon-png-21.jpg";
import Search from "./search/Search";
import { useNavigate } from "react-router-dom";
import { resultData } from "../redux/selectors/selector";
import { useSelector } from "react-redux";
import ResultModal from "./search/ResultModal";
import axios from "axios";

function useAuth() {
  const [isAuthChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    console.log("run???");

    axios
      .get("http://localhost:3000/auth/status", { withCredentials: true })
      .then((response) => {
        console.log(response.data);

        setLoggedIn(true);
        setAuthChecked(true);
      })
      .catch((error) => {
        console.log(error);

        setLoggedIn(false);
        setAuthChecked(true);
      });
  }, []);

  return { isAuthChecked, isLoggedIn };
}

const HeaderContent: React.FC = () => {
  const { isAuthChecked, isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const resultSearch = useSelector(resultData);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };
  const handleRegisterClick = () => {
    navigate("/register");
  };
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogoutClick = async () => {
    await axios
      .post(`http://localhost:3000/user/logout`, {}, { withCredentials: true })
      .then((respone) => {
        if (respone.data === 200) {
          navigate("/");
          window.location.reload();
          return message.success("Đăng xuất thành công");
        }
      })
      .catch((error) => {
        message.error("Đã xảy ra lỗi");
      });
  };

  const goHome = () => {
    navigate("/");
  };

  const items: MenuProps["items"] = [
    {
      key: "home",
      icon: <HolderOutlined />,
      onClick: goHome,
    },
    {
      key: "logo",
      label: <img src={logo} style={{ width: "10em", marginRight: "0.5em" }} />,
    },
    {
      label: "Workspace",
      icon: <DownOutlined />,
      key: "workspace",
    },
    {
      label: "Starred",
      key: "starred",
      icon: <DownOutlined />,
    },
    {
      label: "Templates",
      key: "templates",
      icon: <DownOutlined />,
    },
    {
      label: "Create",
      key: "create",
    },
    {
      label: <Search />,
      key: "search",
    },
    {
      icon: <NotificationOutlined />,
      key: "notification",
    },
    {
      icon: <InfoCircleOutlined />,
      key: "info",
    },
    {
      icon: <UserOutlined />,
      key: "user",
      children: isLoggedIn
        ? [
            {
              label: "Trang cá nhân",
              icon: <IdcardOutlined />,
              onClick: () => navigate("/user"),
            },
            {
              label: "Đăng xuất",
              icon: <LogoutOutlined />,
              onClick: handleLogoutClick,
            },
          ]
        : [
            {
              label: "Đăng kí",
              icon: <UserAddOutlined />,
              onClick: handleRegisterClick,
            },
            {
              label: "Đăng nhập",
              icon: <LoginOutlined />,
              onClick: handleLoginClick,
            },
          ],
    },
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      {resultSearch && resultSearch.length > 0 && <ResultModal />}
    </>
  );
};
export default HeaderContent;
