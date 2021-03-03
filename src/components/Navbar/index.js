import React from "react";
import "./style.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

function Navbar() {
  return (
    <Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link className="nav-link" to="/">All Films</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link className="nav-link" to="/search">Search Film</Link>
          </Menu.Item>
        </Menu>
    </Header>
  );
};

export default Navbar;
