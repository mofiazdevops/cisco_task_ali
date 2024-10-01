import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, message, Form, Input, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import CustomInput from "./customInput";
import { MdOutlineEmail } from "react-icons/md";
import {
  borderColor,
  cisco,
  inputIconColor,
  textColor,
  white,
} from "../constants/colors";
import { baseUrl } from "../utills/axios";
import axios from "axios";
import CustomButton from "./customButton";
const LoginForm = ({ setLoading, showModal }) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish = async (values) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    try {
      const res = await axios.post(baseUrl + "/api/v2/auth/sign-in", values);
      console.log("login ressss", res);
      if (res?.status == "200") {
        localStorage.setItem("loginData", JSON.stringify(res.data));
        messageApi.open({
          type: "success",
          content: "Login Successfully!",
        });
        setLoading(false);
        setTimeout(() => {
          if (res?.data?.has_profile === true) {
            localStorage.setItem("currentStep", 1);
            navigate("/home/options");
          } else {
            navigate("/home");
          }
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      messageApi.open({
        type: "error",
        content: error?.response?.data?.detail,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <CustomInput
            placeholder="Email Address"
            icon={
              <MdOutlineEmail
                style={{ color: inputIconColor, fontSize: "22px" }}
              />
            }
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <CustomInput
            placeholder="Password"
            type="password"
            icon={
              <LockOutlined
                className="site-form-item-icon"
                style={{ color: inputIconColor, fontSize: "22px" }}
              />
            }
          />
        </Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
            width: "100%",
            marginTop: "-15px",
          }}
        >
          <a
            style={{
              color: textColor,
              textDecoration: "underline",
              fontWeight: 500,
              textAlign: "end",
              width: "100%",
              marginTop: "0px",
            }}
            onClick={() => navigate("/forgot-password")}
            // className="login-form-forgot"
          >
            Forgot password?
          </a>
        </div>

        <Form.Item>
          <CustomButton
            htmlType="submit"
            style={{
              width: "100%",
              background: cisco,
              color: white,
              height: "48px",
            }}
          >
            Log in
          </CustomButton>
          <p
            style={{
              // fontWeight: 500,
              color: textColor,
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            or
          </p>
          <CustomButton
            onClick={() => navigate("/sign-up")}
            style={{
              width: "100%",
              background: "#DBEAFE",
              borderColor: "#DBEAFE",
              color: "#68C5E8",
              height: "48px",
            }}
          >
            Sign Up
          </CustomButton>
        </Form.Item>
      </Form>
    </>
  );
};
export default LoginForm;
