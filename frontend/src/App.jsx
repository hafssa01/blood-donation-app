import React from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/DashboardPage';
import DonateBloodForm from './components/DonorForm';
import RequestBloodForm from './components/RecipientForm';
import ThankYou from './pages/Ty';
import RequestSent from './pages/Requestsent';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import Messagesent from './pages/Messagesent';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/donate" element={<DonateBloodForm />} />
          <Route path="/request" element={<RequestBloodForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/sent-request" element={<RequestSent />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/messagesent" element={<Messagesent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
