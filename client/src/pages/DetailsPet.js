
import ApplicationForm from '../components/user/ApplicationForm'; 
import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

function DetailsPet() {
  const { user } = useSelector((state) => state.user);
  const [pet, setPet] = useState(null);
  const [isApplying, setIsApplying] = useState(false); 
  const [hasApplied, setHasApplied] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isIntroModalVisible, setIsIntroModalVisible] = useState(false);

const handleIntroModalOk = () => {
  setIsIntroModalVisible(false);
  setIsModalVisible(true);
};

  const handleApplyClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const params = useParams();
  const dispatch = useDispatch();

  const getPetData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/get-pet-info-by-id",
          {
            petId: params.petId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        dispatch(hideLoading());
        if (response.data.success) {
          setPet(response.data.data);
        }
      } catch (error) {
        console.log(error);
        dispatch(hideLoading());
      }
    };

  const checkIfUserApplied = async () => {
    try {
      const response = await axios.get('/api/user/check-application', {
        params: {
          petId: params.petId,
          userId: user._id,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.applied) {
        setHasApplied(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
    
  useEffect(() => {
    getPetData();
    checkIfUserApplied();
  }, []);

  const onApplyPet = async (formData) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/applications', {
        petId: params.petId,
        userInfo: user,
        petInfo: pet,
        userId: user._id,
        status: 'pending',
        ...formData, 
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      dispatch(hideLoading());
      console.log(response);
      if (response.data.success) {
        toast(response.data.success);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  }

  return (
  <Layout>
    {pet && (
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, flexDirection: "column" }}>
          <div className="page-title">{pet.name}</div>
          <hr/>
          <p style={{fontSize:"20px"}}>
            O pet {pet.name.toLowerCase()} é {pet.description}, tem {pet.ageNumber} anos,
            é castrado, e está a procura de um lar.
          </p>
          <br/>
          <p style={{fontSize:"20px"}}>
            Nos ajude a encontrar um lar para ele :)
          </p>
          <br/>

          {hasApplied ? (
            <p style={{ textDecoration: 'underline' }}>Você já aplicou para essa adoção. Aguarde a resposta do voluntário.</p>
          ) : (
            <>
              <Button className="primary-button" onClick={() => setIsIntroModalVisible(true)}>
                Adotar
              </Button>
              <Modal
                title="Responsabilidades da Adoção"
                visible={isIntroModalVisible}
                onOk={handleIntroModalOk}
                onCancel={() => setIsIntroModalVisible(false)}
              >
                <p>
                Todos os dados que você informar nesse questionário serão usados única e exclusivamente pela Equipe da Adote um Vira-Lata para análise de compatibilidade com os requisitos de adoção.
                </p>
                <br/>
                <p>
                *Pedimos que leia com atenção: esse é o questionário para adoção de um dos nossos resgatados, ele não garante a reserva do animal, além disso, para respondê-lo e poder adotar você precisa ter, pelo menos, 18 anos completos. 
                Caso contrário, encaminhe o questionário para o seu responsável legal preencher com as informações dele(a). Pedimos que responda todas as perguntas com sinceridade porque não toleramos adoções irresponsáveis. 
                Adote com responsabilidade, pense antes de querer assumir esse compromisso com um animal, porque é pra vida toda, nós doamos o nosso tempo pra eles e buscamos pelo lar aonde recebam todo o amor possível.*
                </p>
              </Modal>
              <Modal
                title="Formulário de Aplicação"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={650}
              >
                <ApplicationForm onSubmit={onApplyPet} />
              </Modal>
            </>
          )}

        </div>
        <img
          alt={pet.name}
          src={pet.urlPic}
          style={{ width: 400, height: 400, objectFit: "cover", borderRadius: "10px" }}
          />
      </div>
    )}
  </Layout>

  )
}

export default DetailsPet;
