import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { Table, Radio, Tooltip, Select, Button } from 'antd';

function Applications() {
  const [adoptions, setAdoptions] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'approved', or 'pending'
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [approvalStatus, setApprovalStatus] = useState('pending'); // 'approved' or 'pending'
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Nome do Animal',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ação',
      key: 'action',
      render: (text, record) => (
        <div>
          <Tooltip title="Ver Detalhes">
            <Button onClick={() => handleViewDetails(record)}>Detalhes</Button>
          </Tooltip>
        </div>
      ),
    },
    {
      title: 'Aprovação',
      dataIndex: 'approval',
      key: 'approval',
      render: (text, record) =>
        selectedApplication && selectedApplication._id === record._id ? (
          <Select
            defaultValue={record.approval}
            style={{ width: 120 }}
            onChange={(value) => handleApprovalChange(value, record)}
          >
            <Select.Option value="approved">Aprovada</Select.Option>
            <Select.Option value="pending">Pendente</Select.Option>
          </Select>
        ) : (
          record.approval
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

  useEffect(() => {
    getApplicationsData();
  }, []);

  const handleViewDetails = (application) => {
    setSelectedApplication(application);
  };

  const handleApprovalChange = (value, application) => {
    // Atualize o status de aprovação da aplicação no estado ou no banco de dados
    // Aqui, apenas atualizaremos o estado para fins de demonstração
    application.approval = value;
    setSelectedApplication(null); // Feche o dropdown de aprovação
    // Você pode enviar uma solicitação ao servidor para atualizar o status no banco de dados
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
      <h1>Applications</h1>
      <Radio.Group
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <Radio.Button value="all">Todas</Radio.Button>
        <Radio.Button value="approved">Aprovadas</Radio.Button>
        <Radio.Button value="pending">Pendentes</Radio.Button>
      </Radio.Group>
      <Table dataSource={filteredAdoptions} columns={columns} />
    </Layout>
  );
}

export default Applications;
