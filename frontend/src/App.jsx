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
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Messagesent from './pages/Messagesent';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="App App d-flex flex-column min-vh-100">
          {/* Routes for Different Pages */}
          <Routes>
            {/* Unprotected routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/messagesent" element={<Messagesent />} />


            {/* Protected routes */}
            <Route path="/donate" element={<ProtectedRoute element={<DonateBloodForm />} />} />
            <Route path="/request" element={<ProtectedRoute element={<RequestBloodForm />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
            <Route path="/thank-you" element={<ProtectedRoute element={<ThankYou />} />} />
            <Route path="/sent-request" element={<ProtectedRoute element={<RequestSent />} />} />
            <Route path="/donors" element={<ProtectedRoute element={<DonorsPage />} />} />
            <Route path="/requesters" element={<ProtectedRoute element={<RequestersPage />} />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
