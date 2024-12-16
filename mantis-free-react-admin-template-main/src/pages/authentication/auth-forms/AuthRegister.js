// import { useEffect, useState } from 'react';
// import { Link as RouterLink } from 'react-router-dom';
// // import api from './pages/baseurl/api.js';
// import Cookies from 'js-cookie';
//
// // material-ui
// import {
//   Box,
//   Button,
//   Divider,
//   FormControl,
//   FormHelperText,
//   Grid,
//   Link,
//   IconButton,
//   InputAdornment,
//   InputLabel,
//   OutlinedInput,
//   Stack,
//   Typography
// } from '@mui/material';
//
// // third party
// import * as Yup from 'yup';
// import { Formik } from 'formik';
//
// // project import
// import FirebaseSocial from './FirebaseSocial';
// import AnimateButton from 'components/@extended/AnimateButton';
// import { strengthColor, strengthIndicator } from 'utilies/password-strength';
//
// // assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
//
// // ============================|| FIREBASE - REGISTER ||============================ //
//
// const AuthRegister = () => {
//   const [level, setLevel] = useState();
//   const [showPassword, setShowPassword] = useState(false);
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };
//
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//
//   const changePassword = (value) => {
//     const temp = strengthIndicator(value);
//     setLevel(strengthColor(temp));
//   };
//
//   useEffect(() => {
//     changePassword('');
//   }, []);
//
//   return (
//     <>
//       <Formik
//         initialValues={{
//           userName: '',
//           password: '',
//           email: '',
//           phoneNumber: '',
//           alternatePhoneNumber: '',
//           address: '',
//           city: '',
//           state: '',
//           PINCode: '',
//           country: '',
//           accountNumber: '',
//           accountHolderName: '',
//           IFSCCode: '',
//           PANNumber: '',
//           GSTNumber: '',
//           roleName: '',
//           submit: null
//         }}
//
//         validationSchema={Yup.object().shape({
//           userName: Yup.string().required('User Name is required'),
//           password: Yup.string().required('Password is required'),
//           email: Yup.string().email('Must be a valid email').required('Email is required'),
//           phoneNumber: Yup.string(),
//           alternatePhoneNumber: Yup.string(),
//           address: Yup.string(),
//           city: Yup.string(),
//           state: Yup.string(),
//           PINCode: Yup.string(),
//           country: Yup.string(),
//           accountNumber: Yup.string(),
//           accountHolderName: Yup.string(),
//           IFSCCode: Yup.string(),
//           PANNumber: Yup.string(),
//           GSTNumber: Yup.string(),
//           roleName: Yup.string().required('Role Name is required')
//         })}
//         onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//           try {
//             // Retrieve the token form Cookies
//             const token = Cookies.get('authToken');
//
//             if (!token){
//               throw new Error('Authentication token is missing. Please log in again.');
//             }
//
//             // Make the API request and set the token in headers
//             const response = await fetch('http://localhost:8080/api/v1/user/createUser', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`
//               },
//               body: JSON.stringify(values)
//             });
//             // Check if the response is successful
//             if (!response.ok) {
//               const errorData = await response.json();
//               throw new Error(errorData.message || 'Something went wrong User');
//             }
//
//             const responseData = await response.json();
//             console.log('User created Successfully:', responseData);
//
//             setStatus({ success: true });
//             setSubmitting(false);
//           } catch (error) {
//             console.error('Error Creating User:', error.response?.data || error.message);
//             setStatus({ success: false });
//             setErrors({ submit: error.response?.data?.message || 'Something went wrong User' });
//             setSubmitting(false);
//           }
//         }}
//       >
//         {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//           <form noValidate onSubmit={handleSubmit}>
//             <Grid container spacing={3}>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="firstname-signup">User Name*</InputLabel>
//                   <OutlinedInput
//                     id="firstname-login"
//                     type="firstname"
//                     value={values.userName}
//                     name="userName"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter User Name"
//                     fullWidth
//                     error={Boolean(touched.userName && errors.userName)}
//                   />
//                   {touched.userName && errors.userName && (
//                     <FormHelperText error id="helper-text-firstname-signup">
//                       {errors.userName}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="company-signup">Email Address*</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.email && errors.email)}
//                     id="company-signup"
//                     value={values.email}
//                     name="email"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="demo@company.com"
//                     inputProps={{}}
//                   />
//                   {touched.email && errors.email && (
//                     <FormHelperText error id="helper-text-company-signup">
//                       {errors.email}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="password-signup">Password*</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.password && errors.password)}
//                     id="password-signup"
//                     type={showPassword ? 'text' : 'password'}
//                     value={values.password}
//                     name="password"
//                     onBlur={handleBlur}
//                     onChange={(e) => {
//                       handleChange(e);
//                       changePassword(e.target.value);
//                     }}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                           size="large"
//                         >
//                           {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     placeholder="******"
//                     inputProps={{}}
//                   />
//                   {touched.password && errors.password && (
//                     <FormHelperText error id="helper-text-password-signup">
//                       {errors.password}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//                 <FormControl fullWidth sx={{ mt: 2 }}>
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item>
//                       <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
//                     </Grid>
//                     <Grid item>
//                       <Typography variant="subtitle1" fontSize="0.75rem">
//                         {level?.label}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="phone-number-singup">Phone Number</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.phoneNumber && errors.phoneNumber)}
//                     id="phone-number-signup"
//                     type="text"
//                     value={values.phoneNumber}
//                     name="phoneNumber"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter Phone Number"
//                     inputProps={{}}
//                   />
//                   {touched.phoneNumber && errors.phoneNumber && (
//                     <FormHelperText error id="helper-text-phone-number-signup">
//                       {errors.phoneNumber}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="alternate-phone-number-signup">Alternate Phone Number</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.alternatePhoneNumber && errors.alternatePhoneNumber)}
//                     id="alternate-phone-number-signup"
//                     type="text"
//                     value={values.alternatePhoneNumber}
//                     name="alternatePhoneNumber"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter Alternate Phone Number"
//                     inputProps={{}}
//                   />
//                   {touched.alternatePhoneNumber && errors.alternatePhoneNumber && (
//                     <FormHelperText error id="helper-text-alternate-phone-number-signup">
//                       {errors.alternatePhoneNumber}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="address-signup">Address</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.address && errors.address)}
//                     id="address-signup"
//                     type="text"
//                     value={values.address}
//                     name="address"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter Address"
//                     inputProps={{}}
//                   />
//                   {touched.address && errors.address && (
//                     <FormHelperText error id="helper-text-address-signup">
//                       {errors.address}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="city-signup">City</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.city && errors.city)}
//                     id="city-signup"
//                     type="text"
//                     value={values.city}
//                     name="city"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter City"
//                     inputProps={{}}
//                   />
//                   {touched.city && errors.city && (
//                     <FormHelperText error id="helper-text-city-signup">
//                       {errors.city}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="state-signup">State</InputLabel>
//                   <OutlinedInput
//                     fullWidth
//                     error={Boolean(touched.state && errors.state)}
//                     id="state-signup"
//                     type="text"
//                     value={values.state}
//                     name="state"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter State"
//                     inputProps={{}}
//                   />
//                   {touched.state && errors.state && (
//                     <FormHelperText error id="helper-text-state-signup">
//                       {errors.state}
//                     </FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="accountNumber">Account Number</InputLabel>
//                   <OutlinedInput
//                     id="accountNumber"
//                     value={values.accountNumber}
//                     name="accountNumber"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter Account Number"
//                     fullWidth
//                     error={Boolean(touched.accountNumber && errors.accountNumber)}
//                   />
//                   {touched.accountNumber && errors.accountNumber && <FormHelperText error>{errors.accountNumber}</FormHelperText>}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="accountHolderName">Account Holder Name</InputLabel>
//                   <OutlinedInput
//                     id="accountHolderName"
//                     value={values.accountHolderName}
//                     name="accountHolderName"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter Account Holder Name"
//                     fullWidth
//                     error={Boolean(touched.accountHolderName && errors.accountHolderName)}
//                   />
//                   {touched.accountHolderName && errors.accountHolderName && (
//                     <FormHelperText error>{errors.accountHolderName}</FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//
//               {/* Row 6: IFSC Code and PAN Number */}
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="IFSCCode">IFSC Code</InputLabel>
//                   <OutlinedInput
//                     id="IFSCCode"
//                     value={values.IFSCCode}
//                     name="IFSCCode"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter IFSC Code"
//                     fullWidth
//                     error={Boolean(touched.IFSCCode && errors.IFSCCode)}
//                   />
//                   {touched.IFSCCode && errors.IFSCCode && (
//                     <FormHelperText error>{errors.IFSCCode}</FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="PANNumber">PAN Number</InputLabel>
//                   <OutlinedInput
//                     id="PANNumber"
//                     value={values.PANNumber}
//                     name="PANNumber"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter PAN Number"
//                     fullWidth
//                     error={Boolean(touched.PANNumber && errors.PANNumber)}
//                   />
//                   {touched.PANNumber && errors.PANNumber && (
//                     <FormHelperText error>{errors.PANNumber}</FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//
//               {/* Row 7: GST Number and Role Name */}
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="GSTNumber">GST Number</InputLabel>
//                   <OutlinedInput
//                     id="GSTNumber"
//                     value={values.GSTNumber}
//                     name="GSTNumber"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter GST Number"
//                     fullWidth
//                     error={Boolean(touched.GSTNumber && errors.GSTNumber)}
//                   />
//                   {touched.GSTNumber && errors.GSTNumber && (
//                     <FormHelperText error>{errors.GSTNumber}</FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Stack spacing={1}>
//                   <InputLabel htmlFor="roleName">Role Name</InputLabel>
//                   <OutlinedInput
//                     id="roleName"
//                     value={values.roleName}
//                     name="roleName"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     placeholder="Enter Role Name"
//                     fullWidth
//                     error={Boolean(touched.roleName && errors.roleName)}
//                   />
//                   {touched.roleName && errors.roleName && (
//                     <FormHelperText error>{errors.roleName}</FormHelperText>
//                   )}
//                 </Stack>
//               </Grid>
//               <Grid item xs={12}>
//                 <Typography variant="body2">
//                   By Signing up, you agree to our &nbsp;
//                   <Link variant="subtitle2" component={RouterLink} to="#">
//                     Terms of Service
//                   </Link>
//                   &nbsp; and &nbsp;
//                   <Link variant="subtitle2" component={RouterLink} to="#">
//                     Privacy Policy
//                   </Link>
//                 </Typography>
//               </Grid>
//               {errors.submit && (
//                 <Grid item xs={12}>
//                   <FormHelperText error>{errors.submit}</FormHelperText>
//                 </Grid>
//               )}
//               <Grid item xs={12}>
//                 <AnimateButton>
//                   <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
//                     Create Account
//                   </Button>
//                 </AnimateButton>
//               </Grid>
//               <Grid item xs={12}>
//                 <Divider>
//                   <Typography variant="caption">Sign up with</Typography>
//                 </Divider>
//               </Grid>
//               <Grid item xs={12}>
//                 <FirebaseSocial />
//               </Grid>
//             </Grid>
//           </form>
//         )}
//       </Formik>
//     </>
//   );
// };
//
// export default AuthRegister;
