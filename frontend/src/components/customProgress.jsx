import React from "react";
import { Progress } from "antd";
const CustomProgress = ({ data }) => {
  return <Progress size={[80, 20]} type="circle" percent={data} />;
};

export default CustomProgress;
