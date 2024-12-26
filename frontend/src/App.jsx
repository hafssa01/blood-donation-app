import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginPage';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/DashboardPage';
import DonateBloodForm from './components/DonorForm';
import RequestBloodForm from './components/RecipientForm';
import ThankYou from './pages/Ty';
import RequestSent from './pages/Requestsent';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/donate" element={<DonateBloodForm />} />
      <Route path="/request" element={<RequestBloodForm />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/thankyou" element={<ThankYou />} />
      <Route path="/sent-request" element={<RequestSent/>} />




    </Routes>
  );
};

export default App;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
