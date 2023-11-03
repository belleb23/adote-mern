import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import axios from 'axios';

const localizer = momentLocalizer(moment);

function CalendarAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/volunter/get-appointments-by-volunter-id', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          const appointmentData = response.data.data.map((appointment) => ({
            id: appointment._id,
            title: `Adotante: ${appointment.userInfo.name}`,
            start: moment(`${appointment.date}T${appointment.time}`, 'DD-MM-YYYYTHH:mm:ss').format(),
            end: moment(`${appointment.date}T${appointment.time}`, 'DD-MM-YYYYTHH:mm:ss').format(),
          }));
          console.log(appointmentData)
          setAppointments(appointmentData);
        }
      } catch (error) {
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="page-header">Appointments</h1>
      <hr />
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default CalendarAppointments;
