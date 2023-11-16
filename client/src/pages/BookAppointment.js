import { Button, Col, DatePicker, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import dayjs from 'dayjs';

function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false);
    const navigate = useNavigate();
    const [date, setDate] = useState();
    const [time, setTime] = useState();

    const [volunter, setVolunter] = useState(null);
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const params = useParams();
    
    const getVolunterData = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.get(
          `/api/volunter/get-volunter-info-by-id/${params.volunterId}`,
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

    const checkAvailability = async () => {
      try {
          console.log("data")
          console.log(date)
          console.log("time")
          console.log(time)
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/check-booking-avilability",
          {
            volunterId: params.volunterId,
            date: date,
            time: time,
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
          setIsAvailable(true);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
    };

    const bookNow = async () => {
      setIsAvailable(false);
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/user/book-appointment",
          {
            volunterId: params.volunterId,
            userId: user._id,
            volunterInfo: volunter,
            userInfo: user,
            date: date,
            time: time,
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
          navigate('/appointments')
        }
      } catch (error) {
        toast.error("Error booking appointment");
        dispatch(hideLoading());
      }
    };

    useEffect(() => {
      getVolunterData();
    }, []);

  return (
    <Layout>
        <h1 className="page-title">Acompanhante da Visita</h1>
        <hr/>
        {volunter && ( 
            <div className="center-content">
                <Row gutter={20} className="mt-2 outlined-row" align="middle">
                <Col >
                    <h2 className="normal-text" >Voluntária: {volunter.name}</h2>
                    <h3 className="normal-text">
                        <b>Horários Disponíveis :</b> {volunter.timings[0]} - {volunter.timings[1]}
                    </h3>
                    <p>
                        <b>Telefone : </b>
                        {volunter.phoneNumber}
                    </p>
                    <p>
                        <b>Endereço : </b>
                        {volunter.address}
                    </p>

                <div className="d-flex flex-column pt-2 mt-2">
                    <DatePicker
                    format="DD-MM-YYYY"
                    placeholder={'Selecionar data'}
                     onChange={(value) => {
                         setDate(dayjs(value).format("DD-MM-YYYY"));
                         setIsAvailable(false);
                     }}
                    />
                    <TimePicker
                    format="HH:mm"
                    className="mt-3"
                    placeholder={'Selecionar horário'}
                     onChange={(value) => {
                         setIsAvailable(false);
                         setTime(dayjs(value).format("HH:mm"));
                     }}
                    />
                                 {!isAvailable &&   <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={checkAvailability}
                >
                  Verificar Disponibilidade
                </Button>}

                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Marcar
                  </Button>
                )}
                </div>
                </Col>
                </Row>
            </div>
        )}
        
    </Layout>
  )
}

export default BookAppointment