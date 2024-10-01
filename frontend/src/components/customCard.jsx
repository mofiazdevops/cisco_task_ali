import React from "react";
import { Card } from "antd";
import styled from "styled-components";
import { white } from "../constants/colors";

// Create a styled version of the Ant Design Card
const StyledCard = styled(Card)``;

const CustomCard = ({ style, children, ...rest }) => {
  return (
    <StyledCard style={{ background: white, style }} {...rest}>
      {children}
    </StyledCard>
  );
};

export default CustomCard;
