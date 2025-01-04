import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginPage';
import Register from './components/Register';
import DonateBloodForm from './components/DonorForm';
import DonorsPage from './pages/DonorsPage';
import RequestBloodForm from './components/RecipientForm';
import RequestSent from './pages/RequestSent';
import RequestersPage from './pages/RequestersPage';
import ThankYou from './pages/ThanksPage';
import Dashboard from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        

        {/* Routes for Different Pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donate" element={<DonateBloodForm />} />
          <Route path="/request" element={<RequestBloodForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/sent-request" element={<RequestSent/>} />
          <Route path="/donors" element={<DonorsPage />} />
          <Route path="/requesters" element={<RequestersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
