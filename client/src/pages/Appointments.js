import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Col, Row, Button } from "antd";
import Volunter from "../components/volunter/Volunter";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";

function Appointments() {
  const [volunteers, setVolunteers] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="page-title">Visita ao Projeto </h1>        
        <Button
          type="primary"
          className="primary-button"
           onClick={() => navigate("/list-appointments")}
        >
            Minhas visitas
        </Button>
      </div>  
      <hr/>
      <p>
        Agradecemos seu interesse em visitar nosso projeto de adoção e conhecer nossos animais em busca de um lar amoroso.
        Para garantir uma experiência agradável e informativa durante sua visita, 
        solicitamos que <span style={{ color: '#4f3693', fontWeight: 'bold', borderBottom: '1px solid #4f3693'}}>selecione um voluntário</span> para acompanhá-lo. 
      </p>
      <hr/>
      <br/>
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