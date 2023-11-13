import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import axios from "axios";
import { Table, Tooltip, Modal, Button } from "antd";

function Pets() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);

  const dispatch = useDispatch();

  const getPetsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/user/pets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        setPets(response.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getPetsData();
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "urlPic",
      render: (urlPic) => (
        <img src={urlPic} alt="Imagem do Pet" style={{ width: '50px', height: '50px' }} />
      ),
    },
    {
      title: "Nome",
      dataIndex: "name",
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
      title: "",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <Tooltip title="Deletar">
            <i
              className="ri-delete-bin-line icon-large"
              onClick={() => showDeleteConfirmation(record)}
            ></i>
          </Tooltip>
          <Tooltip title="Visualizar">
            <i
              className="ri-eye-line icon-large"
              onClick={() => handleViewPet(record)}
            ></i>
          </Tooltip>
          <Tooltip title="Editar">
            <i
              className="ri-pencil-line icon-large"
              onClick={() => handleEditPet(record)}
            ></i>
          </Tooltip>
        </div>
      ),
    },
  ];

  const showDeleteConfirmation = (pet) => {
    setPetToDelete(pet);
    setIsDeleteModalVisible(true);
  };

  const handleDeletePetConfirmation = async () => {
    await handleDeleteUser(petToDelete);
    setIsDeleteModalVisible(false);
  };
  
  const handleCancelDeleteConfirmation = () => {
    setPetToDelete(null);
    setIsDeleteModalVisible(false);
  };


  const handleDeleteUser = async (pet) => {
    try {
      dispatch(showLoading());
      const response = await axios.delete(`/api/admin/delete-pet/${pet._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        getPetsData();
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };


  const handleViewPet = (pet) => {
    setSelectedPet(pet);
    setIsModalVisible(true);
  };

  const handleEditPet = (pet) => {
    navigate(`/edit-pet/${pet._id}`);
  };


  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
      <h1 className="page-title">Pets</h1>
      
        <Button
          type="primary"
          className="primary-button"
          onClick={() => navigate("/new-pet")}
        >
           + Add Pet
        </Button>
        
        
      </div>
     
      <hr/>
      <Table columns={columns} dataSource={pets} />

      {isModalVisible && (
        
        <Modal
          title="Detalhes do Pet"
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          {selectedPet && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <p><strong>Nome:</strong> {selectedPet.name}</p>
                <p><strong>Porte:</strong> {selectedPet.petSize}</p>
                <p><strong>Idade:</strong> {selectedPet.age}</p>
                <p><strong>Idade (em meses/anos):</strong> {selectedPet.ageNumber}</p>
                <p><strong>Raça:</strong> {selectedPet.race}</p>
                <p><strong>Sexo:</strong> {selectedPet.sex}</p>
                <p><strong>Castrado:</strong> {selectedPet.castration ? 'Sim' : 'Não'}</p>
                {/* <p><strong>Vacinas Recebidas:</strong> {selectedPet.vaccine.join(', ')}</p> */}
                <p><strong>Vacinas Recebidas:</strong> {selectedPet.vaccine}</p>
                <p><strong>Possui Alguma Deficiência:</strong> {selectedPet.illness ? 'Sim' : 'Não'}</p>
                {selectedPet.illness && <p><strong>Tipo de Deficiência:</strong> {selectedPet.illnessType}</p>}
                <p><strong>Descrição:</strong> {selectedPet.description}</p>
                <p><strong>Tipo de Pet:</strong> {selectedPet.petType}</p>
              </div>
              {selectedPet.urlPic && 
                <img src={selectedPet.urlPic} style={{ width: '220px', height: 'auto', marginLeft: '16px' }} alt="Foto do Pet" 
              />}

            </div>
          )}
        </Modal>
      )}

      <Modal
        title="Confirmar Exclusão"
        visible={isDeleteModalVisible}
        onOk={handleDeletePetConfirmation}
        onCancel={handleCancelDeleteConfirmation}
      >
        <p>Você tem certeza de que deseja excluir este usuário?</p>
      </Modal>

    </Layout>
  );
}

export default Pets;
