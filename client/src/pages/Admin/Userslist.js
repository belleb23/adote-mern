import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import axios from "axios";
import { Table, Tooltip, Modal } from "antd";
import moment from "moment";

function Userslist() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const dispatch = useDispatch();
  
  const getUsersData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        const filteredUsers = response.data.data.filter(
          user=> !user.isVolunter && !user.isAdmin
        );
        setUsers(filteredUsers);
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Data",
      dataIndex: "createdAt",
      render: (record , text) => moment(record.createdAt).format("DD-MM-YYYY"),
    },
    {
      title: "",
      dataIndex: "actions",
      render:(text, record) => (
        <div className='d-flex'>
          <Tooltip title="Deletar">
            <i
              className="ri-delete-bin-line icon-large"
              onClick={()=>showDeleteConfirmation(record)} 
            ></i>
          </Tooltip>
          <Tooltip title="Visualizar">
            <i
              className="ri-eye-line icon-large"
              onClick={() => handleViewUser(record)}
            ></i>
          </Tooltip>
        </div>
      )
    },
  ];
  const showDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteUserConfirmation = async () => {
    // Exclua o usuário e atualize a lista
    await handleDeleteUser(userToDelete);
    setIsDeleteModalVisible(false);
  };
  
  const handleCancelDeleteConfirmation = () => {
    setUserToDelete(null);
    setIsDeleteModalVisible(false);
  };

  const handleDeleteUser = async (user) => {
    try {
      // Sua lógica de exclusão aqui
      // Certifique-se de atualizar a lista de usuários após a exclusão bem-sucedida
      dispatch(showLoading());
      const response = await axios.delete(`/api/admin/delete-user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        // Atualize a lista de usuários após a exclusão bem-sucedida
        getUsersData();
      }
    } catch (error) {
      dispatch(hideLoading());
    }
  };

    const handleViewUser = (user) => {
      setSelectedUser(user);
      setIsModalVisible(true);
    };
  
    const handleModalClose = () => {
      setIsModalVisible(false);
      setSelectedUser(null);
    }; 
  
  return (

    <div>
     <Table columns={columns} dataSource={users}/>

        <Modal
          title="Detalhes do Usuário"
          visible={isModalVisible}
          onOk={handleModalClose}
          onCancel={handleModalClose}
          width={800}
        >
          {selectedUser && (
            <div>
              <p>Nome: {selectedUser.name}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Data de Criação: {moment(selectedUser.createdAt).format("DD-MM-YYYY")}</p>
            </div>
          )}
        </Modal>
        
      <Modal
        title="Confirmar Exclusão"
        visible={isDeleteModalVisible}
        onOk={handleDeleteUserConfirmation}
        onCancel={handleCancelDeleteConfirmation}
      >
        <p>Você tem certeza de que deseja excluir este usuário?</p>
      </Modal>
    </div>
     

      
  );
}

export default Userslist;