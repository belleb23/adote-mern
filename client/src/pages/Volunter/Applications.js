import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { Table, Radio, Tooltip, Tag, Modal, Tabs } from 'antd';
import {toast} from 'react-hot-toast'
import moment from "moment";

function Applications() {
  const [adoptions, setAdoptions] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'approved', or 'pending'
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState('pending'); // 'approved' or 'pending'
  const [isModalVisible, setIsModalVisible] = useState(false);

  
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Pet',
      dataIndex: 'petInfo',
      key: 'petName',
      render: (petInfo) => petInfo.name,
    },
    {
      title: 'Adotante',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {record.time}
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
          color = 'success'; 
        } else if (status === 'Recusado') {
          color = 'error'; 
        }
  
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Aprovar",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
           <Tooltip title="Aprovar">
              <i
                className="ri-check-fill icon-large"
                onClick={() => changeApplicationStatus(record, "approved")}
              ></i>
            </Tooltip>
          )}
          
          {record.status === "approved" && (
            <Tooltip title="Bloquear">
              <i
                className="ri-close-fill icon-large"
                onClick={() => changeApplicationStatus(record, "blocked")}
              ></i>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: 'Ação',
      key: 'action',
      render: (text, record) => (
        <div>
          <Tooltip title="Ver Aplicação">
             <i
              className="ri-file-list-3-line icon-large"
              onClick={() => handleViewDetails(record)}
            ></i>
           
          </Tooltip>
          {record.status === "approved" && (
            <Tooltip title="Pdf">
              <i
                className="ri-download-line icon-large"
                // onClick={() => handleGeneratePdf(record)} // Adicione a função para gerar PDF aqui
              ></i>
            </Tooltip>
          )}
        </div>
      ),
    },
    
  ];

  const getApplicationsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get('/api/user/all-applications', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setAdoptions(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  const changeApplicationStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const resposne = await axios.post(
        "/api/user/change-application-status",
        { applicationId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (resposne.data.success) {
        toast.success(resposne.data.message);
        getApplicationsData();
      }
    } catch (error) {
      toast.error('Error changing application account status');
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  }; 

  const filteredAdoptions = adoptions.filter((adoption) => {
    if (filter === 'approved') {
      return adoption.status === 'approved';
    } else if (filter === 'pending') {
      return adoption.status === 'pending';
    }
    return true; // 'all'
  });

  return (
    <Layout>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 className="page-title">Adoções</h1>
        <hr/>

        <Radio.Group
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <Radio.Button value="all">Todas</Radio.Button>
          <Radio.Button value="approved">Aprovadas</Radio.Button>
          <Radio.Button value="pending">Pendentes</Radio.Button>
        </Radio.Group>
      </div>

      <hr/>
      <Table dataSource={filteredAdoptions} columns={columns} />

      <Modal
        title="Detalhes do Adotante"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={800}
      >
        {selectedApplication && (
          <Tabs defaultActiveKey="personalInfo">
            <Tabs.TabPane tab="Informações Pessoais" key="personalInfo">
              <div>
              <p>Nome: {selectedApplication.userInfo.name}</p>
              <p>Email: {selectedApplication.userInfo.email}</p>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Informações da adoção" key="adoptionInfo">
              <div>
                <p>Profissão</p>
              
              </div>
            </Tabs.TabPane>
          </Tabs>
        )}
      </Modal>
    </Layout>
  );
}

export default Applications;
