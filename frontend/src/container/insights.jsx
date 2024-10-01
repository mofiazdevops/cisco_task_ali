import React from "react";
import { borderColor, headings, textColor } from "../constants/colors";
import { Col, Row } from "antd";
import CustomCard from "../components/customCard";
import CustomProgress from "../components/customProgress";
const style = {
  background: "#0092ff",
  padding: "8px 0",
};
const Insights = () => {
  return (
    <div style={{ margin: "0 100px" }}>
      <p
        style={{
          fontSize: "20px",
          fontWeight: 600,
          lineHeight: "30px",
          textAlign: "start",
          color: headings,
          marginBottom: "23px",
        }}
      >
        Insights and Analysis
      </p>
      <Row gutter={16}>
        {[
          {
            value: "15",
            text: "of industry CTOs align with your CTO's value drivers, positioning you at the forefront of sustainability thought leadership.",
          },
          {
            value: "20",
            text: "of industry CTOs align with your CTO's value drivers, positioning you at the forefront of sustainability thought leadership.",
          },
          {
            value: "25",
            text: "of industry CTOs align with your CTO's value drivers, positioning you at the forefront of sustainability thought leadership.",
          },
          {
            value: "50",
            text: "of industry CTOs align with your CTO's value drivers, positioning you at the forefront of sustainability thought leadership.",
          },
          {
            value: "10",
            text: "of industry CTOs align with your CTO's value drivers, positioning you at the forefront of sustainability thought leadership.",
          },
          {
            value: "55",
            text: "of industry CTOs align with your CTO's value drivers, positioning you at the forefront of sustainability thought leadership.",
          },
        ].map((item) => (
          <Col
            style={{
              padding: "8px 8px",
            }}
            className="gutter-row"
            span={8}
          >
            <CustomCard
              style={{
                borderRadius: "8px",
                borderColor: "#D1D5DB",
                padding: "0px",
              }}
            >
              <div
                style={{
                  // border: "5.54px solid #F3F4F6",
                  boxShadow: "0px 0px 15.54px #F3F4F6",
                  padding: "0px",
                  width: "95px",
                  margin: "0 auto",
                  height: "95px",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <CustomProgress data={item.value} />
              </div>
              <p
                style={{ marginTop: "15px", fontWeight: 500, color: textColor }}
              >
                {item.text}
              </p>
            </CustomCard>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Insights;
