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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const theme = createTheme(themeSettings);
  const queryClient = new QueryClient();

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
