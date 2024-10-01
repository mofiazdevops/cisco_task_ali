import React from "react";
import styled from "styled-components";
import { Steps } from "antd";
import { progressLine } from "../constants/colors";
const StyledSteps = styled(Steps)`
  .ant-steps-item-finish .ant-steps-icon-dot {
    background-color: ${progressLine} !important;
    border-color: ${progressLine} !important;
  }
  .ant-steps-item-process .ant-steps-icon-dot {
    background-color: ${progressLine} !important;
    border-color: ${progressLine} !important;
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${progressLine} !important;
    border-color: ${progressLine} !important;
  }

  .ant-steps-item-wait .ant-steps-item-icon {
    background-color: #yourColor !important;
    border-color: #yourColor !important;
    color: green !important;
  }

  .ant-steps-item-finish .ant-steps-item-tail::after {
    background-color: ${progressLine} !important;
  }

  .ant-steps-item-process .ant-steps-item-tail::after {
    background-color: #yourColor !important;
  }
`;
const CustomSteps = ({ current, items }) => {
  return <StyledSteps current={current} progressDot="dot" items={items} />;
};

export default CustomSteps;
