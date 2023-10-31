
import ApplicationForm from '../components/ApplicationForm'; // Importe o componente
import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
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
  const [isApplying, setIsApplying] = useState(false); // Estado para controlar se o formulário de aplicação está aberto
  const [hasApplied, setHasApplied] = useState(false);

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

    useEffect(() => {
      getPetData();
      checkIfUserApplied();
    }, []);

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
  

  const onApply = async (formData) => {
    try {
      dispatch(showLoading());
      const response = await axios.post('/api/user/applications', {
        petId: params.petId,
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
        <div>
          <div className="page-title">{pet.name}</div>
          <div className="page-title">{pet.description}</div>

          {hasApplied ? (
            <p>Você já aplicou para essa adoção. Aguarde a resposta do voluntário.</p>
          ) : isApplying ? (
            <ApplicationForm onSubmit={onApply} />
          ) : (
            <button onClick={() => setIsApplying(true)}>Aplicar</button>
          )}
        </div>
      )}
    </Layout>
  )
}

export default DetailsPet;
