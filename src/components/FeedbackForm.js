import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FeedbackForm() {
  const { state } = useLocation();
  const [details, setDetails] = useState({
    pourquoi: '',
    amelioration: '',
    contact: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback:', { ...state, ...details });
    alert('Merci pour vos retours ! Nous vous contacterons si nécessaire.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-google-gray flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-google-dark-gray mb-6 text-center">
          Dites-Nous Plus
        </h1>
        {/* ... rest of the JSX ... */}
      </div>
    </div>
  );
}

export default FeedbackForm; // Confirmed export