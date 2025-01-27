import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../firebase-config';
import { signInWithPopup } from 'firebase/auth';
import './Login.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../API/Constants';
import { ClipLoader } from 'react-spinners';

function Login({
  setIsCenter,
  setSuccess,
  setCurrentStep,
  setAction,
  setEmail,
  setIsGoogle,
  disabled,
}) {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
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
        navigate('/');
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

        setAction('welcome');
        setCurrentStep(4);
        setIsGoogle(true);
        addUserDataToDB(
          user.uid,
          user.displayName,
          user.email,
          user.metadata.createdAt
        );
      }
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

  const signInWithGoogle = async () => {
    setLoading(true); // Start loading spinner
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Result User: ', result);
      const userEmail = result.user.email;
      setEmail(userEmail);
      await setUserInfoInLocal(result.user);
    } catch (error) {
      console.error('Auth Error: ', error);
      setErrorMessage('Failed to sign in with Google. Please try again.');
      setTimeout(() => setErrorMessage(''), 3000);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
<button
  className={`relative flex items-center justify-center w-full py-2 px-3 font-medium rounded-full ${
    disabled
      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
      : 'bg-white text-gray-700'
  }`}
  onClick={signInWithGoogle}
  disabled={disabled} 
>
  {/* Google logo */}
  <img
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="Google Logo"
    className="w-5 h-5 mr-2"
  />

  {/* Text with optional blur effect and opacity change */}
  <span
    className={`transition-all ${loading ? 'opacity-70' : ''}`}
  >
    Continue With Google
  </span>

  {/* Spinner displayed while loading */}
  {loading && (
    <div className="absolute right-[10%] flex items-center justify-center z-10">
      <ClipLoader color="#333333" size={24} />
    </div>
  )}
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
