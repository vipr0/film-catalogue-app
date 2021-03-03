import React from "react";
import { Spin } from "antd";
import './style.css'

const Loader = () => {
    return <Spin spinning={true} className="spinner" />;
};

export default Loader;
