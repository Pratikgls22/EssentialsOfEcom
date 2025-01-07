import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button, Grid, Snackbar, TextField, Typography } from '@mui/material';

const EditUserProfile = () => {
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    alternatePhoneNumber: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    country: '',
    accountNumber: '',
    accountHolderName: '',
    ifscCode: '',
    panNumber: '',
    gstNumber: '',
    roleName: ''
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      setTimeout(() => (window.location.href = '/login'), 3000);
      return;
    }

    const decodedToken = jwtDecode(token);
    fetchUserData(decodedToken.userId, token);
  }, []);

  // Fetch user data on component load
  const fetchUserData = async (id, token) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(response.data);
    } catch (error) {
      setErrorMessage('Failed to fetch user data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const token = Cookies.get('authToken');
      const response = await axios.put(`http://localhost:8080/api/v1/user/updateUserById/${userData.userId}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setSuccessMessage(response.data.message);
      closeDialog(); // Close dialog after success
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Failed to update user profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" sx={{ padding: '10px' }}>
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Edit User Profile
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Name" name="userName" value={userData.userName} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" value={userData.email} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Alternate Phone"
                name="alternatePhoneNumber"
                value={userData.alternatePhoneNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Address" name="address" value={userData.address} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="City" name="city" value={userData.city} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="State" name="state" value={userData.state} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Pin Code" name="pinCode" value={userData.pinCode} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Country" name="country" value={userData.country} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Number"
                name="accountNumber"
                value={userData.accountNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Account Holder Name"
                name="accountHolderName"
                value={userData.accountHolderName}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="IFSC Code" name="ifscCode" value={userData.ifscCode} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PAN Number"
                name="panNumber"
                value={userData.panNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="GST Number"
                name="gstNumber"
                value={userData.gstNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Role Name" name="roleName" value={userData.roleName} onChange={handleChange} variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      {successMessage && (
        <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage('')} message={successMessage} />
      )}
      {errorMessage && (
        <Snackbar open={!!errorMessage} autoHideDuration={4000} onClose={() => setErrorMessage('')} message={errorMessage} />
      )}
    </Grid>
  );
};
export default EditUserProfile;
