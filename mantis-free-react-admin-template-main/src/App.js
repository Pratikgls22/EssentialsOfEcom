// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import { Route } from 'react-router';
import AuthLogin from './pages/authentication/auth-forms/AuthLogin';
import Dashboard from './pages/dashboard';
import AuthRegister from './pages/authentication/auth-forms/AuthRegister';



// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
  <ThemeCustomization>
    <ScrollTop>
      <Routes>
        <Route path="/free" element={<AuthLogin />} />
        <Route path="/dashbord" element={<Dashboard />} />
        <Route path="/login" element={<AuthRegister />} />
      </Routes>
    </ScrollTop>
  </ThemeCustomization>
);

export default App;