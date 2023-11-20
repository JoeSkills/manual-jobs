import { Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import ApplicationFormSubmit from './application-form-submit';
import AdminDashboard from './admin-dashboard';
import Login from './login';
import Signup from './signup';
import UserProfilePreview from './user-profile-preview';
import './App.css';
import { themeSettings } from './theme';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material';

function App() {
  const theme = createTheme(themeSettings);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/application-form-submit"
            element={<ApplicationFormSubmit />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/user-profile-preview"
            element={<UserProfilePreview />}
          />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
