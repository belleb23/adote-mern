import React, { useEffect, useState } from "react";
import axios from "axios";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { Row, Col } from "antd";
import PetCard from "../../components/pets/PetCard";

const Dashboard = () => {
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
    <div>
      <h1>Dashboard de Pets</h1>
      <Row gutter={16}>
        {pets.map((pet) => (
          <Col span={8} key={pet.id}>
            <PetCard pet={pet} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
