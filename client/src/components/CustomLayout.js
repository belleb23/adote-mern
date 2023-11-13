import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Menu, Badge, Avatar, Dropdown } from "antd";
import {
  HomeOutlined,
  HeartOutlined,
  CalendarOutlined,
  WalletOutlined,
  TeamOutlined,
  UserOutlined
} from "@ant-design/icons";
import UserDropdown from "./UserDropdown";

const { Sider } = Layout;
const { SubMenu } = Menu; // Importe SubMenu

function CustomLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Início",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      name: "Adoções",
      path: "/user-adoptions",
      icon: <HeartOutlined />,
    },
    {
      name: "Visitas",
      path: "/appointments",
      icon: <CalendarOutlined />,
    },
    {
      name: "Doações",
      path: "/applications",
      icon: <WalletOutlined />,
    },
    {
      name: "Ser Voluntário",
      path: "/apply-volunteer",
      icon: <WalletOutlined />,
    },
  ];

  const volunterMenu = [
    {
      name: "Início",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      name: "Pets",
      path: "/pets",
      icon: <HeartOutlined />,
    },
    {
      name: "Adoções",
      path: "/volunteer/applications",
      icon: <HeartOutlined />,
    },
    {
      name: "Visitas",
      path: "/calendar-test",
      icon: <CalendarOutlined />,
    },
    {
      name: "Doações",
      path: `/volunteer/profile/${user?._id}`,
      icon: <WalletOutlined />,
    },
  ];

  const adminMenu = [
    {
      name: "Início",
      path: "/",
      icon: <HomeOutlined />,
    },
    {
      name: "Usuários",
      path: "/admin/list",
      icon: <TeamOutlined />,
      children: [ // Adicione o sub-menu aqui
        {
          name: "Adotantes",
          path: "/admin/adopters",
          icon: <UserOutlined />,
        },
        {
          name: "Voluntários",
          path: "/admin/volunteers",
          icon: <UserOutlined />,
        },
      ],
    },
    {
      name: "Pets",
      path: "/pets",
      icon: <HeartOutlined />,
    },
    {
      name: "Visitas",
      path: "/appointments",
      icon: <CalendarOutlined />,
    },
  ];

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isVolunter
    ? volunterMenu
    : userMenu;

  const role = user?.isAdmin ? "Admin" : user?.isVolunter ? "Voluntário" : "Adotante";

  const userMenuItems = [
    <Menu.Item key="notifications">
      <Badge count={user?.unseenNotifications.length}>
        <Link to="/notifications">
          <i className="ri-notification-line header-action-icon px-3"></i>
        </Link>
      </Badge>
    </Menu.Item>,
    <Menu.Item key="chat">
      <i className="ri-chat-1-line header-action-icon px-3"></i>
    </Menu.Item>,
    <Menu.Item key="userDropdown">
      <UserDropdown user={user} />
    </Menu.Item>,
  ];

  const userMenuDropdown = (
    <Menu>{userMenuItems.map((item, index) => React.cloneElement(item, { key: index.toString() }))}</Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(isCollapsed) => setCollapsed(isCollapsed)}
        theme="light"
      >
        <div className="logo">
          <h1>AdoteVL</h1>
        </div>
        <Menu theme="light" mode="vertical" defaultSelectedKeys={[location.pathname]}>
          {menuToBeRendered.map((menu) => {
            if (menu.children) {
              return (
                <SubMenu key={menu.path} icon={menu.icon} title={menu.name}>
                  {menu.children.map((subItem) => (
                    <Menu.Item key={subItem.path} icon={subItem.icon}>
                      <Link to={subItem.path}>{subItem.name}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <Menu.Item key={menu.path} icon={menu.icon}>
                  <Link to={menu.path}>{menu.name}</Link>
                </Menu.Item>
              );
            }
          })}
        </Menu>
        <div className="menu-item" onClick={() => navigate("/login")}>
          <i className="ri-logout-circle-line"></i>
          <Link to="/login">Logout</Link>
        </div>
      </Sider>
      <Layout className="site-layout">
        <div className="header">
          <div className="d-flex align-items-center px-4">
            <Dropdown overlay={userMenuDropdown} trigger={["click"]}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Avatar
                  style={{
                    backgroundColor: "#87d068",
                  }}
                >
                  {user?.name.charAt(0).toUpperCase()}
                </Avatar>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="body">{children}</div>
      </Layout>
    </Layout>
  );
}

export default CustomLayout;
