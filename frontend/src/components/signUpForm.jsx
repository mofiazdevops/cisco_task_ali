import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import CustomInput from "./customInput";
import { MdOutlineEmail } from "react-icons/md";
import { cisco, inputIconColor, textColor, white } from "../constants/colors";
import { baseUrl } from "../utills/axios";
import axios from "axios";
import CustomButton from "./customButton";
const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    console.log("Received values of form: ", values);
    try {
      const res = await axios.post(baseUrl + "/api/v2/auth/sign-up", values);
      console.log(res);
      if (res?.status == "200") {
        messageApi.open({
          type: "success",
          content: "Registered Successfully!",
        });
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}

      <Spin size="large" spinning={loading}>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <CustomInput
              placeholder="Name"
              icon={
                <UserOutlined
                  style={{ color: inputIconColor, fontSize: "22px" }}
                />
              }
            />
          </Form.Item>
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
              Sign Up
            </CustomButton>
          </Form.Item>
          <div
            style={{
              marginBottom: "40px",
            }}
          >
            <p
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              Already have an accout?
              <span
                style={{ color: "#049FD9", fontWeight: 600, marginLeft: "5px" }}
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </p>
          </div>
        </Form>
      </Spin>
    </>
  );
};
export default SignUpForm;
