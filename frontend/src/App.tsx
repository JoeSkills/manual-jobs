import { Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import ApplicationFormSubmit from './application-form-submit';
import Login from './login';
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
      </Routes>
    </>
  );
}

export default App;
