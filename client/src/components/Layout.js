import React, { useState } from "react";
import "../layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "antd";
import UserDropdown from "./UserDropdown";
import { clearUser } from "../redux/userSlice";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch(); 

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
      path: "/user-adoptions",
      icon: "ri-heart-line",
    },
    {
      name: "Visitas",
      path: `/appointments`,
      icon: "ri-calendar-line",
    },
    {
      name: "Ser Voluntário",
      path: "/apply-volunter",
      icon: "ri-hand-heart-line",
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
      path: "/pets",
      icon: "ri-heart-line",
    },
    {
      name: "Adoções",
      path: "/volunter/applications",
      icon: "ri-hand-heart-line",
    },
    {
      name: "Visitas",
      path: "/calendario-teste",
      icon: "ri-calendar-line",
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
    {
      name: "Pets",
      path: "/pets",
      icon: "ri-heart-line",
    },
    {
      name: "Visitas",
      path: `/admin-appointments`,
      icon: "ri-calendar-line",
    },
   
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isVolunter ? volunterMenu : userMenu;
  const role = user?.isAdmin ? "Admin" : user?.isVolunter ? "Voluntário" : "Adotante";

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            {user && (
              <>
                <h1 className="logo">AdoteVL</h1>
                <br/>
                <h1 className="role">{user.name} - {role}</h1>
              </>
            )}
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
                dispatch(clearUser());
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

              {/* <i className="ri-chat-1-line header-action-icon px-3"></i> */}


              {/* <Link className="anchor mx-2" to={`/volunter/profile/${user?._id}`}>
                {user?.name}
              </Link> */}
              
               <UserDropdown user={user} /> 
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
        
      </div>
    </div>
  );
}

export default Layout;