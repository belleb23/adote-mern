import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Radio } from 'antd';

function UserAdoptions() {
  const { user } = useSelector((state) => state.user);
  const [adoptions, setAdoptions] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'approved', or 'pending'

  const fetchUserAdoptions = async () => {
    try {
      const response = await axios.get('/api/user/user-adoptions', {
        params: {
          userId: user._id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        const userAdoptions = response.data.data;
        setAdoptions(userAdoptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Busque as adoções do usuário
    fetchUserAdoptions();
  }, []);

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
    // Adicione mais colunas conforme necessário
  ];

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
      <h2>Adoções</h2>
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

export default UserAdoptions;
