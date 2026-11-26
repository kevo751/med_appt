import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function GiveReviews({ doctor, onSubmit }) {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e, close) => {
    e.preventDefault();
    if (!name || !review || rating === 0) {
      setError('Please fill in all fields and choose a rating.');
      return;
    }
    onSubmit(doctor.id, { name, review, rating });
    setSubmitted(true);
    close();
  };

  return (
    <Popup
      modal
      trigger={
        <button className="feedback-btn" disabled={submitted}>
          {submitted ? 'Review Given' : 'Click Here'}
        </button>
      }
    >
      {(close) => (
        <form className="review-form" onSubmit={(e) => handleSubmit(e, close)}>
          <h2>Give Your Feedback</h2>
          <p className="review-doctor">{doctor.name} ({doctor.speciality})</p>

          <label htmlFor="name">Name:</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="review">Review:</label>
          <textarea id="review" rows="4" value={review} onChange={(e) => setReview(e.target.value)} />

          <label>Rating:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={star <= rating ? 'star filled' : 'star'}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>

          {error && <p className="review-error">{error}</p>}

          <div className="review-buttons">
            <button type="submit" className="submit-btn">Submit</button>
            <button type="button" className="cancel-btn" onClick={close}>Cancel</button>
          </div>
        </form>
      )}
    </Popup>
  );
}

export default GiveReviews;