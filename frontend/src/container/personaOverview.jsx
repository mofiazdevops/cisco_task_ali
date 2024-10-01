import React, { useState, useEffect } from "react";
import CustomCard from "../components/customCard";
import { headings, roleBg, textColor } from "../constants/colors";
import { Card, Col, Row, Table } from "antd";
import CustomTable from "../components/customTable";
import { baseUrl } from "../utills/axios";
import axios from "axios";
const PersonaOverview = () => {
  const storedData = localStorage.getItem("loginData");
  // const [messageApi, contextHolder] = message.useMessage();
  const loginData = JSON.parse(storedData);
  const [userMeasures, setUserMeasures] = useState();
  const fetchUserMeasures = async () => {
    try {
      const payload = {
        user_id: loginData?.user_info?.id,
      };
      const res = await axios.post(
        baseUrl +
          `/api/v2/setup/get-user-measures?user_id=${loginData?.user_info?.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${loginData?.access_token}`,
          },
        }
      );
      if (res.status === 200) {
        // dispatch(setFormData({ [name]: "" }));
        setUserMeasures(res?.data?.measures);
      }

      console.log("setUserMeasures res", res);
    } catch (error) {
      console.log("error...", error);
    }
  };

  useEffect(() => {
    fetchUserMeasures();
  }, []);
  console.log("userMeasures", userMeasures);

  const data = {
    profile: {
      name: "Shah Masood",
      email: "shah@gmail.com",
      phone: "03315806780",
      role: "UI Developer",
    },
    top: [
      "Community and Social Impact",
      "Greenhouse Gas Reduction",
      "Water Conservation and SustainableResource Use",
      "Waste Management and CircularEconomy implementation",
    ],
    drivers: [
      "Community and Social Impact",
      "Greenhouse Gas Reduction",
      "Water Conservation and SustainableResource Use",
      "Waste Management and CircularEconomy implementation",
    ],
    challenges: [
      "Community and Social Impact",
      "Greenhouse Gas Reduction",
      "Water Conservation and SustainableResource Use",
      "Waste Management and CircularEconomy implementation",
    ],
  };
  console.log("data", data);
  const tableData = [
    {
      key: "1",
      profile: data.profile,
      top: data.top,
      drivers: data.drivers,
      challenges: data.challenges,
    },
    {
      key: "2",
      profile: data.profile,
      top: data.top,
      drivers: data.drivers,
      challenges: data.challenges,
    },
  ];

  const columns = [
    {
      dataIndex: "profile",
      key: "profile",
      render: (record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <div
            style={{
              width: "68px",
              height: "68px",
              borderRadius: "100%",
              background: "#D9D9D9",
            }}
          ></div>
          <div>
            <p style={{ color: headings, fontSize: "16px", fontWeight: 600 }}>
              {record.name}
            </p>
            <p style={{ color: textColor }}>{record.email}</p>
            <p style={{ color: textColor }}>{record.phone}</p>
            <p
              style={{
                color: textColor,
                background: roleBg,
                borderRadius: "18px",
                height: "22px",
                textAlign: "center",
                fontSize: "12px",
              }}
            >
              {record.role}
            </p>
          </div>
        </div>
      ),
    },

    {
      title: "Top",
      dataIndex: "top",
      key: "top",
      render: (record) => (
        <div
          style={{
            padding: "10px",
          }}
        >
          <ul>
            {record?.map((item) => (
              <li style={{ color: textColor }}>{item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Drivers",
      dataIndex: "drivers",
      key: "drivers",
      render: (record) => (
        <div
          style={{
            padding: "10px",
          }}
        >
          <ul>
            {record?.map((item) => (
              <li style={{ color: textColor }}>{item}</li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      title: "Challenges",
      dataIndex: "challenges",
      key: "challenges",
      render: (record) => (
        <div
          style={{
            padding: "10px",
          }}
        >
          <ul>
            {record?.map((item) => (
              <li style={{ color: textColor }}>{item}</li>
            ))}
          </ul>
        </div>
      ),
    },
  ];
  return (
    <div style={{ margin: "0 60px 60px 60px" }}>
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
        Persona Overview
      </p>
      <CustomTable data={tableData} columns={columns} />
    </div>
  );
};

export default PersonaOverview;
