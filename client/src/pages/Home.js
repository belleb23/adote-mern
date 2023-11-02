import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import Pet from "../components/Pet";

function Home() {
  const [pets, setPets] = useState([]);
  const dispatch = useDispatch();

  const getPetsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/pets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      console.log(response.data.data)
      if (response.data.success) {
        setPets(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPetsData();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {pets.map((pet) => (
          <Col span={8} xs={24} sm={24} lg={8}>
            <Pet pet={pet} />
          </Col>
        ))}
      </Row>   
    </Layout>
    
  )
}

export default Home