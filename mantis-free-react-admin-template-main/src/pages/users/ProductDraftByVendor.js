import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button, Grid, Typography } from '@mui/material';
import ApproveDraft from '../utilies/ApproveDraft';
import RejectProductDraft from '../utilies/RejectProductDraft';
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const ProductDraftByVendor = () => {
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const [statusDetails, setStatusDetails] = useState(null);

  // Retrieve the token from cookies
  const token = Cookies.get('authToken');

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      fetchStatusDetails(decodedToken.userId);
    } else {
      // If no token, redirect to login
      setTimeout(() => (window.location.href = '/login'), 3000);
    }
  }, [token]);

  // Function to fetch status details
  const fetchStatusDetails = async (vendorId) => {
    setDetailsLoading(true); // Start loading for status details
    setDetailsError(null); // Clear any previous error
    setStatusDetails(null); // Clear previous status details

    try {
      const response = await axios.get(`http://localhost:8080/product/productDrafts/${vendorId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Pass the authentication token
        }
      });
      console.log('Response data :', response.data.data);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch brand details :: ${response.status} ${response.statusText}`);
      }

      if (!response.data.data || response.data.data.length === 0) {
        throw new Error('No status details found for the selected status.');
      }
      setStatusDetails(response.data.data); // Assuming response format: { data: [...] }
      setDetailsLoading(false); // Stop loading
    } catch (err) {
      console.error('Error:', err); // Log error for debugging
      setDetailsError('Failed to fetch status details! Status has no data.');
      setDetailsLoading(false); // Stop loading on error
    } finally {
      setDetailsLoading(false); // Stop loading in all cases
    }
  };

  return (
    <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
      {detailsLoading && <Typography>Loading status details...</Typography>}
      {detailsError && (
        <Typography
          color="error"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '25px'
          }}
        >
          {detailsError}
        </Typography>
      )}
      {!detailsLoading && !detailsError && statusDetails && statusDetails.length > 0 && (
        <Grid
          container
          xs={12}
          sx={{
            width: 'auto',
            maxWidth: '100%'
          }}
        >
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
            <Typography variant="h3"> Products Draft </Typography>
          </Grid>
          <div
            style={{
              marginTop: '3px',
              display: 'flex',
              flexWrap: 'wrap', // Allow items to wrap to the next line if needed
              gap: '25px', // Space between the items
              justifyContent: 'center'
            }}
          >
            {statusDetails.map((statusDetail, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <div
                  style={{
                    display: 'flex', // Use flexbox to create a horizontal layout
                    flexDirection: 'row', // Align items horizontally
                    alignItems: 'center', // Vertically center-align the content
                    border: '1px solid #ddd',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    backgroundColor: '#f9f9f9'
                  }}
                >
                  <div
                    style={{
                      textAlign: 'center',
                      flex: '1', // Take up equal space on the left
                      display: 'flex', // Nested flexbox for vertical alignment
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img
                      src={statusDetail.image}
                      alt={statusDetail.modelName}
                      style={{
                        width: '120px',
                        height: 'auto',
                        marginBottom: '10px'
                      }}
                    />
                    <Typography variant="h5" gutterBottom sx={{ marginBottom: '3px' }}>
                      {statusDetail.brand}
                    </Typography>
                    <Typography variant="h6" gutterBottom sx={{ marginBottom: '8px' }}>
                      {statusDetail.modelName}
                    </Typography>
                  </div>
                  <div
                    style={{
                      textAlign: 'left',
                      flex: '2', // Take up more space on the right
                      paddingLeft: '20px' // Add space between the two sections
                    }}
                  >
                    <Typography>
                      <strong>Color:</strong> {statusDetail.color}
                    </Typography>
                    <Typography>
                      <strong>RAM:</strong> {statusDetail.ramStorage}
                    </Typography>
                    <Typography>
                      <strong>Internal Storage:</strong> {statusDetail.internalStorage}
                    </Typography>
                    <Typography>
                      <strong>Battery:</strong> {statusDetail.battery}
                    </Typography>
                    <Typography>
                      <strong>Operating System:</strong> {statusDetail.operatingSystem}
                    </Typography>
                    <Typography>
                      <strong>Price:</strong> ₹{statusDetail.price}
                    </Typography>
                    <Typography>
                      <strong>Camera:</strong> {statusDetail.camera}
                    </Typography>
                    <Typography>
                      <strong>Status:</strong> {statusDetail.status}
                    </Typography>
                    {/* Approved Button */}
                    <Button variant="contained" color="primary" onClick={() => ApproveDraft(statusDetail.id)} style={{ marginTop: '10px' }}>
                      Approved
                    </Button>
                    {/* Approved Button */}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => RejectProductDraft(statusDetail.id)}
                      style={{ marginTop: '10px', marginLeft: '8px' }}
                    >
                      Rejected
                    </Button>
                  </div>
                </div>
                <ToastContainer position="top-center" autoClose={3000} />
              </Grid>
            ))}
          </div>
        </Grid>
      )}
    </Grid>
  );
};
export default ProductDraftByVendor;
