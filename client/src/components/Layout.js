import React, { useState } from 'react'
import '../layout.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();

    const userMenu = [
        {
            name: "Home",
            path: "/",
            icon: "ri-home-line",
        },
        {
            name: "Adoçoes",
            path: "/applications",
            icon: "ri-file-list-line",
        },
        {
            name: "Visitas",
            path: "/visits",
            icon: "ri-hospital-line",
        }
    ];
        
    const menuToBeRendered =  userMenu;

    return (
    <div className="main">
        <div className="d-flex layout">
        <div className="sidebar">
            <div className="sidebar-header">
            <h1 className="logo">Adote VL</h1>
            
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

export default Layout