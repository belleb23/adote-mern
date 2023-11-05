import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { Table, Tooltip, Modal, Button } from "antd";

function Pets() {
  const navigate = useNavigate();

  const [pets, setPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [petToDelete, setPetToDelete] = useState(null);
  const [editingPet, setEditingPet] = useState(null); 

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
      title: "Nome",
      dataIndex: "name",
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
              //onClick={() => updatePet(record)}
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

  return (
    <Layout>
      <h1 className="page-title">Pets</h1>
      <hr />
      <div style={{ marginBottom: "16px", textAlign:"right" }}>
        <Button
          type="primary"
          className="primary-button"
          onClick={() => navigate("/new-pet")}
        >
           + Add Pet
        </Button>
      </div>
      <Table columns={columns} dataSource={pets} />

      {isModalVisible && (
        
        <Modal
          title="Detalhes do Pet"
          visible={isModalVisible}
          onOk={() => setIsModalVisible(false)}
          onCancel={() => setIsModalVisible(false)}
        >
          {selectedPet && (
            <div>
              <p>Nome: {selectedPet.name}</p>
              <p>Porte: {selectedPet.petSize}</p>
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
