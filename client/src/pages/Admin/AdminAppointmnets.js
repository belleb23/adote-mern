import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from "react-redux";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';
import Layout from '../../components/Layout'

const localizer = momentLocalizer(moment);

function AdminAppointmnets() {
  const [appointments, setAppointments] = useState([]);
  const [tooltip, setTooltip] = useState({});

  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/admin/get-all-appointments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          const appointmentData = response.data.data.map((appointment) => ({
            id: appointment._id,
            title: `Voluntário: ${appointment.volunterInfo.userName}, Adotante: ${appointment.userInfo.name}, Tipo: ${appointment.appointmentType[0]?.value}`,
            start: moment(`${appointment.date}T${appointment.time}`, 'DD-MM-YYYYTHH:mm:ss').format(),
            end: moment(`${appointment.date}T${appointment.time}`, 'DD-MM-YYYYTHH:mm:ss').format(),
            tooltip: appointment.userInfo.name,
            appointmentType: appointment.appointmentType
          }));
          console.log(appointmentData)
          setAppointments(appointmentData);
        }
      } catch (error) {
      }
    };

    fetchData();
  }, [user]);

   const views = {
    month: true,
    agenda: true,
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = '#4f3693'; 
    let fontSize = '14px';

    if (event.appointmentType && Array.isArray(event.appointmentType) && event.appointmentType.length > 0) {
        const typeValue = event.appointmentType[0]?.value; 
        if (typeValue === 'buscarPet') {
          backgroundColor = '#7a46e1'; 
        } else if (typeValue === 'visita') {
          backgroundColor = '#ffc100'; 
        }
    }
  
    const style = {
      backgroundColor,
      borderRadius: '5px',
      border: '0',
      color: 'white',
      display: 'block',
      fontSize
    };
    return { style };
  };

  const handleEventMouseOver = (event) => {
    setTooltip({
      top: event.pageY,
      left: event.pageX,
      text: event.tooltip,
    });
  };

  const handleEventMouseOut = () => {
    setTooltip({});
  };


  return (
    <Layout>
    
    <Calendar
      localizer={localizer}
      events={appointments}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      eventPropGetter={eventStyleGetter}
      onMouseOver={(e) => handleEventMouseOver(e.target)}
      onMouseOut={handleEventMouseOut}
      views={views}
    />

    {tooltip.text && (
        <div
            className="tooltip"
            style={{
            top: tooltip.top,
            left: tooltip.left,
            }}
        >
            {tooltip.text}
        </div>
    )}

  </Layout>
  
  );
}

export default AdminAppointmnets;
