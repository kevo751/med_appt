import React, { useEffect, useState } from 'react';
import { API_URL } from '../../../config';
import { useNavigate } from 'react-router-dom';
import './ProfileCard.css';

const ProfileCard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem('auth-token');
    if (!authtoken) {
      navigate('/login');
    } else {
      fetchUserProfile();
    }
  }, [navigate]);

  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email');
      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          Authorization: `Bearer ${authtoken}`,
          Email: email,
        },
      });
      if (response.ok) {
        const user = await response.json();
        setUserDetails(user);
        setUpdatedDetails(user);
      } else {
        throw new Error('Failed to fetch user profile');
      }
    } catch (err) {
      console.error(err);
      setError('Could not load your profile. Is the server running?');
    }
  };

  const handleEdit = () => setEditMode(true);

  const handleInputChange = (e) => {
    setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!updatedDetails.name || updatedDetails.name.length < 4) {
      setError('Name must be at least 4 characters.');
      return;
    }
    if (!/^\d{10}$/.test(updatedDetails.phone || '')) {
      setError('Phone must be 10 digits.');
      return;
    }
    try {
      const authtoken = sessionStorage.getItem('auth-token');
      const email = sessionStorage.getItem('email');
      if (!authtoken || !email) {
        navigate('/login');
        return;
      }
      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authtoken}`,
          'Content-Type': 'application/json',
          Email: email,
        },
        body: JSON.stringify(updatedDetails),
      });
      if (response.ok) {
        sessionStorage.setItem('name', updatedDetails.name);
        sessionStorage.setItem('phone', updatedDetails.phone);
        setUserDetails(updatedDetails);
        setEditMode(false);
        alert('Profile Updated Successfully!');
        navigate('/');
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      setError('Could not save your changes.');
    }
  };

  return (
    <div className="profile-container">
      {error && <p className="profile-error">{error}</p>}
      {editMode ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>
          <label>
            Email
            <input type="email" name="email" value={userDetails.email || ''} disabled />
          </label>
          <label>
            Name
            <input type="text" name="name" value={updatedDetails.name || ''} onChange={handleInputChange} />
          </label>
          <label>
            Phone
            <input type="text" name="phone" value={updatedDetails.phone || ''} onChange={handleInputChange} />
          </label>
          <div className="profile-buttons">
            <button type="submit">Save</button>
            <button type="button" className="secondary" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-details">
          <div className="profile-avatar">{(userDetails.name || '?').charAt(0).toUpperCase()}</div>
          <h1>Welcome, {userDetails.name}</h1>
          <p><b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
