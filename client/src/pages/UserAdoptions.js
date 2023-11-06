import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux';
import { Table, Radio, Tag, DatePicker } from 'antd';
import moment from "moment";


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
        console.log(userAdoptions);
        setAdoptions(userAdoptions);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserAdoptions();
  }, []);

  const columns = [
    {
      title: 'Pet',
      dataIndex: 'petInfo',
      key: 'petName',
      render: (petInfo) => petInfo.name,
    },
    {
      title: "Data aplicação",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
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
    {
      title: "Retirar Pet",
      dataIndex: "retirarData",
      render: (text, record) => (
        <DatePicker
          placeholder="Selecione a data"
          format="DD-MM-YYYY"
         // onChange={(date, dateString) => handleRetirarPet(record, dateString)}
        />
      ),
    },
  ];

  const filteredAdoptions = adoptions.filter((adoption) => {
    if (filter === 'approved') {
      return adoption.status === 'approved';
    } else if (filter === 'pending') {
      return adoption.status === 'pending';
    }
    return true; 
  });

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1 className="page-title">Minhas Adoções</h1>
      
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
    </Layout>
  );
}

export default UserAdoptions;
