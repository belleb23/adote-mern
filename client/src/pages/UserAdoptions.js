import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Radio, Tag, Tooltip, Modal, Row, Col } from 'antd';
import moment from "moment";
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { useNavigate, useParams } from "react-router-dom";


function UserAdoptions() {
  const [adoptions, setAdoptions] = useState([]);
  const [selectedAdoption, setSelectedAdoption] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [filter, setFilter] = useState('all');
  const dispatch = useDispatch();
  const navigate = useNavigate();


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
      title: 'Data aplicação',
      dataIndex: 'createdAt',
      render: (record) => moment(record.createdAt).format('DD-MM-YYYY'),
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
      title: 'Ações',
      key: 'action',
      render: (text, record) => (
        <div>
          <Tooltip title="Visualizar Adoção">
             <i
              className="ri-file-list-3-line icon-large"
              onClick={() => handleViewAdoption(record)}
            ></i>
           
          </Tooltip>
          {record.status === "approved" && (
            <Tooltip title="Buscar Pet">
              <i
                className="ri-calendar-check-fill icon-large"
                onClick={() => {
                  navigate("/appointments");
                }}
              ></i>

            </Tooltip>
          )}
        </div>
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

  const handleViewAdoption = (adoption) => {
    setSelectedAdoption(adoption);
    setIsModalVisible(true);
  };

  return (
    <Layout>
      <Row justify="space-between" align="middle" style={{ marginBottom: '16px' }}>
        <Col flex="auto">
          <h1 className="page-title">Minhas Adoções</h1>
        </Col>
        <Col flex="auto" lg={{ span: 12 }}>
          <Radio.Group
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <Radio.Button value="all">Todas</Radio.Button>
            <Radio.Button value="approved">Aprovadas</Radio.Button>
            <Radio.Button value="pending">Pendentes</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <hr/>
      <Table dataSource={filteredAdoptions} columns={columns} />


      {isModalVisible && (
        
        <Modal
          title="Detalhes do Adoção"
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          {selectedAdoption && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <p><strong>Nome:</strong> {selectedAdoption.petInfo.name}</p>
                <p><strong>Porte:</strong> {selectedAdoption.petInfo.petSize}</p>
                <p><strong>Idade:</strong> {selectedAdoption.petInfo.age}</p>
                <p><strong>Raça:</strong> {selectedAdoption.petInfo.race}</p>
                <p><strong>Sexo:</strong> {selectedAdoption.petInfo.sex}</p>
                <p><strong>Castrado:</strong> {selectedAdoption.petInfo.castration ? 'Sim' : 'Não'}</p>
                <p><strong>Vacinas Recebidas:</strong> {selectedAdoption.petInfo.vaccine}</p>
                <p><strong>Possui Alguma Deficiência:</strong> {selectedAdoption.petInfo.illness ? 'Sim' : 'Não'}</p>
                {selectedAdoption.petInfo.illness && <p><strong>Tipo de Deficiência:</strong> {selectedAdoption.petInfo.illnessType}</p>}
                <p><strong>Descrição:</strong> {selectedAdoption.petInfo.description}</p>
                <p><strong>Tipo de Pet:</strong> {selectedAdoption.petInfo.petType}</p>
              </div>
              {selectedAdoption.petInfo.urlPic && 
                <img src={selectedAdoption.petInfo.urlPic} style={{ width: '220px', height: 'auto', marginLeft: '16px' }} alt="Foto do Pet" 
              />}
            </div>
          )}
        </Modal>
      )}
    </Layout>
  );
}

export default UserAdoptions;
