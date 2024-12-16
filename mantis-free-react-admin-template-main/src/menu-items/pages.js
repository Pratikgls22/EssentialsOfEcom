// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';

// icons
const icons = {
  LoginOutlined,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'authentication',
  title: 'Authentication',
  type: 'group',
  children: [
    {
      id: 'login1',
      title: 'AuthLogin',
      type: 'item',
      url: '/login',
      icon: icons.LoginOutlined,
      target: true
    },
    {
      id: 'register1',
      title: 'Register',
      type: 'item',
      url: '/register',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'user1',
      title: 'UserTable',
      type: 'item',
      url: '/userTable',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'vendor',
      title: 'VendorRegister',
      type: 'item',
      url: '/vendorRegister',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'productDraft',
      title: 'CreateProductDraft',
      type: 'item',
      url: '/productDraft',
      icon: icons.ProfileOutlined,
      target: true
    },
    {
      id: 'productDraft',
      title: 'FetchProductDraft',
      type: 'item',
      url: '/fetchProductDraft',
      icon: icons.ProfileOutlined,
      target: true
    }
  ]
};

export default pages;
