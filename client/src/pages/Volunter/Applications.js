import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../../redux/alertsSlice';
import { Table, Radio, Tooltip, Tag, Modal, Tabs } from 'antd';
import {toast} from 'react-hot-toast'
import moment from "moment";
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function Applications() {
  const [adoptions, setAdoptions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);
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
      dataIndex: 'userInfo',
      key: 'userInfo',
      render: (userInfo) => userInfo.name,
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
      title: 'Aplicação',
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
            <Tooltip title="PDF">
              <i
                className="ri-download-line icon-large"
                 onClick={() => generatePdf(record)} 
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
      const resposne = await axios.put(
        "/api/volunter/change-application-status",
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

  const generatePdf = (record) => {
    const documentDefinition = {
      content: [
        { text: 'Contrato de Adoção', style: 'header' },
        { text: `Adotante: ${record.userInfo.name}`, style: 'subheader' },
        { text: `Pet Adotado: ${record.petInfo.name}`, style: 'subheader' },
        {
          text: 'Termos e Condições:',
          style: 'subheader',
          margin: [0, 20, 0, 10], // Espaçamento
        },
        'Ao assinar este contrato, o adotante reconhece a responsabilidade de cuidar do animal adotado e concorda com os seguintes termos:',
        {
          ul: [
            'O adotante é responsável por fornecer cuidados adequados, alimentação e abrigo ao animal adotado.',
            'O adotante concorda em não abandonar o animal ou transferi-lo a terceiros sem consentimento prévio da organização de adoção.',
            'O adotante concorda em cumprir todas as leis e regulamentos locais relacionados à posse de animais de estimação.',
            'A organização de adoção não assume responsabilidade por quaisquer danos causados pelo animal após a adoção.',
          ],
        },
        'Ao assinar abaixo, o adotante confirma que leu e concorda com os termos deste contrato e está ciente das responsabilidades associadas à adoção do animal.',
        {
          text: 'Assinatura do Adotante:',
          style: 'subheader',
          margin: [0, 20, 0, 10],
        },
        { text: '', style: 'signature' }, 
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 20],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5],
        },
        signature: {
          fontSize: 12,
          italics: true,
          margin: [0, 0, 0, 40],
          alignment: 'center',
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

    pdfDocGenerator.getBlob((blob) => {
      // Você tem o Blob do PDF aqui, pode fazer o que quiser com ele
      // Por exemplo, você pode salvá-lo como um arquivo ou exibi-lo em um modal
      // Certifique-se de usar a biblioteca apropriada ou método para manipular o Blob
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'detalhes_adotante.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  };

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
                <p>Telefone: {selectedApplication.phone}</p>
                <p>Profissão: {selectedApplication.work}</p>
                <p>Endereço: {selectedApplication.address}</p>
                <p>Idade: {selectedApplication.age} anos</p>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Informações da adoção" key="adoptionInfo">
              <div>
                <p>Tem pets em casa: {selectedApplication.havePet ? 'Sim' : 'Não'} </p>            
                <p>Quantidade de pets: {selectedApplication.qtyPet} </p>              
                <p>Todos vacinados? {selectedApplication.vaciPet} </p>   
                <p>Todos castrados? {selectedApplication.castPet} </p>
                <p>Tem condições para ter um pet? {selectedApplication.condPet} </p>       
                <p>Mora em: {selectedApplication.residenceType} </p>              
                <p>É : {selectedApplication.resiBill} </p>              
                <p>Quantos adultos? {selectedApplication.resiAdult} </p>   
                <p>Todos concordam com a adoção? {selectedApplication.adultAgree} </p>
                <p>Você concorda com todas as perguntas? {selectedApplication.vaciPet} </p>        

              </div>
            </Tabs.TabPane>
          </Tabs>
        )}
      </Modal>
    </Layout>
  );
}

export default Applications;
