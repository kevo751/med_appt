import React, { useState } from 'react';
import './ReviewForm.css';
import GiveReviews from './GiveReviews';

const doctors = [
  { id: 1, name: 'Dr. John Doe', speciality: 'Cardiology' },
  { id: 2, name: 'Dr. Jane Smith', speciality: 'Dermatology' },
  { id: 3, name: 'Dr. Denis Raj', speciality: 'Dentist' },
];

function ReviewForm() {
  const [reviews, setReviews] = useState({});

  const handleReview = (doctorId, data) => {
    setReviews({ ...reviews, [doctorId]: data });
  };

  return (
    <div className="reviews-container">
      <h1>Reviews</h1>
      <table className="reviews-table">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Doctor Name</th>
            <th>Doctor Speciality</th>
            <th>Provide Feedback</th>
            <th>Review Given</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => {
            const given = reviews[doctor.id];
            return (
              <tr key={doctor.id}>
                <td>{index + 1}</td>
                <td>{doctor.name}</td>
                <td>{doctor.speciality}</td>
                <td>
                  <GiveReviews doctor={doctor} onSubmit={handleReview} />
                </td>
                <td>
                  {given && (
                    <div>
                      <span className="given-stars">{'★'.repeat(given.rating)}</span>
                      <p>{given.review}</p>
                      <small>- {given.name}</small>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ReviewForm;