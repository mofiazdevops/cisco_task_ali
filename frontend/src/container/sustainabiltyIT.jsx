// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Checkbox, Row, Col, Input } from "antd";
// import { setFormData } from "../store/formSlice";
// import { headings, textColor } from "../constants/colors";
// const { TextArea } = Input;
// const plainOptions = [
//   "Ad hoc or reactive: lack of a formal data protection strategy: ad hoc measures to address privacy concerns; basic compliance with relevant data protection regulations (no comprehensive framework in place, limited awareness of data privacy risks and minimal employee training on data protection practices",
//   "Initial compliance: some formal data protection practices and policies in place",
//   "Meet the minimum requirements of data protection regulations; basic data protection awareness training provided to employees",
//   "Defined and managed: well-defined data protection and privacy policies and procedures in place; compliance via constant monitoring of data protection regulations and standards; regular training of employees and communication on data protection",
//   "Proactive and continuously improvement: proactive approach to identifying and mitigating data privacy risks and vulnerabilities; adoption of data protection best practices; a strong culture of data protection with ongoing training and the reinforcement of privacy principles",
//   "Mature and integrated: data protection and privacy are fully integrated into the business processes and technciogy",
// ];

// const SustainabiltyIT = () => {
//   const [value, setValue] = useState("");
//   console.log("value", value);
//   const dispatch = useDispatch();
//   const selectedOptions = useSelector(
//     (state) => state.form.selectedOptions || []
//   );
//   const details = useSelector((state) => state.form);
//   console.log("SelectedOptions store:", details);
//   const filterOther = details?.selectedOptions?.filter(
//     (data) => data == "Other"
//   );
//   useEffect(() => {
//     dispatch(setFormData({ other: value }));
//   }, [value]);
//   const onChange = (checkedValues) => {
//     console.log("Checked values:", checkedValues);
//     if (checkedValues[0] == "Other") {
//       dispatch(setFormData({ selectedOptions: checkedValues }));
//     } else {
//       dispatch(setFormData({ selectedOptions: checkedValues }));
//     }
//   };

//   return (
//     <div style={{ width: "60%", margin: "0 auto", lineHeight: "unset" }}>
//       <div>
//         <p
//           style={{
//             fontSize: "20px",
//             fontWeight: 600,
//             lineHeight: "30px",
//             textAlign: "start",
//             color: headings,
//             marginBottom: "30px",
//           }}
//         >
//           Sustainability Maturity Assessment - Sustainable IT
//         </p>
//         <p
//           style={{
//             fontSize: "16px",
//             fontWeight: 500,
//             lineHeight: "30px",
//             textAlign: "start",
//             color: headings,
//             marginBottom: "30px",
//           }}
//         >
//           Q1. How do you-ensure data protection and privacy and protect your
//           organization against breaches and unauthorized access?
//         </p>
//       </div>
//       <Checkbox.Group
//         style={{ width: "100%", display: "unset" }}
//         defaultValue={[]}
//         onChange={onChange}
//       >
//         <Row justify={"center"} gutter={[16, 16]}>
//           {plainOptions.map((option) => (
//             <Col
//               style={{
//                 textAlign: "start",
//               }}
//               span={24}
//               key={option}
//             >
//               <Checkbox
//                 style={{
//                   color: textColor,
//                   fontWeight: 500,
//                   fontSize: "14px",
//                 }}
//                 value={option}
//               >
//                 {option}
//               </Checkbox>
//             </Col>
//           ))}
//         </Row>
//       </Checkbox.Group>
//     </div>
//   );
// };

// export default SustainabiltyIT;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Row, Col, Input } from "antd";
import styled from "styled-components";
import { setFormData } from "../store/formSlice";
import { headings, textColor, cisco } from "../constants/colors";
const { TextArea } = Input;

const plainOptions = [
  "Ad hoc or reactive: lack of a formal data protection strategy: ad hoc measures to address privacy concerns; basic compliance with relevant data protection regulations (no comprehensive framework in place, limited awareness of data privacy risks and minimal employee training on data protection practices",
  "Initial compliance: some formal data protection practices and policies in place",
  "Meet the minimum requirements of data protection regulations; basic data protection awareness training provided to employees",
  "Defined and managed: well-defined data protection and privacy policies and procedures in place; compliance via constant monitoring of data protection regulations and standards; regular training of employees and communication on data protection",
  "Proactive and continuously improvement: proactive approach to identifying and mitigating data privacy risks and vulnerabilities; adoption of data protection best practices; a strong culture of data protection with ongoing training and the reinforcement of privacy principles",
  "Mature and integrated: data protection and privacy are fully integrated into the business processes and technciogy",
];

const StyledCheckboxGroup = styled(Checkbox.Group)`
  width: 100%;
  display: unset;
`;

const StyledCheckbox = styled(Checkbox)`
  color: ${textColor};
  font-weight: 500;
  font-size: 14px;
  .ant-checkbox-wrapper {
    display: flex;
    align-items: start;
  }

  .ant-checkbox {
    margin-top: 4px;
    margin-right: 10px;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${cisco}; /* Change this to your desired color */
    border-color: ${cisco}; /* Change this to your desired color */
  }
  &:hover .ant-checkbox-inner,
  &:hover .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${cisco}; /* Change this to your desired color */
  }
`;

const Container = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-bottom: 50px !important;
  line-height: unset;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 30px;
  text-align: start;
  color: ${headings};
  margin-bottom: 30px;
`;

const Question = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 30px;
  text-align: start;
  color: ${headings};
  margin-bottom: 30px;
`;

const SustainabiltyIT = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  const details = useSelector((state) => state.form);

  const onChange = (checkedValues) => {
    dispatch(setFormData({ sustainabiltyIT: checkedValues }));
  };

  return (
    <Container>
      <div>
        <Title>Sustainability Maturity Assessment - Sustainable IT</Title>
        <Question>
          Q1. How do you-ensure data protection and privacy and protect your
          organization against breaches and unauthorized access?
        </Question>
      </div>
      <StyledCheckboxGroup defaultValue={[]} onChange={onChange}>
        <Row justify={"center"} gutter={[16, 16]}>
          {plainOptions.map((option) => (
            <Col
              style={{
                textAlign: "start",
              }}
              span={24}
              key={option}
            >
              <StyledCheckbox value={option}>{option}</StyledCheckbox>
            </Col>
          ))}
        </Row>
      </StyledCheckboxGroup>
    </Container>
  );
};

export default SustainabiltyIT;
