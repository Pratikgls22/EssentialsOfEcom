// import React from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// // import api from './pages/baseurl/api.js';
// import Cookies from 'js-cookie';
//
// // material-ui
// import {
//   Button,
//   Checkbox,
//   Divider,
//   FormControlLabel,
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
// // import AuthWrapper from './AuthWrapper';
//
// // assets
// import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import AuthWrapper from '../AuthWrapper';
// import Dashboard from '../../dashboard';
//
// // ============================|| FIREBASE - LOGIN ||============================ //
//
// const AuthLogin = () => {
//   const [checked, setChecked] = React.useState(false);
//   const [showPassword, setShowPassword] = React.useState(false);
//   const navigate = useNavigate();
//   const handleClickShowPassword = () => {
//     setShowPassword(!showPassword);
//   };
//
//   const handleMouseDownPassword = (event) => {
//     event.preventDefault();
//   };
//
//   return (
//     <AuthWrapper>
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
//             <Typography variant="h3">Login</Typography>
//             <Typography component={Link} to="/register" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
//               Don&apos;t have an account?
//             </Typography>
//           </Stack>
//         </Grid>
//         <Grid item xs={12}>
//           <Formik
//             initialValues={{
//               email: '',
//               password: '',
//               submit: null
//             }}
//             validationSchema={Yup.object().shape({
//               email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
//               password: Yup.string().max(255).required('Password is required')
//             })}
//             onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
//               try {
//                 // Make the API request
//                 const response = await fetch('http://localhost:8080/api/v1/auth/login', {
//                   method: 'POST',
//                   headers: {
//                     'Content-Type': 'application/json'
//                   },
//                   body: JSON.stringify({
//                     email: values.email,
//                     password: values.password
//                   })
//                 });
//
//                 console.log('response>>>>', response);
//                 const data = await response.json();
//
//                 if (!response.ok) {
//                   throw new Error(data.message || 'Something went wrong');
//                 }
//
//                 // Handle success (e.g., save token)
//                 console.log('Login successful:', data);
//                 setStatus({ success: true });
//                 setSubmitting(false);
//
//                 const { token } = data;
//                 Cookies.set('authToken', token, { expires: 7 });
//
//                 // Example: Save token to local storage
//                 localStorage.setItem('token', data.token);
//
//                 // Navigate to dashboard
//                 navigate(<Dashboard />);
//               } catch (err) {
//                 // Handle errors
//                 console.error(err);
//                 setStatus({ success: false });
//                 setErrors({ submit: err.message });
//                 setSubmitting(false);
//               }
//             }}
//           >
//             {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
//               <form noValidate onSubmit={handleSubmit}>
//                 <Grid container spacing={3}>
//                   <Grid item xs={12}>
//                     <Stack spacing={1}>
//                       <InputLabel htmlFor="email-login">Email Address</InputLabel>
//                       <OutlinedInput
//                         id="email-login"
//                         type="email"
//                         value={values.email}
//                         name="email"
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         placeholder="Enter email address"
//                         fullWidth
//                         error={Boolean(touched.email && errors.email)}
//                       />
//                       {touched.email && errors.email && (
//                         <FormHelperText error id="standard-weight-helper-text-email-login">
//                           {errors.email}
//                         </FormHelperText>
//                       )}
//                     </Stack>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Stack spacing={1}>
//                       <InputLabel htmlFor="password-login">Password</InputLabel>
//                       <OutlinedInput
//                         fullWidth
//                         error={Boolean(touched.password && errors.password)}
//                         id="-password-login"
//                         type={showPassword ? 'text' : 'password'}
//                         value={values.password}
//                         name="password"
//                         onBlur={handleBlur}
//                         onChange={handleChange}
//                         endAdornment={
//                           <InputAdornment position="end">
//                             <IconButton
//                               aria-label="toggle password visibility"
//                               onClick={handleClickShowPassword}
//                               onMouseDown={handleMouseDownPassword}
//                               edge="end"
//                               size="large"
//                             >
//                               {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
//                             </IconButton>
//                           </InputAdornment>
//                         }
//                         placeholder="Enter password"
//                       />
//                       {touched.password && errors.password && (
//                         <FormHelperText error id="standard-weight-helper-text-password-login">
//                           {errors.password}
//                         </FormHelperText>
//                       )}
//                     </Stack>
//                   </Grid>
//
//                   <Grid item xs={12} sx={{ mt: -1 }}>
//                     <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
//                       <FormControlLabel
//                         control={
//                           <Checkbox
//                             checked={checked}
//                             onChange={(event) => setChecked(event.target.checked)}
//                             name="checked"
//                             color="primary"
//                             size="small"
//                           />
//                         }
//                         label={<Typography variant="h6">Keep me sign in</Typography>}
//                       />
//                       <Link variant="h6" component={RouterLink} to="" color="text.primary">
//                         Forgot Password?
//                       </Link>
//                     </Stack>
//                   </Grid>
//                   {errors.submit && (
//                     <Grid item xs={12}>
//                       <FormHelperText error>{errors.submit}</FormHelperText>
//                     </Grid>
//                   )}
//                   <Grid item xs={12}>
//                     <AnimateButton>
//                       <Button
//                         disableElevation
//                         disabled={isSubmitting}
//                         fullWidth
//                         size="large"
//                         type="submit"
//                         variant="contained"
//                         color="primary"
//                       >
//                         Login
//                       </Button>
//                     </AnimateButton>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Divider>
//                       <Typography variant="caption"> Login with</Typography>
//                     </Divider>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <FirebaseSocial />
//                   </Grid>
//                 </Grid>
//               </form>
//             )}
//           </Formik>
//           <AuthLogin />
//         </Grid>
//       </Grid>
//     </AuthWrapper>
//   );
// };
//
// export default AuthLogin;
