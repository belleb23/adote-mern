import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearUser } from "../redux/userSlice"; // Importe a action clearUser

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
};

const UserDropdown = ({ user }) => {
  const dispatch = useDispatch(); 

  const handleLogout = () => {
    dispatch(clearUser()); 
    localStorage.clear(); 
  };

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
              <span onClick={handleLogout} style={linkStyle}>
                Log Out
              </span>
            )}
          </Menu.Item>
        ))}
      </Menu>
    );
  };

  return (
    <Dropdown overlay={() => createMenu(user)} placement="bottomLeft">
      <a
        href="/#"
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
      >
        <UserOutlined
          className="header-action-icon"
          style={{ color: "black" }}
        />
      </a>
    </Dropdown>
  );
};

export default UserDropdown;
