import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import CustomLayout from '../layout/CustomLayout';

// render - login
const VendorRegister = Loadable(lazy(() => import('pages/users/VendorRegister')));
const UserTableList = Loadable(lazy(() => import('pages/users/UserTable')));
const Products = Loadable(lazy(() => import('pages/users/ProductData')));
const ProductDrafts = Loadable(lazy(() => import('pages/users/ProductDraftForm')));
const UserLogout = Loadable(lazy(() => import('pages/authentication/Logout')));
const FetchProductDrafts = Loadable(lazy(() => import('pages/users/FetchProductDraft')));

// ==============================|| AUTH ROUTING ||============================== //

const CustomRoutes = {
  path: '/',
  element: <CustomLayout />,
  children: [
    {
      path: '/product',
      element: <Products />
    },
    {
      path: '/productDraft',
      element: <ProductDrafts />
    },
    {
      path: '/fetchProductDraft',
      element: <FetchProductDrafts />
    },
    {
      path: '/vendorRegister',
      element: <VendorRegister />
    },
    {
      path: '/userTable',
      element: <UserTableList />
    },
    {
      path: '/logout',
      element: <UserLogout />
    }
  ]
};

export default CustomRoutes;
