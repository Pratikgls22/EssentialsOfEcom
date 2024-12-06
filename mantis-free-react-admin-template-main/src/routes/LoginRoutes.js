import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
const AuthLogin = Loadable(lazy(() => import('pages/authentication/Login')));
const AuthRegister = Loadable(lazy(() => import('pages/authentication/Register')));
const UserTableList = Loadable(lazy(() => import('pages/users/UserTable')));
const Products = Loadable(lazy(() => import('pages/users/ProductData')));

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
      path: '/register',
      element: <AuthRegister />
    },
    {
      path: '/userTable',
      element: <UserTableList />
    },
    {
      path: '/product',
      element: <Products />
    }
  ]
};

export default LoginRoutes;
