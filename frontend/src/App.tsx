import { Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import ApplicationFormSubmit from './application-form-submit';
import Login from './login';
import Signup from './signup';
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route
          path="/application-form-submit"
          element={<ApplicationFormSubmit />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
