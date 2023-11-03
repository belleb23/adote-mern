import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import Volunter from "../components/Volunter";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";

function Appointments() {
  const [volunteers, setVolunteers] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.get("/api/user/get-all-approved-volunteers", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      dispatch(hideLoading())
      if (response.data.success) {
        setVolunteers(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading())
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <p>Selecione o voluntário que voce deseja marcar uma visita</p>
      <Row gutter={20}>
        {volunteers.map((volunter) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Volunter volunter={volunter} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Appointments;