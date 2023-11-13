
import ApplicationForm from '../components/user/ApplicationForm'; 
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
  const [isApplying, setIsApplying] = useState(false); 
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

  const onApply = async (formData) => {
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
            <p>Você já aplicou para essa adoção. Aguarde a resposta do voluntário.</p>
          ) : isApplying ? (
            <ApplicationForm onSubmit={onApply} />
          ) : (
            <Button className="primary-button" onClick={() => setIsApplying(true)}>Adotar</Button>
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
