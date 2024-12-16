import React, { useEffect, useState } from 'react';
import { Link as RouterLink, Link } from 'react-router-dom';

// material-ui
import { Button, FormHelperText, Grid, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';

import AuthWrapper from 'pages/authentication/AuthWrapper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import AnimateButton from '../../components/@extended/AnimateButton';
import { jwtDecode } from 'jwt-decode';

// ================================|| VENDOR REGISTER ||================================ //

const VendorRegister = () => {
  const [currentUserId, setCurrentUserId] = useState(''); // State to hold the current user ID

  useEffect(() => {
    // Retrieve the token from cookies
    const token = Cookies.get('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.userId);
    }
  }, []);

  return (
    <AuthWrapper>
      <Grid
        sx={{
          height: '60vh', // Decrease the height, change as per your needs
          overflowY: 'auto', // Add vertical scroll when content exceeds height
          margin: '0 auto', // Center the form horizontally
          padding: '20px', // Optional: Add padding to the container
          scrollBehavior: 'smooth', // Smooth scrolling behavior
          '&::-webkit-scrollbar': {
            display: 'none' // Hide the scrollbar
          }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
              <Typography variant="h3"> Details </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
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
                userId: currentUserId || ''
              }}
              validationSchema={Yup.object().shape({
                phoneNumber: Yup.string(),
                alternatePhoneNumber: Yup.string(),
                address: Yup.string(),
                city: Yup.string(),
                state: Yup.string(),
                pinCode: Yup.string(),
                country: Yup.string(),
                accountNumber: Yup.string(),
                accountHolderName: Yup.string(),
                ifscCode: Yup.string(),
                panNumber: Yup.string(),
                gstNumber: Yup.string(),
                userId: Yup.string()
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                console.log('values', values);
                try {
                  // Retrieve the token form Cookies
                  const token = Cookies.get('authToken');
                  console.log(token);

                  if (!token) {
                    throw new Error('Authentication token is missing. Please log in again.');
                  }

                  // Make the API request and set the token in headers
                  const response = await fetch('http://localhost:8080/api/v1/user/createVendor', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(values)
                  });
                  console.log('Response', response);
                  // Check if the response is successful
                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Something went wrong User');
                  }

                  const responseData = await response.json();
                  console.log('User created Successfully:', responseData);

                  setStatus({ success: true });
                  setSubmitting(false);
                } catch (error) {
                  console.error('Error Creating User:', error.response?.data || error.message);
                  setStatus({ success: false });
                  setErrors({ submit: error.response?.data?.message || 'Something went wrong User' });
                  setSubmitting(false);
                }
              }}
            >
              {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="phone-number-singup">Phone Number</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                          id="phone-number-signup"
                          type="text"
                          value={values.phoneNumber}
                          name="phoneNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Phone Number"
                          inputProps={{}}
                        />
                        {touched.phoneNumber && errors.phoneNumber && (
                          <FormHelperText error id="helper-text-phone-number-signup">
                            {errors.phoneNumber}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="alternate-phone-number-signup">Alternate Phone Number</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.alternatePhoneNumber && errors.alternatePhoneNumber)}
                          id="alternate-phone-number-signup"
                          type="text"
                          value={values.alternatePhoneNumber}
                          name="alternatePhoneNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Alternate Phone Number"
                          inputProps={{}}
                        />
                        {touched.alternatePhoneNumber && errors.alternatePhoneNumber && (
                          <FormHelperText error id="helper-text-alternate-phone-number-signup">
                            {errors.alternatePhoneNumber}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="address-signup">Address</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.address && errors.address)}
                          id="address-signup"
                          type="text"
                          value={values.address}
                          name="address"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Address"
                          inputProps={{}}
                        />
                        {touched.address && errors.address && (
                          <FormHelperText error id="helper-text-address-signup">
                            {errors.address}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="city-signup">City</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.city && errors.city)}
                          id="city-signup"
                          type="text"
                          value={values.city}
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter City"
                          inputProps={{}}
                        />
                        {touched.city && errors.city && (
                          <FormHelperText error id="helper-text-city-signup">
                            {errors.city}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="state-signup">State</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.state && errors.state)}
                          id="state-signup"
                          type="text"
                          value={values.state}
                          name="state"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter State"
                          inputProps={{}}
                        />
                        {touched.state && errors.state && (
                          <FormHelperText error id="helper-text-state-signup">
                            {errors.state}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="PIN-code-signup">PIN Code</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.pinCode && errors.pinCode)}
                          id="PIN-code-signup"
                          type="text"
                          value={values.pinCode}
                          name="pinCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter PIN Code"
                          inputProps={{}}
                        />
                        {touched.pinCode && errors.pinCode && (
                          <FormHelperText error id="helper-text-PIN-code-signup">
                            {errors.pinCode}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="accountNumber">Account Number</InputLabel>
                        <OutlinedInput
                          id="accountNumber"
                          value={values.accountNumber}
                          name="accountNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Account Number"
                          fullWidth
                          error={Boolean(touched.accountNumber && errors.accountNumber)}
                        />
                        {touched.accountNumber && errors.accountNumber && <FormHelperText error>{errors.accountNumber}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="accountHolderName">Account Holder Name</InputLabel>
                        <OutlinedInput
                          id="accountHolderName"
                          value={values.accountHolderName}
                          name="accountHolderName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Account Holder Name"
                          fullWidth
                          error={Boolean(touched.accountHolderName && errors.accountHolderName)}
                        />
                        {touched.accountHolderName && errors.accountHolderName && (
                          <FormHelperText error>{errors.accountHolderName}</FormHelperText>
                        )}
                      </Stack>
                    </Grid>

                    {/* Row 6: IFSC Code and PAN Number */}
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="IFSCCode">IFSC Code</InputLabel>
                        <OutlinedInput
                          id="IFSCCode"
                          value={values.ifscCode}
                          name="ifscCode"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter IFSC Code"
                          fullWidth
                          error={Boolean(touched.ifscCode && errors.ifscCode)}
                        />
                        {touched.ifscCode && errors.ifscCode && <FormHelperText error>{errors.ifscCode}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="PANNumber">PAN Number</InputLabel>
                        <OutlinedInput
                          id="PANNumber"
                          value={values.panNumber}
                          name="panNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter PAN Number"
                          fullWidth
                          error={Boolean(touched.panNumber && errors.panNumber)}
                        />
                        {touched.panNumber && errors.panNumber && <FormHelperText error>{errors.panNumber}</FormHelperText>}
                      </Stack>
                    </Grid>

                    {/* Row 7: GST Number and Role Name */}
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="GSTNumber">GST Number</InputLabel>
                        <OutlinedInput
                          id="GSTNumber"
                          value={values.gstNumber}
                          name="gstNumber"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter GST Number"
                          fullWidth
                          error={Boolean(touched.gstNumber && errors.gstNumber)}
                        />
                        {touched.gstNumber && errors.gstNumber && <FormHelperText error>{errors.gstNumber}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="userId">User Id</InputLabel>
                        <OutlinedInput
                          id="userId"
                          value={currentUserId}
                          name="userId"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder=""
                          fullWidth
                          error={Boolean(touched.userId && errors.userId)}
                        />
                        {touched.userId && errors.userId && <FormHelperText error>{errors.userId}</FormHelperText>}
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2">
                        By Signing up, you agree to our &nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="#">
                          Terms of Service
                        </Link>
                        &nbsp; and &nbsp;
                        <Link variant="subtitle2" component={RouterLink} to="#">
                          Privacy Policy
                        </Link>
                      </Typography>
                    </Grid>
                    {/*{errors.submit && (*/}
                    {/*  <Grid item xs={12}>*/}
                    {/*    <FormHelperText error>{errors.submit}</FormHelperText>*/}
                    {/*  </Grid>*/}
                    {/*)}*/}
                    <Grid item xs={12}>
                      <AnimateButton>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Create Account
                        </Button>
                      </AnimateButton>
                    </Grid>
                    <Grid item xs={12}>
                      {/*<Divider>*/}
                      {/*  <Typography variant="caption">Sign up with</Typography>*/}
                      {/*</Divider>*/}
                    </Grid>
                    {/*<Grid item xs={12}>*/}
                    {/*  <FirebaseSocial />*/}
                    {/*</Grid>*/}
                  </Grid>
                </form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};
export default VendorRegister;
