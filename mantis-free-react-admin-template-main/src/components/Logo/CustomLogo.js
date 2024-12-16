import logo from 'assets/images/logo/Ecom.png';
import { useTheme } from '@mui/material/styles';

const CustomLogo = () => {
  const theme = useTheme();

  return (
    <div style={{ textAlign: 'center', maxHeight: '35px' }}>
      <img
        src={logo}
        alt="Ecommerce Essentials"
        width="120"
        style={{
          filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none'
        }}
      />
      <p
        style={{
          color: theme.palette.text.primary,
          fontSize: theme.typography.fontSize,
          marginTop: '2px',
        }}
      >
        Ecommerce Essentials
      </p>
    </div>
  );
};

export default CustomLogo;
