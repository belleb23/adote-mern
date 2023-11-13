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


function Profile() {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [volunter, setVolunter] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
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

  const getVolunterData = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/volunter/get-volunter-info-by-user-id",
        {
          userId: params.userId,
        },
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
  }, []);
  
  return (
    <Layout>
      <h1 className="page-title">Perfil</h1>
      <hr />
      {volunter && <VolunterForm onFinish={onFinish} initivalValues={volunter} btn="salvar"/>}
      {!volunter && <p>perfil</p>}
      
    </Layout>
  );
}

export default Profile;