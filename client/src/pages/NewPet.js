import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import PetForm from "../components/pet/PetForm";
import moment from "moment";

function NewPet() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const owner = '';

  const addPet = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/pets",
        {
          ...values,
          userId: user._id,
          owner
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
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <h1 className="page-title">Novo Pet</h1>
      <hr />

      <PetForm onFinish={addPet} /> 
    </Layout>
  )
}

export default NewPet