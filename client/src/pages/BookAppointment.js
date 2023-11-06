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
          const response = await axios.post(
            "/api/volunter/get-volunter-info-by-id",
            {
              volunterId: params.volunterId,
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
        {volunter && ( 
            <div>
                <p>{volunter.name}</p>
                <Row gutter={20} className="mt-5" align="middle">
                <Col span={8} sm={24} xs={24} lg={8}>
                    <h1 className="normal-text">
                        <b>Timings :</b> {volunter.timings[0]} - {volunter.timings[1]}
                    </h1>
                    <p>
                        <b>Phone Number : </b>
                        {volunter.phoneNumber}
                    </p>
                    <p>
                        <b>Address : </b>
                        {volunter.address}
                    </p>

                <div className="d-flex flex-column pt-2 mt-2">
                    <DatePicker
                    format="DD-MM-YYYY"
                     onChange={(value) => {
                         setDate(dayjs(value).format("DD-MM-YYYY"));
                         setIsAvailable(false);
                     }}
                    />
                    <TimePicker
                    format="HH:mm"
                    className="mt-3"
                     onChange={(value) => {
                         setIsAvailable(false);
                         setTime(dayjs(value).format("HH:mm"));
                     }}
                    />
                                 {!isAvailable &&   <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>}

                {isAvailable && (
                  <Button
                    className="primary-button mt-3 full-width-button"
                    onClick={bookNow}
                  >
                    Book Now
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