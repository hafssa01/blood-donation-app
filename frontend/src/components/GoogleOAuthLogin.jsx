import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleOAuthLogin = () => {
  const onSuccess = (credentialResponse) => {
    console.log('Login Success: ', credentialResponse);

    // Send the token to the backend for verification
    fetch('http://localhost:5000/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: credentialResponse.credential }),
    })
      .then((res) => res.json())
      .then((data) => console.log('Backend Response:', data));
  };

  const onError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId="631991351745-ajb9fr252d7qt7e5p4hn0ht3fdirrqt6.apps.googleusercontent.com">
      <div style={{ marginTop: '20px' }}>
        <h3>Or Sign in with Google</h3>
        <GoogleLogin onSuccess={onSuccess} onError={onError} />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleOAuthLogin;
