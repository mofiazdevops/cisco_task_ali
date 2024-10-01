import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "antd";
import { useNavigate } from "react-router-dom";
import {
  LockOutlined,
  UserOutlined,
  ContainerOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";
import CustomInput from "../components/customInput";
import CustomButton from "../components/customButton";
import CustomSelector from "../components/customSelector";
import { cisco, inputIconColor, textColor, white } from "../constants/colors";
import { setFormData } from "../store/formSlice";
import { useSubmitFormMutation } from "../store/api";
import { baseUrl } from "../utills/axios";
import axios from "axios";

const Details = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.form);
  const [domainsList, setDomainsList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [submitForm, { isLoading }] = useSubmitFormMutation();
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("loginData");
    if (storedData) {
      setLoginData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (loginData && loginData.access_token === "") {
      navigate("/login");
    }
  }, [loginData, navigate]);

  const fetchDomainList = async () => {
    try {
      const res = await axios.get(baseUrl + "/api/v2/setup/domain-types", {
        headers: {
          Authorization: `Bearer ${loginData?.access_token}`,
        },
      });
      if (res.status === 200) {
        const formattedData = res.data.domain_types.map((item) => ({
          label: item.name,
          value: item.name,
          id: item.id,
        }));
        setDomainsList(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loginData && loginData.access_token) {
      fetchDomainList();
    }
  }, [loginData]);

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    submitForm(values).then(() => {
      console.log("Form submitted successfully");
    });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
  };

  const fetchRole = async (id) => {
    try {
      const res = await axios.post(
        `${baseUrl}/api/v2/setup/role-types-id?domain_id=${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${loginData?.access_token}`,
          },
        }
      );
      if (res.status === 200) {
        const formattedData = res.data.roles.map((item) => ({
          label: item.name,
          value: item.name,
          id: item.id,
        }));
        setRoles(formattedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSelectChange = (value, option) => {
    dispatch(setFormData({ domain_id: option.id }));
    fetchRole(option.id);
  };

  const onSelectChangeRole = (value, option) => {
    console.log("role id", option);
    dispatch(setFormData({ role_id: option.id }));
  };

  if (!loginData) {
    return <div>Loading...</div>; // or some loading indicator
  }

  return (
    <div
      className="detail_container"
      style={{ width: "442px", margin: "0 auto", marginBottom: "20px" }}
    >
      <div>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "30px",
            textAlign: "start",
            color: textColor,
            marginBottom: "20px",
          }}
        >
          Before we begin, we would like to know more about you and your
          organization. Please fill the form below:
        </p>
      </div>
      <Form
        name="normal_login"
        initialValues={{
          username: loginData?.user_info?.name,
          email: loginData?.user_info?.email,
          // organization_name: details.company,
          // domain_id: details.domain_id,
          // role_id: details.role_id,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <CustomInput
            disabled
            value={loginData?.user_info?.name}
            onChange={onChange}
            placeholder="Full Name"
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
            {
              type: "email",
              message: "The input is not a valid email!",
            },
          ]}
        >
          <CustomInput
            disabled
            value={loginData?.user_info?.email}
            placeholder="Email Address"
            icon={
              <MdOutlineEmail
                style={{ color: inputIconColor, fontSize: "22px" }}
              />
            }
          />
        </Form.Item>
        <Form.Item
          name="organization_name"
          rules={[
            {
              required: true,
              message: "Please input your Company!",
            },
          ]}
        >
          <CustomInput
            name="organization_name"
            value={details.company}
            onChange={onChange}
            placeholder="Company"
            icon={
              <ContainerOutlined
                style={{ color: inputIconColor, fontSize: "22px" }}
              />
            }
          />
        </Form.Item>

        <Form.Item
          name="domain_id"
          rules={[
            {
              required: true,
              message: "Please select a domain!",
            },
          ]}
        >
          <CustomSelector
            placeholder="Select Domain"
            options={domainsList}
            onChange={onSelectChange}
          />
        </Form.Item>
        <Form.Item
          name="role_id"
          rules={[
            {
              required: true,
              message: "Please Select a Role!",
            },
          ]}
        >
          <CustomSelector
            // icon={<FundProjectionScreenOutlined />}
            placeholder="Select Role"
            options={roles}
            onChange={onSelectChangeRole}
          />
        </Form.Item>

        {/* <Form.Item>
          <CustomButton
            htmlType="submit"
            style={{
              width: "100%",
              background: cisco,
              color: white,
              height: "48px",
            }}
            loading={isLoading}
          >
            Submit
          </CustomButton>
        </Form.Item> */}
      </Form>
    </div>
  );
};

export default Details;
