import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const VendorRegister = Loadable(lazy(() => import('pages/users/VendorRegister')));
// const UserTableList = Loadable(lazy(() => import('pages/users/UserTable')));
const Products = Loadable(lazy(() => import('pages/users/ProductData')));
const UserLogout = Loadable(lazy(() => import('pages/authentication/Logout')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    },
    {
      path: '/logout',
      element: <UserLogout />
    },
    {
      path: '/register',
      element: <AuthRegister />
    },
    // {
    //   path: '/userTable',
    //   element: <UserTableList />
    // },
    {
      path: '/product',
      element: <Products />
    },
    {
      path: '/vendorRegister',
      element: <VendorRegister />
    },
  ]
};

export default LoginRoutes;
