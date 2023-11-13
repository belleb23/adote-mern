import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import VolunterForm from "../components/volunter/VolunterForm";
import moment from "moment";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


function ApplyVolunter() {
  dayjs.extend(customParseFormat);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const enviado = 'enviado';

  const params = useParams();
  const [volunter, setVolunter] = useState(null);

  const onFinish = async (values) => {
    try {
      
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-volunter-account",
        {
          ...values,
          userId: user._id,
          timings: [
            dayjs(values.timings[0]).format("HH:mm"),
            dayjs(values.timings[1]).format("HH:mm"),
          ],
          status: enviado
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
      if (!user) {
        console.error("User is null or undefined");
        dispatch(hideLoading());
        return;
      }
      const userId = user._id;

      if (!userId) {
        console.error("UserID is null or undefined");
        dispatch(hideLoading());
        return;
      }

      const response = await axios.get(
        `/api/volunter/get-volunter-info-by-user-id/${userId}`,
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


  // const getVolunterData = async () => {
  //   try {
  //     dispatch(showLoading());
  //     console.log(params.userId)
  //     const response = await axios.post(
  //       "/api/volunter/get-volunter-info-by-user-id",
  //       {
  //         userId: params.userId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );

  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       setVolunter(response.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     dispatch(hideLoading());
  //   }
  // };

  useEffect(() => {
    getVolunterData();
  }, [user]);

  return (
    <Layout>
    <h1 className="page-title">Voluntário Adote um Vira Lata</h1>
    <hr />

    {!volunter && 
      <div>
        <p>
          Você tem tempo livre, ama cães e gatos, é comprometido, pontual, tem atitude, organização, sabe trabalhar em equipe, 
          se adapta quando necessário e se comunica bem? Então venha nos ajudar com o nosso lindo trabalho... 
          VEM SER UM VOLUNTÁRIO!! 
        </p>
        <hr />
        <VolunterForm onFinish={onFinish} btn="enviar"/> 
      </div>
    }

    {volunter && 
        <p>Voce já aplicou para ser um <space/>
            <Link to={`/volunter/profile/${user?._id}`} className="anchor mt-2">
            voluntário
            </Link> <space/>
          espere o retorno do administrador</p>
    }


  </Layout>
  )
}

export default ApplyVolunter