/* eslint-disable jsx-a11y/anchor-is-valid */
import { act, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../API/Constants';
import LoginWithGoogle from '../../Components/Login/Login';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';

function LoginWithEmail() {
  const [action, setAction] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showReferalCode, setShowReferalCode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const handleNext = () => {
    if (email.trim() === '') {
      console.log('Email is required...');
      setError('Email is required!');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (!password.trim()) {
      setError('Password is required!');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long!');
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const closePopup = () => {
    setError(null);
    setSuccess(null);
    setIsCenter(false);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOpenLink = (page) => {
    if (page === 'privacy_policy') {
      window.open(
        'https://docs.google.com/document/d/e/2PACX-1vTTPgG4jKLBCdAL-G9ucIJfZTHJ9k0UFiCdqtW_jKGM5S0A8wG0-0VFhTELHLmliLVVfRcJ3K6d88b3/pub',
        '_blank'
      );
    } else if (page === 'terms_and_conditions') {
      window.open(
        'https://docs.google.com/document/d/e/2PACX-1vSTD88F9JDUGR7zUUY2ITW1HA5LyoApajHjRyDnEV_neN0UyRV3m2VU38pkLjsi8ZhFQvuK3AKQQulO/pub',
        '_blank'
      );
    }
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const handleBack = () => {
    setError('');
    setSuccess('');
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSendOtp = async (actionType) => {
    try {
      setError('');
      setSuccess('');

      if (email.trim() === '') {
        console.log('Email is required...');
        setError('Email is required!');
        return;
      }
      if (actionType === 'signup') {
        if (!password.trim()) {
          setError('Password is required!');
          return;
        }
        if (password.length < 4) {
          setError('Password must be at least 4 characters long!');
          return;
        }
        if (name.trim() === '') {
          console.log('Name is required...');
          setError('Name is required!');
          return;
        }
        if (!validateName(name)) {
          setError('Special Characters and Number not allowed');
          return;
        }
      }
      if (actionType === 'reset') {
        setPassword('');
      }
      if (!validateEmail(email)) {
        console.log(`Invalid email format: ${email}`);
        setError('Email in not Valid format!');
        return;
      }
      await axios.post(`${BASE_URL}/api/auth/v4/otp`, {
        email,
        type: actionType,
      });

      setIsOtpSent(true);
      setSuccess(`OTP sent successfully to ${email},please verify`);
      if (actionType === 'reset') {
        setCurrentStep(2);
      }
      if (actionType === 'signup') {
        setCurrentStep(2);
      }
    } catch (err) {
      console.log('Error sending OTP:', err.message || err);

      // Check if the error is for "Email already exists!"
      if (
        err.response &&
        err.response.data.data.info === 'Email already exists!'
      ) {
        setError(
          'This email is already registered. Please log in or continue using this email.'
        );
        setTimeout(() => {
          setError('');
          // Redirect to the login page after showing the error
          setAction('login');
          setPassword('');
        }, 3000);
      } else {
        // Handle other errors
        setError(
          err.response?.data?.data?.info || 'An unexpected error occurred'
        );
      }
    } finally {
      console.log('handleSendOtp completed');
    }
  };

  const setUserInfoInLocal = (user) => {
    localStorage.setItem('isAuth', true);
    localStorage.setItem('user_id', user.uid);
    localStorage.setItem('user_name', user.fullname);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_createdAt', user.createdAt);
    localStorage.setItem('user_lastActiveAt', user.createdAt);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (email.trim() === '') {
      console.log('Email is required...');
      setError('Email is required!');
      return;
    }
    if (!password.trim()) {
      setError('Password is required!');
      return;
    }
    if (!otp.trim()) {
      setError('OTP is required!');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters long!');
      return;
    }
    if (name.trim() === '') {
      console.log('Name is required...');
      setError('Name is required!');
      return;
    }
    if (!validateName(name)) {
      setError('Special Characters and Number not allowed in Full Name');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/v4/signup`, {
        name,
        email,
        password,
        otp,
        referralCode,
      });
      console.log('Signup success:', response.data);

      if (response.data.status === 200) {
        setUserInfoInLocal(response.data.data.user);
        setSuccess(
          `Successfully Signed up, Welcome ${response.data.data.user.fullname}`
        );
        setIsCenter(true);
      } else {
        setError('Something went wrong! Try again');
      }
    } catch (err) {
      console.log('Error : ', err);
      setError(
        err.response.data.data.info || 'An error occurred. Please try again.'
      );
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (email.trim() === '') {
      console.log('Email is required...');
      setError('Email is required!');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/v4/signin`, {
        email,
        password,
      });
      setUserInfoInLocal(response.data.data.user);
      setSuccess(
        `Successfully logged in Welcome ${response.data.data.user.fullname}`
      );
      setIsCenter(true);
    } catch (err) {
      setError(err.response.data.data.info);
      console.log('Error : ', err);
    }
  };

  const handleActionClick = (newAction) => {
    setAction(newAction);
    setIsOtpSent(false);
    setEmail('');
    setPin();
    setPassword('');
    setConfirmPassword('');
    setReferralCode('');
    setOtp('');
    setName('');
    setError('');
    setSuccess('');
    setCurrentStep(1);
  };

  const handleForgetPasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    // Validate required fields with specific messages
    if (!email) {
      setError('Email is required!');
      return;
    } else if (!otp) {
      setError('OTP is required!');
      return;
    } else if (!password) {
      setError('Password is required!');
      return;
    } else if (password.length < 4) {
      setError('Password must be at least 4 characters long!');
      return;
    }
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/v4/reset`, {
        email,
        otp,
        password,
      });

      if (response.data.status === 200) {
        setSuccess('Password reset successfully! You can now log in.');
        isCenter(true);
        setTimeout(() => {
          setSuccess('');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setOtp('');
          setAction('login');
          isCenter(false);
        }, 4000);
      } else {
        setError(
          response.data.message || 'Failed to reset password. Please try again.'
        );
      }
    } catch (err) {
      console.error('Error:', err.response?.data?.data?.info || err.message);
      setError(
        err.response?.data?.data?.info || 'An unexpected error occurred.'
      );
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setTimeout(() => {
      setShowPassword(false);
    }, 4000);
  };

  return (
    <div className="bg-white h-screen">
      {/* Render Popup for Error */}
      <Popup
        message={error}
        type="error"
        onClose={closePopup}
        duration={5000}
      />

      {/* Render Popup for Success */}
      <Popup
        message={success}
        type="success"
        onClose={closePopup}
        duration={5000}
        iscenter={isCenter}
      />
      <div
        className={`h-full ${
          action === 'login' ? ' bg-gray-100 ' : 'bg-white '
        } shadow-md px-4 sm:mx-auto sm:w-full flex flex-col justify-center sm:max-w-sm`}
      >
        <div
          className={`sm:mx-auto  absolute top-6 right-0 left-0 sm:w-full sm:max-w-sm`}
        >
          <img
            className="mx-auto h-16 w-auto bg-gray-80 p-4 rounded"
            src="/Super5logo.png"
            alt="Super5"
          />
        </div>

        {action === 'login' && (
          <div>
            <h2 className="font-bold text-center text-2xl">Login</h2>
            <form onSubmit={handleLoginSubmit} className="">
              <div className="relative mt-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="📧  Email"
                  className="px-3 py-3 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="relative mt-4">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="🔑  Password"
                  className="w-full px-3 py-3 border rounded-lg placeholder:text-sm focus:outline-none focus:ring-brandGreen/40 focus:ring pr-10"
                />

                {showPassword ? (
                  <FaEyeSlash
                    className="absolute right-3 top-5 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="absolute right-3 top-5 text-gray-500 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
              <div className="w-full flex justify-end">
                <button
                  onClick={() => handleActionClick('reset')}
                  className="ml-2 text-sm font-semibold text-primaryColor hover:text-primaryColor hover:underline"
                >
                  Forget Password?
                </button>
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primaryColor px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
                  style={{
                    boxShadow:
                      'inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 calc(5px * -1) 0 0 rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-300" />
              <p className="px-4 text-center text-lg text-gray-600">Or</p>
              <hr className="flex-grow border-gray-300" />
            </div>

            <div className="w-full">
              <LoginWithGoogle
                option={'Login '}
                setIsCenter={setIsCenter}
                setSuccess={setSuccess}
              />
            </div>

            <div className="flex justify-center items-center mx-8 mt-4 text-xs">
              <label className={isChecked ? '' : ''}>
                I certify that, i am above 18 years old and agreed to all{' '}
                <span
                  className="underline cursor-pointer"
                  onClick={() => handleOpenLink('terms_and_conditions')}
                >
                  Terms and Conditions
                </span>{' '}
                &{' '}
                <span
                  className="underline cursor-pointer"
                  onClick={() => handleOpenLink('privacy_policy')}
                >
                  Privacy Policy
                </span>
              </label>
            </div>
            <div className="w-full md:-mx-4 absolute bottom-0 right-0 md:right-0 md:left-0  text-lg bg-white py-4">
              <p className="text-center text-primaryColor">
                New?
                <button
                  onClick={() => handleActionClick('start')}
                  className="ml-2"
                >
                  Sign-up and start playing
                </button>
              </p>
            </div>
          </div>
        )}

        {action === 'reset' && (
          <div className="w-full">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <button
                onClick={
                  currentStep === 1
                    ? () => handleActionClick('login')
                    : handleBack
                }
                className="absolute top-8 left-4 md:left-[20%] text-3xl font-bold"
              >
                <FiArrowLeft />
              </button>
              <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset Your Password
              </h2>
              {!isOtpSent && (
                <p className="text-center text-primaryColor">
                  Please Enter your Registered Email
                </p>
              )}
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6">
                {currentStep === 1 && (
                  <>
                    <div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="📧 Email"
                        className="mt-2 px-3 py-3 block w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>

                    {!isOtpSent && (
                      <div className="mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            handleSendOtp('reset');
                          }}
                          className="flex w-full justify-center rounded-md bg-primaryColor px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
                          style={{
                            boxShadow:
                              'inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 calc(5px * -1) 0 0 rgba(0, 0, 0, 0.1)',
                          }}
                        >
                          Send OTP
                        </button>
                      </div>
                    )}
                  </>
                )}
                {currentStep === 2 && isOtpSent && (
                  <>
                    <div>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        required
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="🔑 OTP"
                        className="mt-2 px-3 lock w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div>
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="🔒 New Password"
                        className="mt-2 px-3 block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <div className="mt-8">
                      <button
                        type="submit"
                        onClick={handleForgetPasswordSubmit}
                        className="flex w-full justify-center rounded-md bg-primaryColor px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Reset
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        )}

        {action === 'start' && (
          <div>
            <h2 className="text-2xl mt-4 px-4 font-bold text-center">
              Create your Super5 account
            </h2>

            <div className="sign-up">
              <div className="mt-16">
                <button
                  onClick={() => handleActionClick('signup')}
                  className="flex w-full justify-center rounded-lg bg-primaryColor px-4 py-3 text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    boxShadow:
                      'inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 calc(5px * -1) 0 0 rgba(0, 0, 0, 0.1)',
                  }}
                >
                  Sign up with Email
                </button>
              </div>
              <div className="flex items-center my-4">
                <hr className="flex-grow border-gray-300" />
                <p className="px-4 text-center text-lg text-gray-600">Or</p>
                <hr className="flex-grow border-gray-300" />
              </div>
              <div className="w-full">
                <LoginWithGoogle
                  option={'Sign up'}
                  setIsCenter={setIsCenter}
                  setSuccess={setSuccess}
                />
              </div>
              <div className="flex justify-center items-center mx-8 mt-4 text-xs">
                <label className={isChecked ? '' : ''}>
                  I certify that, i am above 18 years old and agreed to all{' '}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => handleOpenLink('terms_and_conditions')}
                  >
                    Terms and Conditions
                  </span>{' '}
                  &{' '}
                  <span
                    className="underline cursor-pointer"
                    onClick={() => handleOpenLink('privacy_policy')}
                  >
                    Privacy Policy
                  </span>
                </label>
              </div>

              <p className="mt-16 text-center text-sm text-gray-500">
                Already have an account?
                <button
                  onClick={() => handleActionClick('login')}
                  className="ml-2 font-semibold leading-6 text-primaryColor hover:text-indigo-500"
                >
                  Login
                </button>
              </p>
            </div>
          </div>
        )}
        {action === 'signup' && (
          <div className="">
            <div>
              <button
                onClick={
                  currentStep === 1
                    ? () => handleActionClick('start')
                    : handleBack
                }
                className="absolute top-10 left-4 md:left-[20%] text-3xl font-bold"
              >
                <FiArrowLeft />
              </button>
            </div>

            <form className=" mt-4" onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="block w-full px-3 py-3 border rounded-md"
                    required
                  />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="block w-full mt-4 px-3 py-3 border rounded-md"
                  />
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Set Password"
                      required
                      className="block w-full px-3 py-3 mt-4 border rounded-md"
                    />
                    {showPassword ? (
                      <FaEyeSlash
                        className="absolute right-3 top-5 text-gray-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    ) : (
                      <FaEye
                        className="absolute right-3 top-5 text-gray-500 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                    )}
                  </div>

                  {/* Referral Code Button */}
                  {!showReferalCode && (
                    <div className="w-full text-end">
                      <button
                        type="button"
                        onClick={() => setShowReferalCode(true)}
                        className="underline text-primaryColor  text-sm mt-2"
                      >
                        Referral Code
                      </button>
                    </div>
                  )}

                  {/* Referral Code Input */}
                  {showReferalCode && (
                    <div className="relative mt-4">
                      <input
                        type="text"
                        id="referralCode"
                        value={referralCode}
                        onChange={(e) => setReferralCode(e.target.value)}
                        placeholder="Referral Code (Optional)"
                        className="block w-full px-3 py-3 border rounded-md"
                      />
                      {/* Cancel Icon */}
                      <span
                        className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
                        onClick={() => setShowReferalCode(false)}
                      >
                        ✖
                      </span>
                    </div>
                  )}
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() => handleSendOtp('signup')}
                      className="flex w-full justify-center rounded-lg bg-primaryColor px-4 py-3 text-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      Send OTP
                    </button>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <h2 className="text-center font-bold">
                    Enter your OTP sent to your Email and verify
                  </h2>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                    required
                    className="block my-4 w-full px-3 py-3 border rounded-md"
                  />
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primaryColor px-3 py-3 text-lg font-semibold leading-6 text-white shadow-sm"
                    style={{
                      boxShadow:
                        'inset 0 -4px 4px rgba(0, 0, 0, 0.1), inset 0 calc(5px * -1) 0 0 rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

const Popup = ({
  message,
  type,
  onClose,
  duration = 3000,
  iscenter = false,
}) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer); // Cleanup the timer on unmount or message change
    }
  }, [message, duration, onClose]);

  if (!message) return null;
  const positionClass = iscenter
    ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
    : 'top-10 left-1/2 transform -translate-x-1/2';

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className={`absolute ${positionClass} w-full max-w-md mx-auto rounded-lg px-4 py-6 text-center ${
          type === 'success'
            ? 'bg-green-100 text-green-800 border border-green-500'
            : 'bg-red-100 text-red-800 border border-red-500'
        }`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
      >
        <p>{message}</p>
        <button
          className="mt-4 px-4 py-2 rounded bg-white text-black"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginWithEmail;
