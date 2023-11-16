import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Radio, Tag, DatePicker } from 'antd';
import moment from "moment";
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { useNavigate, useParams } from "react-router-dom";


function UserAdoptions() {
  const [adoptions, setAdoptions] = useState([]);
  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();

  const params = useParams();
  const { user } = useSelector((state) => state.user);

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        '/api/user/user-adoptions',
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        setAdoptions(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      
    }
  };

  useEffect(() => {
    getUserData();
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
