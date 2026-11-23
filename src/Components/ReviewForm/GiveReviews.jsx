import React, { useState } from 'react';

function GiveReviews({ doctor, onSubmit, onClose }) {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !review || rating === 0) {
      setError('Please fill in all fields and choose a rating.');
      return;
    }
    onSubmit({ name, review, rating });
  };

  return (
    <div className="review-overlay">
      <form className="review-form" onSubmit={handleSubmit}>
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
          <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default GiveReviews;
