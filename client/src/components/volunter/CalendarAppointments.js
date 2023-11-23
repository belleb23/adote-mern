import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useSelector } from "react-redux";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function CalendarAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [tooltip, setTooltip] = useState({});

  const { user } = useSelector((state) => state.user);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/volunter/get-appointments-by-volunter-id/${user._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        console.log(response)
        if (response.data.success) {
          const appointmentData = response.data.data.map((appointment) => ({
            id: appointment._id,
            title: `Adotante: ${appointment.userInfo.name}`,
            start: moment(`${appointment.date}T${appointment.time}`, 'DD-MM-YYYYTHH:mm:ss').format(),
            end: moment(`${appointment.date}T${appointment.time}`, 'DD-MM-YYYYTHH:mm:ss').format(),
            tooltip: appointment.userInfo.name,
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
    // week: true,
    // day: true, 
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: '#4f3693',
      borderRadius: '5px',
      border: '0',
      color: 'white',
      display: 'block',
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
    <div>
    <h1 className="page-header">Visitas</h1>
    <hr />
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
        style={{
          position: 'absolute',
          top: tooltip.top,
          left: tooltip.left,
          backgroundColor: 'purple',
          color: 'white',
          padding: '5px',
          borderRadius: '5px',
          pointerEvents: 'none',
          zIndex: '9999',
        }}
      >
        {tooltip.text}
      </div>
    )}
  </div>
  );
}

export default CalendarAppointments;
