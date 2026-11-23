import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
  const [appointment, setAppointment] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  const loadAppointment = () => {
    const saved = localStorage.getItem('appointmentData');
    if (saved) {
      setAppointment(JSON.parse(saved));
      setShowNotification(true);
    } else {
      setAppointment(null);
      setShowNotification(false); // hides it once the appointment is cancelled
    }
  };

  useEffect(() => {
    loadAppointment();
    window.addEventListener('appointmentChanged', loadAppointment);
    return () => window.removeEventListener('appointmentChanged', loadAppointment);
  }, []);

  const isLoggedIn = !!sessionStorage.getItem('auth-token');
  const username = (sessionStorage.getItem('email') || '').split('@')[0];

  return (
    <div>
      {children}
      {isLoggedIn && showNotification && appointment && (
        <div className="notification-container">
          <h3 className="notification-title">Appointment Details</h3>
          <p><strong>User:</strong> {username}</p>
          <p><strong>Doctor:</strong> {appointment.doctorName}</p>
          <p><strong>Speciality:</strong> {appointment.doctorSpeciality}</p>
          <p><strong>Name:</strong> {appointment.name}</p>
          <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
          <p><strong>Date:</strong> {appointment.date}</p>
          <p><strong>Time:</strong> {appointment.time}</p>
        </div>
      )}
    </div>
  );
};

export default Notification;
