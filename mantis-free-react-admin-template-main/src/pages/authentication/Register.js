import { Link as RouterLink, Link } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  // Divider,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from '@mui/material';

// project import
// import FirebaseRegister from './auth-forms/AuthRegister';
import AuthWrapper from './AuthWrapper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import AnimateButton from '../../components/@extended/AnimateButton';
// import FirebaseSocial from './auth-forms/FirebaseSocial';
import { useEffect, useState } from 'react';
import { strengthColor, strengthIndicator } from '../../utils/password-strength';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

// ================================|| REGISTER ||================================ //

const Register = () => {
  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  console.log(error);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    // Retrieve the token form Cookies
    const token = Cookies.get('authToken');
    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      setTimeout(() => (window.location.href = '/login'), 3000);
    }

    const decodedToken = jwtDecode(token);

    if (decodedToken.userRole !== 'ROLE_ADMIN') {
      setError('ADMIN Role is Missing, Please Check your Role');
      toast.error('Only Admin can Access !!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 5000);
      return; // Stop execution here
    }
    changePassword('');
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
              <Typography variant="h3">Sign up</Typography>
              <Typography component={Link} to="/login" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                Already have an account?
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Formik
              initialValues={{
                userName: '',
                password: '',
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
                // submit: null
              }}
              validationSchema={Yup.object().shape({
                userName: Yup.string().required('User Name is required'),
                password: Yup.string().required('Password is required'),
                email: Yup.string().email('Must be a valid email').required('Email is required'),
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
                roleName: Yup.string().required('Role Name is required')
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                console.log('values', values);
                try {
                  // Make the API request and set the token in headers
                  const response = await fetch('http://localhost:8080/api/v1/user/createUser', {
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
                        <InputLabel htmlFor="firstname-signup">User Name*</InputLabel>
                        <OutlinedInput
                          id="firstname-login"
                          type="firstname"
                          value={values.userName}
                          name="userName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter User Name"
                          fullWidth
                          error={Boolean(touched.userName && errors.userName)}
                        />
                        {touched.userName && errors.userName && (
                          <FormHelperText error id="helper-text-firstname-signup">
                            {errors.userName}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="company-signup">Email Address*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          id="company-signup"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="demo@company.com"
                          inputProps={{}}
                        />
                        {touched.email && errors.email && (
                          <FormHelperText error id="helper-text-company-signup">
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-signup">Password*</InputLabel>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="password-signup"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={(e) => {
                            handleChange(e);
                            changePassword(e.target.value);
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                              >
                                {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                              </IconButton>
                            </InputAdornment>
                          }
                          placeholder="******"
                          inputProps={{}}
                        />
                        {touched.password && errors.password && (
                          <FormHelperText error id="helper-text-password-signup">
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Stack>
                      <FormControl fullWidth sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                          <Grid item>
                            <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle1" fontSize="0.75rem">
                              {level?.label}
                            </Typography>
                          </Grid>
                        </Grid>
                      </FormControl>
                    </Grid>
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
                        <InputLabel htmlFor="roleName">Role Name</InputLabel>
                        <OutlinedInput
                          id="roleName"
                          value={values.roleName}
                          name="roleName"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="Enter Role Name"
                          fullWidth
                          error={Boolean(touched.roleName && errors.roleName)}
                        />
                        {touched.roleName && errors.roleName && <FormHelperText error>{errors.roleName}</FormHelperText>}
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
export default Register;
