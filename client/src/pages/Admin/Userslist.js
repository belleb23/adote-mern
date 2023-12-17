import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { Table, Tooltip, Modal, Tabs, Tag } from 'antd';

function Userslist() {
  const [adoptions, setAdoptions] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

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

  const groupApplicationsByUser = () => {
    const groupedApplications = {};
    adoptions.forEach((application) => {
      const userId = application.userInfo._id;
      if (!groupedApplications[userId]) {
        groupedApplications[userId] = {
          ...application.userInfo,
          applications: [application],
        };
      } else {
        groupedApplications[userId].applications.push(application);
      }
    });
    return Object.values(groupedApplications);
  };

  const userApplications = groupApplicationsByUser();

  const columns = [
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Número de Aplicações',
      dataIndex: 'applications',
      key: 'applications',
      render: (applications) => applications.length,
    },
    {
      title: '',
      key: 'action',
      render: (text, record) => (
        <>
          <Tooltip title="Ver Aplicações">
            <i
              className="ri-file-list-3-line icon-large"
              onClick={() => handleViewDetails(record.applications)}
            ></i>
          </Tooltip>
          {/* <Tooltip title="Deletar">
            <i
              className="ri-delete-bin-line icon-large"
              onClick={()=>showDeleteConfirmation(record)} 
            ></i>
          </Tooltip> */}
        </>
      ),
    },
  ];

  const applicationColumns = [
    {
      title: 'Pet',
      dataIndex: 'petInfo',
      key: 'petInfo',
      render: (petInfo) => petInfo.name,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) =><Tag color={status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'orange'}> {status} </Tag>
    },
  ];

  const handleViewDetails = (applications) => {
    setSelectedApplication(applications);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedApplication(null);
  };

  useEffect(() => {
    getApplicationsData();
  }, []);

  return (
    <>
      <Table dataSource={userApplications} columns={columns} />

      <Modal
        title="Detalhes do Adotante"
        visible={isModalVisible}
        onOk={handleModalClose}
        onCancel={handleModalClose}
        width={800}
      >
        {selectedApplication && (
          <Tabs defaultActiveKey="personalInfo">
            <Tabs.TabPane tab="Aplicações" key="applications">
              <Table dataSource={selectedApplication} columns={applicationColumns} />
            </Tabs.TabPane>
          </Tabs>
        )}
      </Modal>
    </>
  );
}

export default Userslist;
