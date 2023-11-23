import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table, Tag, Radio } from "antd";
import moment from "moment";

function ListAppointments() {

  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');


  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/user/get-appointments-by-user-id", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const columns = [
    {
      title: "Voluntário",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.volunterInfo.name} 
        </span>
      ),
    },
    {
      title: "Telefone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.volunterInfo.phoneNumber} 
        </span>
      ),
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {record.date} 
        </span>
      ),
    },
    
    {
      title: "Hora",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {record.time}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'orange';
        if (status === 'approved') {
          color = 'green';
        } else if (status === 'Recusado') {
          color = 'red';
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === 'visitar') {
      return Array.isArray(appointment.appointmentType) && appointment.appointmentType.some(type => type.value === 'visita');
    } else if (filter === 'buscar') {
      return Array.isArray(appointment.appointmentType) && appointment.appointmentType.some(type => type.value === 'buscarPet');
    }
    return true; 
  });

  useEffect(() => {
    getAppointmentsData();
  }, []);

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="page-title">Visitas</h1>
        
        <Radio.Group
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          
        >
          
          <Radio.Button value="buscar">Buscar Pet</Radio.Button>
          <Radio.Button value="all">Todas</Radio.Button>
          <Radio.Button value="visitar">Visitas Abrigo</Radio.Button>

        </Radio.Group>
      
      </div>
      <hr/>
      <Table columns={columns} dataSource={filteredAppointments} />
    </Layout>
  ) 
}

export default ListAppointments;