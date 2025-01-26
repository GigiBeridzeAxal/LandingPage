import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../API/Constants';

function Login({ option, setIsCenter, setSuccess }) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [referralCode, setReferralCode] = useState(
    queryParams.get('referralCode') || ''
  );

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setReferralCode(queryParams.get('referralCode') || '');
  }, [location.search]);

  const setUserInfoInLocal = async (user) => {
    try {
      // Check if the email exists in the database
      const response = await fetch(`${BASE_URL}/api/user/check-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (data.exists) {
        setSuccess(`Successfully logged in Welcome ${user.displayName}`);
        setIsCenter(true);
        // Email exists, fetch user data from the database
        localStorage.setItem('isAuth', true);
        localStorage.setItem('user_id', data.user.uid);
        localStorage.setItem('user_name', data.user.username);
        localStorage.setItem('user_email', data.user.email);
        localStorage.setItem('user_photoURL', data.user.photoURL || '');
        localStorage.setItem('user_createdAt', data.user.createdAt);
        localStorage.setItem('user_lastActiveAt', data.user.lastActiveAt);

        console.log('User data fetched from DB and stored locally:', data.user);
      } else {
        setSuccess(`Successfully Signed up, Welcome ${user.displayName}`);
        setIsCenter(true);
        // Email doesn't exist, use Firebase user data
        localStorage.setItem('isAuth', true);
        localStorage.setItem('user_id', user.uid);
        localStorage.setItem('user_name', user.displayName);
        localStorage.setItem('user_email', user.email);
        localStorage.setItem('user_photoURL', user.photoURL);
        localStorage.setItem('user_createdAt', user.metadata.createdAt);
        localStorage.setItem('user_lastActiveAt', user.metadata.lastLoginAt);

        // Save new user to the database
        addUserDataToDB(
          user.uid,
          user.displayName,
          user.email,
          user.metadata.createdAt
        );
      }
      setTimeout(() => {
        setSuccess('');
        setIsCenter(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error checking or saving user data:', error);
      setErrorMessage('Failed to process user data. Please try again.');
      // setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const addUserDataToDB = (uid, username, email, createdAt) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid,
        username,
        email,
        password: '',
        createdAt,
        referralCode,
      }),
    };

    fetch(`${BASE_URL}/api/user/signin`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log('Data : ', data);
      })
      .catch((error) => {
        console.error('Error saving user data:', error);
        setErrorMessage('Failed to save user data.');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('Result User : ', result);
        setUserInfoInLocal(result.user);
      })
      .catch((error) => {
        console.error('Auth Error : ', error);
        // setErrorMessage('Failed to sign in with Google. Please try again.');
        // setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <button
        className="flex items-center justify-center w-full py-3 font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        style={{
          boxShadow:
            'inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 calc(5px * -1) 0 0 rgba(0, 0, 0, 0.1)',
        }}
        onClick={signInWithGoogle}
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
        {option} With Google
      </button>
      {successMessage && (
        <div className="text-green-600 bg-green-100 border border-green-400 p-2 rounded-md">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="text-red-600 bg-red-100 border border-red-400 p-2 rounded-md">
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export default Login;
