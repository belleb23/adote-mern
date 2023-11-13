import React, { useState } from "react";
import Layout from "../Layout";
import { Form, message } from 'antd';
import axios from "axios";
import PetForm from "./PetForm";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";


function AddPet() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/pets",
        {
          ...values,
        //  userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (


    <Layout>
    <h1 className="page-title">Pets</h1>
    <hr />

     <PetForm 
     onFinish={onFinish} 
    /> 

  </Layout>


  )
}

export default AddPet