import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function DetailsPet() {
    const { user } = useSelector((state) => state.user);
    const [pet, setPet] = useState(null);
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
      }, []);

  return (
    <Layout>
    {pet && (
        <div className="page-title">{pet.name}</div>
    )}
    </Layout>   
  )
}

export default DetailsPet