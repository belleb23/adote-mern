import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    label: "Profile",
    key: "1",
    icon: "",
  },
  {
    label: "Log out",
    key: "2",
    icon: "",
  },
];

const linkStyle = {
    textDecoration: "none", 
    color: "black", 
}

const createMenu = (user) => {

  return (
    <Menu>
      {items.map((item) => (
        <Menu.Item key={item.key}>
          {item.key === "1" ? (
            <Link to={`/volunter/profile/${user._id}`} style={linkStyle}>
                 <span>Perfil</span>
            </Link>
          ) : (
            <Link to={`/login`} style={linkStyle}> 
                <span onClick={() => {localStorage.clear(); }}>Log Out</span>
            </Link>
          )} 
        </Menu.Item>
      ))}
    </Menu>
  );
};

const UserDropdown = ({ user }) => {
  return (
    <Dropdown overlay={() => createMenu(user)} placement="bottomLeft">
      <a
        href="#"
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        <UserOutlined className="header-action-icon" style={{ color: "black" }} />
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
