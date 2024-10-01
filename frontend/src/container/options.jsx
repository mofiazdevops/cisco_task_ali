import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox, Row, Col, Input } from "antd";
import { setFormData } from "../store/formSlice";
import { cisco, headings, textColor } from "../constants/colors";
import axios from "axios";
import { baseUrl } from "../utills/axios";
const { TextArea } = Input;

const CustomCheckbox = styled(Checkbox)`
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: ${cisco}; /* Change this to your desired color */
    border-color: ${cisco}; /* Change this to your desired color */
  }

  .ant-checkbox-inner {
    width: 20px; /* Adjust size if needed */
    height: 20px; /* Adjust size if needed */
  }

  &:hover .ant-checkbox-inner,
  &:hover .ant-checkbox-checked .ant-checkbox-inner {
    border-color: ${cisco}; /* Change this to your desired color */
  }
`;
const Options = () => {
  const [value, setValue] = useState("");
  const [measures, setMeasures] = useState();
  const dispatch = useDispatch();
  const storedData = localStorage.getItem("loginData");
  const loginData = JSON.parse(storedData);
  const selectedOptions = useSelector(
    (state) => state.form.selectedOptions || []
  );
  const details = useSelector((state) => state.form);
  console.log("SelectedOptions store:", details);
  const filterOther = details?.measures?.filter((data) => data == "Other");
  const fetchMeasures = async () => {
    if (loginData?.has_measures === true) {
      try {
        // const payload = {
        //   domain_id: details?.domain_id,
        //   role_id: details?.role_id,

        // };
        const res = await axios.post(
          baseUrl + `/api/v2/setup/get-domain-role-id`,
          {},
          {
            headers: {
              Authorization: `Bearer ${loginData?.access_token}`,
            },
            params: {
              user_id: loginData?.user_info?.id,
            },
          }
        );
        if (res.status === 200) {
          // dispatch(setFormData({ [name]: "" }));
          setMeasures(res?.data?.measures);
        }

        console.log("measures res", res);
      } catch (error) {
        console.log("error...", error);
      }
    } else {
      try {
        const payload = {
          domain_id: details?.domain_id,
          role_id: details?.role_id,
          // role_id: 2,
        };
        const res = await axios.post(
          baseUrl + "/api/v2/setup/get-measures",
          payload,
          {
            headers: {
              Authorization: `Bearer ${loginData?.access_token}`,
            },
          }
        );
        if (res.status === 200) {
          // dispatch(setFormData({ [name]: "" }));
          setMeasures(res?.data?.measures);
        }

        console.log("measures res", res);
      } catch (error) {
        console.log("error...", error);
      }
    }
  };
  useEffect(() => {
    dispatch(setFormData({ other: value }));
  }, [value]);
  useEffect(() => {
    fetchMeasures();
  }, []);
  const onChange = (checkedValues) => {
    console.log("Checked values:", checkedValues);
    if (checkedValues[0] == "Other") {
      dispatch(setFormData({ measures: checkedValues }));
    } else {
      dispatch(setFormData({ measures: checkedValues }));
    }
  };

  console.log("measures state", measures);
  return (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
        marginBottom: "100px",
        lineHeight: "unset",
      }}
    >
      <div>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "30px",
            textAlign: "start",
            color: headings,
            marginBottom: "30px",
          }}
        >
          As CTO, which of the following are your top of mind considerations
          when considering sustainability? <br /> Please select all that apply
        </p>
      </div>
      <Checkbox.Group
        style={{ width: "100%", display: "unset" }}
        defaultValue={[]}
        onChange={onChange}
      >
        <Row justify={"center"} gutter={[16, 16]}>
          {measures?.map((option) => (
            <Col
              style={{
                textAlign: "start",
              }}
              span={12}
              key={option?.id}
            >
              <CustomCheckbox
                style={{
                  color: textColor,
                  fontWeight: 500,
                  fontSize: "14px",
                }}
                value={option?.id}
              >
                {option?.measure}
              </CustomCheckbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
      {filterOther[0] == "Other" ? (
        <TextArea
          style={{ verticalAlign: "unset", marginTop: "20px" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type here..."
          autoSize={{
            minRows: 3,
            maxRows: 5,
          }}
        />
      ) : null}
    </div>
  );
};

export default Options;
