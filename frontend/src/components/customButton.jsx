import React from "react";
import styled from "styled-components";
import { Button } from "antd";

// Styled component for the button
const StyledButton = styled(Button)`
  ${(props) => props.customStyle && props.customStyle}
  border-radius: 4px !important;
`;

const CustomButton = ({ customStyle, children, ...rest }) => {
  return (
    <StyledButton size="large" style={{ ...customStyle }} {...rest}>
      {children}
    </StyledButton>
  );
};

export default CustomButton;
