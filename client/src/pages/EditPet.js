import React, { useEffect, useState } from 'react';
import PetForm from '../components/pet/PetForm';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditPet() {
    const { user } = useSelector((state) => state.user);
    const params = useParams();
    const [pet, setPet] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
        dispatch(showLoading());
        const response = await axios.post(
            "/api/user/update-pet",
            {
            ...values,
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
            console.log(response.data)
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
        <h1 className="page-title">Edição Pet</h1>
        <hr />
        {pet && <PetForm onFinish={onFinish} initivalValues={pet}/>}
    </Layout>
  )
}

export default EditPet