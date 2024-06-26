import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import {toast} from 'react-hot-toast'
import axios from "axios";
import { Table, Modal, Tooltip, Tabs, Tag } from "antd";
import moment from "moment";

function VolunteersList() {
  const [volunteers, setVolunteers] = useState([]);
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const getVolunteersData = async () => {
    try {
      dispatch(showLoading());
      const resposne = await axios.get("/api/admin/get-all-volunteers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (resposne.data.success) {
        setVolunteers(resposne.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeVolunterStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/admin/change-volunter-account-status",
        { volunterId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getVolunteersData();
      }
    } catch (error) {
      toast.error('Error changing volunter account status');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getVolunteersData();
  }, []);
  
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.userName} 
        </span>
      ),
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format('DD-MM-YYYY'),
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text, record) => (
          <Tag
            color={
              record.status === "pending"
                ? "orange"
                : record.status === "approved"
                ? "green"
                : "red"
            }
          >
            {record.status}
          </Tag>
        ),
      },
    {
      title: "Aprovações",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <>
              <Tooltip title="Aprovar">
                <i
                  className="ri-check-fill icon-large"
                  onClick={() => changeVolunterStatus(record, "approved")}
                ></i>
              </Tooltip>
              <Tooltip title="Recusar">
                <i
                  className="ri-close-fill icon-large"
                  onClick={() => changeVolunterStatus(record, "rejected")}
                ></i>
              </Tooltip>
            </>
          )}
          
          {record.status === "approved" && (
            <Tooltip title="Bloquear">
              <i
                className="ri-close-fill icon-large"
                onClick={() => changeVolunterStatus(record, "blocked")}
              ></i>
            </Tooltip>
          )}

        </div>
      ),
    },
    {
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <Tooltip title="Visualizar">
        <i
          className="ri-eye-line icon-large"
          onClick={() => handleOpenModal(record)}
        ></i>
      </Tooltip>
      ),
    },
  ];

  const handleOpenModal = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  
  return (
    <div>
      <Table columns={columns} dataSource={volunteers} />
      <Modal
        title="Detalhes do Usuário"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={800}
      >
        {selectedVolunteer && (
          <Tabs defaultActiveKey="personalInfo">
            <Tabs.TabPane tab="Informações Pessoais" key="personalInfo">
              <div>
                <p>Nome: {selectedVolunteer.userName}</p>
                <p>Email: {selectedVolunteer.userEmail}</p>
                <p>Número: {selectedVolunteer.phoneNumber}</p>
                <p>Data Nascimento: {selectedVolunteer.birth}</p>
                <p>Endereço: {selectedVolunteer.address}</p>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Informações de Voluntariado" key="volunterInfo">
              <div>
                <p>Profissão: {selectedVolunteer.work}</p>
                <p>Motivo para ser voluntária: {selectedVolunteer.reason}</p>
                <p>Rede social: {selectedVolunteer.socialMedia}</p>
                <p>Como lida com situação de pressão: {selectedVolunteer.situation}</p>
                <p>Como trabalha em grupo: {selectedVolunteer.group}</p>
                <p>Atividades:</p>
                  <ul>
                    {selectedVolunteer.activities.map((activity, index) => (
                      <li key={index}>{activity}</li>
                    ))}
                  </ul>
                <p>Horários disponíveis: {selectedVolunteer.timings[0]} - {selectedVolunteer.timings[1]}</p>

              </div>
            </Tabs.TabPane>
          </Tabs>
        )}
      </Modal>
</div>
  );
}

export default VolunteersList;