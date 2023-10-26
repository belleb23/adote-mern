import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const userMenu = [
    {
      name: "Início",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Adoções",
      path: "/appointments",
      icon: "ri-heart-line",
    },
    {
      name: "Visitas",
      path: "/applications",
      icon: "ri-calendar-line",
    }
    ,
    {
      name: "Doações",
      path: "/applications",
      icon: "ri-wallet-3-line",
    }
  ];

  const volunterMenu = [
    {
      name: "Início",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Pets",
      path: "/volunter/appointments",
      icon: "ri-heart-line",
    },
    {
      name: "Doações",
      path: `/volunter/profile/${user?._id}`,
      icon: "ri-wallet-3-line",
    },
  ];

  const adminMenu = [
    {
      name: "Início",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Usuários",
      path: "/admin/list",
      icon: "ri-team-line",
    },
   
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isVolunter ? volunterMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isVolunter ? "Voluntário" : "Adotante";

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">AdoteVL</h1>
            <h1 className="role">{role}</h1>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;