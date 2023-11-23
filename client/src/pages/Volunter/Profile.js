import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import VolunterForm from "../../components/volunter/VolunterForm";
import moment from "moment";
import dayjs from 'dayjs';
import UserForm from "../../components/user/UserForm";


function Profile() {
  const { user } = useSelector((state) => state.user);

  console.log('oieeee')
  console.log(user);
  const params = useParams();
  const [volunter, setVolunter] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onUpdateVolunter = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(
        "/api/volunter/update-volunter-profile",
        {
          ...values,
          userId: user._id,
          timings: [
            dayjs(values.timings[0]).format("HH:mm"),
            dayjs(values.timings[1]).format("HH:mm"),
          ],
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

  const onUpdateUser = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(
        "/api/user/update-user-profile",
        {
          ...values,
          userId: user._id,
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
     //   navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  const getVolunterData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get(
        `/api/volunter/get-user-and-volunter-info/${params.userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
       
        setVolunter(response.data.data);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    getVolunterData();
  }, [user]);
  
  return (
    <Layout>
      <h1 className="page-title">Perfil</h1>
      <hr />
      {volunter && volunter.isVolunter && (
        <VolunterForm onFinish={onUpdateVolunter} initivalValues={volunter} btn="salvar"/>
      )}
      {(!volunter || !volunter.isVolunter) && (
        <div>
         <UserForm onFinish={onUpdateUser} initivalValues={user} btn="salvar"/>
        </div>

        
      )}
      
    </Layout>
  );
}

export default Profile;