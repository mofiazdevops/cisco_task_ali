import React, { useState, useEffect } from "react";
import { Button, message, Steps, theme } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { cisco, white } from "../constants/colors";
import CustomButton from "../components/customButton";
import axios from "axios";
import { baseUrl } from "../utills/axios";
import CustomSteps from "./customSteps";
import HeaderComp from "../components/header";
const steps = [
  {
    // title: "Details",
    path: "details",
  },
  {
    // title: "Options",
    path: "options",
  },
  {
    // title: "persona-overview",
    path: "persona-overview",
  },
  {
    // title: "Insights",
    path: "insights",
  },
  {
    // title: "sustainabilty-IT",
    path: "sustainabilty-IT",
  },
];

const Home = () => {
  const { token } = theme.useToken();
  // const [current, setCurrent] = useState(0);
  const [current, setCurrent] = useState(
    parseInt(localStorage.getItem("currentStep")) || 0
  );
  const navigate = useNavigate();
  const location = useLocation();
  const details = useSelector((state) => state.form);
  console.log("stored values", details);
  const storedData = localStorage.getItem("loginData");
  const [messageApi, contextHolder] = message.useMessage();
  const loginData = JSON.parse(storedData);
  console.log("loginData", loginData);
  useEffect(() => {
    if (!loginData || !loginData.access_token) {
      navigate("/login");
    }
  }, [loginData, navigate]);
  // useEffect(() => {
  //   navigate(steps[current].path);
  // }, [current, navigate]);
  useEffect(() => {
    localStorage.setItem("currentStep", current);
    navigate(steps[current].path);
  }, [current, navigate]);
  console.log("current", current);
  const next = async () => {
    // setCurrent(current + 1);

    if (current === 0) {
      try {
        const payload = {
          user_id: loginData?.user_info?.id,
          organization_name: details?.organization_name,
          domain_id: details?.domain_id,
          role_id: details?.role_id,
        };
        const res = await axios.post(
          baseUrl + "/api/v2/setup/user-profile-all",
          payload,
          {
            headers: {
              Authorization: `Bearer ${loginData?.access_token}`,
            },
          }
        );
        if (res.status === 200) {
          messageApi.open({
            type: "success",
            content: res?.data?.message,
          });
          // setTimeout(() => {
          //   setCurrent(current + 1);
          // }, 1000);
          setTimeout(() => {
            setCurrent((prev) => prev + 1);
          }, 1000);
        }
        console.log("profile res", res);
      } catch (error) {
        console.log("error...", error);
      }
    } else if (current === 1) {
      try {
        const payload = {
          user_id: loginData?.user_info?.id,
          measures: details?.measures,
        };
        const res = await axios.post(
          baseUrl + "/api/v2/setup/save-measures",
          payload,
          {
            headers: {
              Authorization: `Bearer ${loginData?.access_token}`,
            },
          }
        );
        if (res.status === 200) {
          messageApi.open({
            type: "success",
            content: res?.data?.message,
          });
          // setTimeout(() => {
          //   setCurrent(current + 1);
          // }, 1000);
          setTimeout(() => {
            setCurrent((prev) => prev + 1);
          }, 1000);
        }
        console.log("save measures res", res);
      } catch (error) {
        console.log("error...", error);
      }
    } else {
      setCurrent((prev) => prev + 1);
    }
  };

  const prev = () => {
    setCurrent((prev) => prev - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  // const items = steps.map((item) => ({
  //   key: item.path,
  //   title: item.path,
  // }));

  const contentStyle = {
    // lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: white,
    // borderRadius: token.borderRadiusLG,
    // border: `1px solid ${token.colorBorder}`,
    width: "90%",
    minHeight: current === 0 ? "75vh" : current === 2 ? "60vh" : "85vh",
    margin: "0 auto",
    marginTop: "10px",
    paddingTop: "30px",
    paddingBottom: "30px",
  };

  return (
    <>
      {contextHolder}

      <HeaderComp />
      <div style={{ padding: "0 10px 10px 10px" }}>
        <CustomSteps current={current} items={items} />
      </div>
      <div style={{ padding: "0px 10px" }}>
        <div style={contentStyle}>
          <Outlet />
          <div
            className="detail_container"
            style={{
              width:
                current === 1
                  ? "60%"
                  : current === 2
                  ? "91.5%"
                  : current === 3
                  ? "85%"
                  : current === 4
                  ? "60%"
                  : "442px",
              margin: "0 auto",
              marginTop: 30,
              display: "flex",
              justifyContent: current === 0 ? "end" : "space-between",
            }}
          >
            {current > 0 ? (
              <CustomButton
                style={{
                  background: cisco,
                  color: white,
                  width: "136px",
                  height: "44px",
                }}
                onClick={() => prev()}
              >
                Back
              </CustomButton>
            ) : null}
            {current === steps.length - 1 && (
              <CustomButton
                style={{ background: cisco, width: "136px", height: "44px" }}
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Submit
              </CustomButton>
            )}
            {current < steps.length - 1 && (
              <CustomButton
                style={{ background: cisco, width: "136px", height: "44px" }}
                type="primary"
                onClick={() => next()}
              >
                Next
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
