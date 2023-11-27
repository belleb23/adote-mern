import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Table, Tag } from "antd";

function VolunterAppointments() {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);


  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get(
        `/api/volunter/get-appointments-by-volunter-id/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        setAppointments(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.put(
        "/api/volunter/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
      dispatch(hideLoading());
    }
  };
  const columns = [

    {
      title: "Adotante",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Telefone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.volunterInfo.phoneNumber}</span>,
    },
    {
      title: "Data & Hora",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {record.date}{" "}
          {record.time}
        </span>
      ),
    },
    {
      title: 'Tipo Visita',
      dataIndex: 'appointmentType',
      render: (appointmentType) => {
        const renderStyle = {
          backgroundColor: appointmentType.some((item) => item.value === 'buscarPet') ? '#d8ccef' : '#ffee9a',
          padding: '8px',
          borderRadius: '4px',
          color: 'white',
        };

        return (
          <div>
            {appointmentType.map((item, index) => (
              <p key={index} style={renderStyle}>{item.value}</p>
            ))}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === 'approved' ? 'green' : status === 'Recusado' ? 'red' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Ações",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <h1
                className="anchor px-2"
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Confirmar
              </h1>
              <h1
                className="anchor"
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Rejeitar
              </h1>
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, [user]);

  
  return (
    <Layout>
      <h1 className="page-header">Visitas</h1>
      <hr />
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
}

export default VolunterAppointments;