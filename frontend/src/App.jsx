import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginPage';
import Register from './components/Register';
import Dashboard from './pages/DashboardPage';
import Filter from './components/Filter';
import GoogleOAuthLogin from './components/GoogleOAuthLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        

        {/* Routes for Different Pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/google-login" element={<GoogleOAuthLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/filter" element={<Filter />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
