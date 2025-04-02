import React, { useEffect, useState } from "react";
import { Modal, Menu, Button } from "antd";
import { MenuProps } from "antd";
import Layout from "antd/es/layout";
import { Outlet, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  SettingOutlined,
  FileOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import logo from "image/logo.png";
import { StyledHome } from "styles/homestyle";
import InfiniteScroll from "react-infinite-scroll-component";

const { Sider, Header, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
export const HomeLayout: React.FC = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState<boolean | undefined>(false);
  const [showAlert, setShowAlert] = useState<boolean | undefined>(false); // Alert 표시 여부 상태

  const items: MenuItem[] = [
    { key: "list", label: "목록" },
    { key: "board", label: "게시판 등록" },
    { key: "calendar", label: "캘린더" },
  ];

  // 로그아웃 모달폼 관련
  const btnConfirm = () => {
    setShowAlert(false); // Alert 닫기
    handleLogoutRequest();
  };
  const btnCancel = () => {
    setShowAlert(false); // Alert 닫기
  };
  const handleLogout = () => {
    setShowAlert(true); // Alert 표시
  };

  // 로그아웃 API 호출
  const handleLogoutRequest = () => {
    fetch("https://localhost:8443/account/logout", {
      method: "POST",
      credentials: "include",
    })
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  };

  return (
    <StyledHome>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="left_sider"
        >
          <div className="demo-logo-vertical" />
          <div className="logo-img-box">
            <img
              src={logo}
              alt="Logo"
              className="logo-img"
              onClick={() => {
                navigate("/home");
              }}
            />
          </div>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            onClick={(item) => {
              navigate(`/home/${item.key}`);
            }}
          />
        </Sider>
        {!collapsed && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            className="mobile-left-sider"
          >
            <div className="logo-img-box">
              <img src={logo} alt="Logo" className="logo-img" />
            </div>
            <Menu
              className="mobile-sider"
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={items}
              onClick={(item) => {
                navigate(`/home/${item.key}`);
                setCollapsed(!collapsed);
              }}
            />
          </Sider>
        )}
        <Layout>
          <Header>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                setCollapsed(!collapsed);
              }}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Button onClick={handleLogout} style={{ right: 0 }}>
              로그아웃
            </Button>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </StyledHome>
  );
};
