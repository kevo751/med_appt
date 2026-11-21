import React, { useState } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return setError('Please enter your name.');
    if (!/^\d{10}$/.test(phoneNumber)) return setError('Phone number must be 10 digits.');
    if (!date) return setError('Please choose a date.');
    if (!selectedSlot) return setError('Please choose a time slot.');
    setError('');
    onSubmit({ name, phoneNumber, date, time: selectedSlot });
    setName('');
    setPhoneNumber('');
    setDate('');
    setSelectedSlot('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="appointment-form">
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="date">Date of Appointment:</label>
        <input type="date" id="date" min={today} value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="slot">Book Time Slot:</label>
        <select id="slot" value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)} required>
          <option value="">Select a time slot</option>
          <option value="09:00 AM">09:00 AM</option>
          <option value="10:00 AM">10:00 AM</option>
          <option value="11:00 AM">11:00 AM</option>
          <option value="02:00 PM">02:00 PM</option>
          <option value="03:00 PM">03:00 PM</option>
          <option value="04:00 PM">04:00 PM</option>
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Book Now</button>
    </form>
  );
};

export default AppointmentForm;
