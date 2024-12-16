import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Perform logout actions
    handleLogout();
  }, []);

  const handleLogout = () => {
    // Clear user data from local storage or cookies
    localStorage.removeItem('authToken');
    localStorage.removeItem('userDetails');

    // Show a success toast
    toast.success('You have successfully logged out!', {
      position: 'top-center',
      autoClose: 2000, // Close after 2 seconds
    });

    // Redirect to the login page after the toast
    setTimeout(() => {
      navigate('/login'); // Redirect to login page
    }, 1000);
  };

  return (
    <div>
      {/* Render logout message */}
      <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Logging Out...</h1>
      <ToastContainer />
    </div>
  );
};

export default Logout;
