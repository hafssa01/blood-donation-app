import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const GoogleOAuthRegister = () => {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    console.log('Registration Success: ', credentialResponse);

    // Send the token to the backend for verification and registration
    fetch('http://localhost:5000/google-register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Backend Response:', data);
        // Navigate to the dashboard upon successful registration
        if (data.success) {
          navigate("/dashboard");
        } else {
          console.log('Registration failed: ', data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const onError = () => {
    console.log('Registration Failed');
  };

  return (
    <GoogleOAuthProvider clientId="631991351745-ajb9fr252d7qt7e5p4hn0ht3fdirrqt6.apps.googleusercontent.com">
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.9rem', color: '#666' }}>Or register with Google</p>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          style={{ borderRadius: '60px' }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthRegister;