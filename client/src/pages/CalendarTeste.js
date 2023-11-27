import React from 'react'
import CalendarAppointments from '../components/volunter/CalendarAppointments'
import Layout from '../components/Layout'
import { useNavigate } from "react-router-dom";
import { Button } from "antd";


function CalendarTeste() {
  const navigate = useNavigate();


  return (
    <Layout>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className="page-title">Visitas </h1>        
          <Button
            type="primary"
            className="primary-button"
            onClick={() => navigate("/volunter/appointments")}
          >
              Minhas visitas
          </Button>
        </div>  
        <hr/>
        <CalendarAppointments />
    </Layout>
  )
}

export default CalendarTeste