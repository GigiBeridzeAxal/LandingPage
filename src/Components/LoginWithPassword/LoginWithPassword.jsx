/* eslint-disable jsx-a11y/anchor-is-valid */
import { act, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../API/Constants';
import LoginWithGoogle from '../../Components/Login/Login';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiArrowLeft } from 'react-icons/fi';
import { WavesIcon as WaveIcon } from 'lucide-react';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  isValidPhoneNumber,
  parsePhoneNumberFromString,
} from 'libphonenumber-js';
import TextSlider from '../slider/TextSlider';
function LoginWithEmail() {
  const [action, setAction] = useState('start');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setisVerified] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showReferalCode, setShowReferalCode] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [isCenter, setIsCenter] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(60);
  const [isSignup, setIsSugnup] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  const [userGoogleInfo, setUserGoogleInfo] = useState({});
  const [emailError, setEmailError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const location = useLocation();
  const [isMobileLoginEnabled, setIsMobileLoginEnabled] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState('in');
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

  useEffect(() => {
    let interval;
    if (isDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    // Extract referralCode from the URL query string
    const params = new URLSearchParams(location.search);
    const codeFromURL = params.get('referralCode');
    console.log('codeFromURL', codeFromURL);
    if (codeFromURL) {
      setReferralCode(codeFromURL);
    }
    return () => clearInterval(interval);
  }, [isDisabled, location.search]);

  const resendOtp = () => {
    if(email){
    handleSendEmailOtp('signup');}
    else
      handleSendSMSOtp('signup');
    setIsDisabled(true);
    setTimer(60); 
  };

  const handleBack = () => {
    setError('');
    setSuccess('');
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSendEmailOtp = async (actionType = 'signup', start) => {
    console.log('Email used for OTP:', email);
    setLoading(true);
    toast.dismiss(); 

    try {
      setError('');
      setSuccess('');

      if (!email || email.trim() === '') {
        console.log('Email is required...');
        setError('Email is required!');
        return;
      }

      console.log('Sending OTP...');
      const response = await axios.post(`${BASE_URL}/api/auth/v4/otp`, {
        email,
        type: actionType,
      });

      console.log('OTP Response:', response.data);

      setIsOtpSent(true);
      setSuccess(`OTP sent successfully to ${email}, please verify`);

      if (actionType === 'reset') {
        setCurrentStep(2);
      }
      if (actionType === 'signup') {
        setCurrentStep(2);
      }
      if (actionType === 'signup' && start) {
        setCurrentStep(2);
        setAction('signup');
      }
    } catch (err) {
      console.log('Error sending OTP:', err.message || err);
      setError(
        err.response?.data?.data?.info || 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };




  const setUserInfoInLocal = (user) => {
    localStorage.setItem('isAuth', true);
    localStorage.setItem('user_id', user.uid);
    localStorage.setItem('user_name', user.fullname);
    localStorage.setItem('user_name', user.fullname);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_createdAt', user.createdAt);
    localStorage.setItem('user_lastActiveAt', user.createdAt);
  };

  const handleSubmit = async (type) => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');
    toast.dismiss();
    let response;
    try {
      if(type==='phone'&&phoneNumber){
       response = await axios.post(`${BASE_URL}/api/auth/v4/signup-phone`, {
        name,
        phoneNumber,
        referralCode: '',
      });}

else{
  response = await axios.post(`${BASE_URL}/api/auth/v4/signup`, {
    name,
    email,
    referralCode: '',
  });
}


      console.log('Signup success:', response.data);

      if (response.data.status === 200) {
        setUserInfoInLocal(response.data.data.user);
        toast.success(
          `Successfully Signed up, Welcome ${response.data.data.user.fullname}`
        );
        setIsCenter(true);
        setAction('welcome');
        setCurrentStep(4);
      } else {
        toast.error('Something went wrong! Try again');
      }
    } catch (err) {
      console.log('Error : ', err);
      toast.error(
        err.response.data.data.info || 'An error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleLoginSubmit = async (type) => {
    setError('');
    setSuccess('');
    toast.dismiss();
    let response;
    try {
      if(type==='phone'&&phoneNumber){
       response = await axios.post(`${BASE_URL}/api/auth/signin/v2`, {
        phoneNumber,
      });}
      else{
        response = await axios.post(`${BASE_URL}/api/auth/v3/signin`, {
          email,
        })
      }
      console.log('Signup success:', response.data);
      if (response.data.status === 200) {
        setUserInfoInLocal(response.data.data.user);
        navigate('/');
        toast.success(
          `Successfully logged in Welcome ${response.data.data.user.fullname}`
        );
      } else {
        toast.error('Something went wrong! Try again');
      }
    } catch (err) {
      console.log('Error : ', err);
    }
  };

  const handleActionClick = (newAction) => {
    setLoading(false)
    setAction(newAction);
    setIsOtpSent(false);
    setEmail('');
    setPhoneNumber('');
    setReferralCode('');
    setOtp('');
    setName('');
    setError('');
    setSuccess('');
    setCurrentStep(1);
    toast.dismiss();
  };

  const verifyCode = async (type) => {
    setVerifying(true);
    setError('');
    setSuccess('');
    toast.dismiss();
    let response;
    try {
      if(type==='phone'&&phoneNumber){
      response = await axios.post(`${BASE_URL}/api/auth/v4/verify-phone`, {
        phoneNumber,
        otp,
      });
            // Success handling
            toast.success('OTP verified successfully!');
            setisVerified(true);
            if (response.data.data.signup) {
              setCurrentStep(3);
              setIsSugnup(true);
            } else {
              setIsSugnup(false);
              handleLoginSubmit(type);
            }
    }
    else{
      response = await axios.post(`${BASE_URL}/api/auth/v4/verify-otp`, {
        email,
        otp,
      });
            // Success handling
            toast.success('OTP verified successfully!');
            setisVerified(true);
            if (response.data.data.signup) {
              setCurrentStep(3);
              setIsSugnup(true);
            } else {
              setIsSugnup(false);
              handleLoginSubmit(type);
            }
    }
    } catch (err) {
      // Error handling
      const errorMessage =
        err.response?.status === 400
          ? err.response?.data?.data?.info
          : 'Failed to verify OTP. Please try again.'; 
    
      toast.error(errorMessage);
      console.error('Error:', err);
    }
    finally {
      setVerifying(false);
    }
  };

  const handleSendSMSOtp = async (actionType = 'signup',start) => {
    setLoading(true);
    toast.dismiss();
    if (!phoneNumber) {
      setError('Please enter a valid phone number.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/otp`, {
        phoneNumber,
        type: 'signup',
      });
      toast.success(`OTP sent successfully to ${phoneNumber}. Please verify.`);
      setIsOtpSent(true); // Mark OTP as sent
      if (actionType === 'signup') {
        setCurrentStep(2);
      }
      if (actionType === 'signup'&&start) {
        setCurrentStep(2);
        setAction('signup');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
      toast.error(
        'Failed to send OTP. Please check the phone number and try again.'
      );
    }finally {
      setLoading(false);
    }
  };
  
  const [isSignUp, setIsSignUp] = useState(true);
  const toggleForm = () => {
    setIsSignUp(!isSignUp); // Toggle between SignUp and SignIn
  };
  const validateEmailFormat = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue);
  };

  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (!validateEmailFormat(emailValue)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(''); // Clear error if valid
    }
  };

  const handleEmailBlur = () => {
    if (!email.trim()) {
      setEmailError('Email is required');
    } else if (!validateEmailFormat(email)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError(''); // Clear error if valid
    }
  };
  const validateOtp = (otpValue) => {
    return otpValue.length === 6;
  };

  const handleOtpChange = (e) => {
    const otpValue = e.target.value;
    setOtp(otpValue);

    if (!validateOtp(otpValue)) {
      setOtpError('OTP should be 6 digits');
    } else {
      setOtpError('');
    }
  };
  const handleOtpBlur = () => {
    if (!otp.trim()) {
      setOtpError('OTP is required');
    } else if (!validateOtp(otp)) {
      setOtpError('OTP should be 6 digits');
    } else {
      setOtpError(''); // Clear error if valid
    }
  };
  const handlePhoneChange = (phoneValue, countryData) => {
    setPhoneNumber(phoneValue);
    setSelectedCountry(countryData.countryCode);

    // Add '+' to the phone number if it's missing
    const formattedPhone = phoneValue.startsWith('+')
      ? phoneValue
      : `+${phoneValue}`;

    if (!phoneValue) {
      setPhoneError('Phone number is required');
      return;
    }

    const parsedNumber = parsePhoneNumberFromString(formattedPhone);

    if (!parsedNumber) {
      setPhoneError('Invalid phone number format');
      return;
    }

    if (!isValidPhoneNumber(formattedPhone)) {
      setPhoneError(`Invalid phone number`);
      return;
    }

    setPhoneError('');
  };

  const handleSendOTP = (via) => {
    if (via === 'sms') {
      handleSendSMSOtp('signup',true);
    } else handleSendEmailOtp('signup', true);
  };

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect screen size on mount and update on resize
    const updateScreenSize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };

    updateScreenSize(); // Initial check
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);


  return (
    <div className="relative h-[100dvh] md:h-screen">
      {/* Referral Code Input */}
      <div className={`absolute inset-0 bg-gray-500 blur-xl `}></div>
      <div
        className={`z-50 rounded-md flex flex-col h-full md:pt-6 md:h-[calc(100vh-40px)] md:flex-row w-full max-w-screen-md mx-auto relative`}
      >
{action === 'start' && (
<>
{isMobile ? (
  /* Mobile Layout */
  <div className="left-side w-full bg-gray-300 flex flex-col text-center">
    {/* Logo */}
    <div className="flex justify-start items-start px-4 pt-4">
      <img
        className="h-12 w-auto bg-gray-80 rounded"
        src="/Super5logo.png"
        alt="Super5"
      />
    </div>
<div className='flex items-center  justify-between sm:mx-4 mt-2'>
<div className="flex max-w-[80%] flex-col space-y-3 pl-4">
      {/* Headings and Icons */}
      <div className="text-[#000066] font-macan font-bold">
      <h1 className={`font-sans text-xl  font-bold tracking-wider`}>GAME HAS CHANGED</h1>
      <div className="h-px bg-gray-400 mb-2" /></div>
      <p className={`font-sans text-gray-600 text-sm tracking-wide`}>USE YOUR CRICKETING SKILLS</p>
      <p className={`font-sans text-xl font-bold italic tracking-wide`}>PREDICT 5 QUESTIONS</p>
      <p className={`font-sans text-gray-600 tracking-wide`}>JOIN OUR FREE CONTESTS</p>
    </div>
        {/* Background Image */}
        <div className="flex justify-center items-center">
      <img
        className="max-h-48 max-w-44 object-cover"
        src="/image2.png"
        alt="super"
      />
    </div>
</div>
      {/* TextSlider */}
      <div className="w-full mt-4">
        <TextSlider />
      </div>
  </div>
) : (
  /* Desktop Layout */
    <div className="left-side w-full h-[21rem] md:h-auto bg-cover bg-center md:w-[45%] flex flex-col  md:flex-col text-center bg-gray-300">
      {/* Logo */}
      <div className="">
        <img
          className="md:mx-auto h-[4.5rem] md:h-20 w-auto bg-gray-80 p-4 rounded"
          src="/Super5logo.png"
          alt="Super5"
        />
      </div>

      <div className="flex sm:flex-col gap-10 md:gap-0 mt-10 md:mt-0 w-full md:items-center sm:text-left">
      <div className="flex max-w-full flex-col space-y-3 pl-4">
      {/* Headings and Icons */}
      <div className="text-[#000066] font-macan font-bold">
      <h1 className={`font-sans text-xl  font-bold tracking-wider`}>GAME HAS CHANGED</h1>
      <div className="h-px bg-gray-400 mb-2" /></div>
      <p className={`font-sans text-gray-600 text-sm tracking-wide`}>USE YOUR CRICKETING SKILLS</p>
      <p className={`font-sans text-xl font-bold italic tracking-wide`}>PREDICT 5 QUESTIONS</p>
      <p className={`font-sans text-gray-600 tracking-wide`}>JOIN OUR FREE CONTESTS</p>
    </div>
        {/* Move the TextSlider below the Background Image on mobile */}
        <div className="w-full justify-center items-center hidden md:flex flex-col md:px-4">
          <TextSlider />
        </div>
        {/* Background Image */}
        <div className="md:relative absolute top-10 sm:top-6 md:top-0 right-0 md:right-4 flex justify-center items-center">
          <img
            className=" h-52 w-full object-cover"
            src="/image2.png"
            alt="super"
          />
        </div>
      </div>
    </div>

)}
</>

)}
        {action === 'welcome' && currentStep === 4 ? (
          <InputReferalPage referralCode={referralCode} />
        ) : (
          <div
            className={`right-side md:h-auto flex flex-col md:justify-center items-center flex-grow px-4 md:px-14 py-4 bg-gray-200 lg:w-[60%]`}
          >
            {action === 'start' && (
              <div>
                <h2 className="text-xl text-center md:mt-4 px-4 font-bold">
                  Login/Register
                </h2>
                {/* Firebase Phone Authentication */}
                <div className="mt-4">
                  {isMobileLoginEnabled && (
                    <>
                    
                    <div className="flex flex-col">
                      <label>Mobile Number</label>
                      <PhoneInput
                        country={selectedCountry}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        inputProps={{
                          name: 'phone',
                          required: true,
                          autoFocus: true,
                          disabled: loading,

                        }}
                        containerStyle={{ width: '100%' }}
                        inputStyle={{
                          width: '100%',
                          borderRadius: '8px',
                          paddingTop: '20px',
                          paddingBottom: '20px',
                          fontSize: '18px',
                          border: `1px solid ${phoneError ? 'red' : '#ccc'}`,
                        }}
                      />
                    </div>
                    <div className="mt-6">
                    <button
  type="button"
  onClick={() => handleSendOTP('sms')}
  className="relative flex w-full justify-center items-center bg-primaryColor px-3 py-2 font-semibold leading-6 text-white rounded-full shadow-sm"
  disabled={loading} // Disable button while loading
>
  {/* Add blur effect and opacity to the text when loading */}
  <span
    className={`transition-all ${
      loading ? 'opacity-70' : ''
    }`}
  >
    Continue
  </span>

  {loading && (
    <div className="absolute right-[22%] flex items-center justify-center z-10">
      <ClipLoader color="#ffffff" size={24} />
    </div>
  )}
</button>
                  </div>
                    </>
                  ) }

                  <div
                    id="recaptcha-container"
                    className="mt-4 w-full flex justify-center"
                    ></div>
                    {error && (
                      <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>

{         isMobileLoginEnabled&& (    <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <p className="px-4 text-center text-lg text-gray-600">Or</p>
                  <hr className="flex-grow border-gray-300" />
                </div>)}

                <div className="w-full mt-4">
  <LoginWithGoogle
    setIsCenter={setIsCenter}
    setSuccess={setSuccess}
    setCurrentStep={setCurrentStep}
    setAction={setAction}
    setEmail={setEmail}
    setIsGoogle={setIsGoogle}
    setUserGoogleInfo={setUserGoogleInfo}
    disabled={loading} 
  />
</div>

                {   !isMobileLoginEnabled&& (    <div className="flex items-center my-2 md:my-4">
                  <hr className="flex-grow border-gray-300" />
                  <p className="px-4 text-center text-lg text-gray-600">Or</p>
                  <hr className="flex-grow border-gray-300" />
                </div>)}
                <div className="mt-4">
                  {isMobileLoginEnabled ? (
                    <button
  onClick={() => handleActionClick('signup')}
  className={`flex w-full justify-center px-3 py-2 font-semibold leading-6 text-white rounded-full shadow-sm ${
    loading
      ? 'bg-gray-400 cursor-not-allowed' 
      : 'bg-primaryColor'
  }`}
  disabled={loading}
>
  Continue with Email
</button>

                  ):
                  
                  (
                    <>
                      <div className="relative md:mt-4">
                        <label className="md:mt-4">Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={handleEmailChange}
                          disabled={loading}
                          onBlur={handleEmailBlur}
                          placeholder="example@gmail.com"
                          className={`px-3 py-3 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ${
                            emailError
                              ? 'border-red-500 ring-red-500 focus:ring-red-500'
                              : 'ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset'
                          }`}
                        />
                      </div>
                      <div className="mt-6">
                      <button
  type="button"
  onClick={() => handleSendOTP('email')}
  className="relative flex w-full justify-center items-center bg-primaryColor px-3 py-2 font-semibold leading-6 text-white rounded-full shadow-sm"
  disabled={loading} 
>
  <span
    className={`transition-all ${
      loading ? 'opacity-70' : ''
    }`}
  >
    Continue
  </span>

  {loading && (
    <div className="absolute right-[22%] flex items-center justify-center z-10">
      <ClipLoader color="#ffffff" size={24} />
    </div>
  )}
</button>

                  </div>
                    </>
                  )
                  
                  }
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
              </div>
            )}

            {action === 'signup' && (
              <div className="md:static md:h-auto md:overflow-auto h-full w-full overflow-hidden fixed px-4 inset-0">
              <div>
                  <button
onClick={
  currentStep === 1 || (currentStep === 2)
    ? () => handleActionClick('start')
    : handleBack
}

                    className="absolute top-4 md:top-10 left-2  bg-gray-500 px-2 py-2 rounded-full text-xl font-bold"
                  >
                    <FiArrowLeft />
                  </button>
                </div>

                <form
                  className="mt-4 w-full md:w-[60%] mx-auto"
  onSubmit={(e) => {
    e.preventDefault();
    isMobileLoginEnabled ? handleSubmit('phone') : handleSubmit('email');
  }}                >
                  {currentStep === 1 && (
                    <>
                      <h3 className="text-xl text-center md:text-start">
                        Continue with Email
                      </h3>
                      <div className="relative mt-4">
                        <label className="mt-4">Email</label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={handleEmailChange}
                          disabled={loading}
                          onBlur={handleEmailBlur}
                          placeholder="example@gmail.com"
                          className={`px-3 py-3 block w-full rounded-md text-gray-900 shadow-sm ring-1 ring-inset ${
                            emailError
                              ? 'border-red-500 ring-red-500 focus:ring-red-500'
                              : 'ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset'
                          }`}
                        />
                      </div>
                      {emailError && (
                        <p className="text-sm text-red-500 mt-2">
                          {emailError}
                        </p>
                      )}
                      <div className="mt-8">
                      <button
  type="button"
  onClick={() => handleSendEmailOtp('signup')}
  disabled={loading} // Disable button while loading
  className="relative flex w-full justify-center items-center bg-primaryColor px-3 py-2 font-semibold leading-6 text-white rounded-full shadow-sm"
>
  {/* Add blur effect and opacity to the text when loading */}
  <span
    className={`transition-all ${
      loading ? 'opacity-70' : ''
    }`}
  >
    Continue
  </span>

  {loading && (
    <div className="absolute right-[22%] flex items-center justify-center z-10 pr-4">
      <ClipLoader color="#ffffff" size={24} />
    </div>
  )}
</button>

                      </div>
                      <div className="flex justify-center items-center mx-8 mt-4 text-xs">
                        <label className={isChecked ? '' : ''}>
                          I certify that, i am above 18 years old and agreed to
                          all{' '}
                          <span
                            className="underline cursor-pointer"
                            onClick={() =>
                              handleOpenLink('terms_and_conditions')
                            }
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
                    </>
                  )}

                  {currentStep === 2 && (
                    <>
  <h2 className="font-bold text-center md:text-start">
    OTP Verification
  </h2>
  <p className="mt-6 md:mt-4">
  We have sent your code to {email ? email : phoneNumber } 
</p>
  <p
    className="underline inline-block cursor-pointer"
    onClick={() => (phoneNumber ? setAction('start') : setCurrentStep(1))} 
    >
    Not you?
  </p>
  <div className="relative mt-4">
    <label
      htmlFor="otp"
      className="block mb-2 text-sm font-medium text-gray-700"
    >
      Verification Code
    </label>
    <input
      type="text"
      id="otp"
      value={otp}
      onChange={handleOtpChange}
      onBlur={handleOtpBlur}
      placeholder="Enter your verification code"
      disabled={verifying}
      required
      className={`block w-full px-3 py-3 rounded-md text-gray-900 shadow-sm ring-1 ring-inset ${
        otpError
          ? 'border-red-500 ring-red-500 focus:ring-red-500'
          : 'ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset'
      } sm:text-sm`}
    />
    {otpError && (
      <p className="text-sm text-red-500 mt-2">
        {otpError}
      </p>
    )}
  </div>
  <div className="mt-8"></div>
  <div className="text-center mt-2">
    Didn't get the code?
    <button
      className={`text-primaryColor cursor-pointer ${
        isDisabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={resendOtp}
      disabled={isDisabled}
    >
      {isDisabled ? ` Resend in ${timer}s` : ' Resend'}
    </button>
  </div>

  {/* Button at the bottom on mobile */}
  <div className="md:text-center mt-4 md:mt-0 md:static absolute bottom-6 left-0 right-0 w-full text-center px-4 py-4">
  <button
  type="button"
  onClick={() => isMobileLoginEnabled ? verifyCode('phone') : verifyCode('email')}
  disabled={verifying}
  className={`relative flex w-full justify-center items-center px-3 py-3 text-lg font-semibold leading-6 text-white rounded-full shadow-sm ${
    verifying
      ? 'bg-orange-300 cursor-not-allowed opacity-70'
      : 'bg-primaryColor hover:bg-primaryColor-dark'
  } sm:mx-auto`}
>
  {/* Add a blur effect and opacity to the text when verifying */}
  <span
    className={`transition-all ${
      verifying ? 'opacity-70' : ''
    }`}
  >
    Verify your code
  </span>

  {verifying && (
    <div className="absolute right-[10%] flex items-center justify-center z-10 pr-4">
      <ClipLoader color="#ffffff" size={24} />
    </div>
  )}
</button>

  </div>
</>

                  )}
                  {currentStep === 3 && !isGoogle && (
                    <>
                      <h2 className="font-bold text-center md:text-start">
                        Enter your Full name
                      </h2>
                      <label
                        htmlFor="otp"
                        className="block mt-6 md:mt-4 mb-2 text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className="block w-full px-3 py-3 border rounded-md"
                        disabled={isSubmitting}
                        required
                      />
                      <div className="mt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`relative flex w-full justify-center items-center px-3 py-3 text-lg font-semibold leading-6 text-white rounded-full shadow-sm ${
                            isSubmitting
                              ? 'bg-orange-300 cursor-not-allowed opacity-70'
                              : 'bg-primaryColor hover:bg-primaryColor-dark'
                          }`}
                        >
                          {isSubmitting ? (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <ClipLoader color="#ffffff" size={24} />
                            </div>
                          ) : (
                            ''
                          )}

                          {/* Add a blur effect to the button text while submitting */}
                          <span
                            className={`transition-all ${
                              isSubmitting ? 'blur-sm opacity-50' : ''
                            }`}
                          >
                            Continue
                          </span>
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const InputReferalPage = ({ referralCode: initialReferralCode }) => {
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState(initialReferralCode || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const userId = localStorage.getItem('user_id');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update referralCode state if the prop changes
    if (initialReferralCode) {
      setReferralCode(initialReferralCode);
    }
  }, [initialReferralCode]);

  const handleSubmitReferralCode = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (referralCode.trim() === '') {
      setError('Referral code is required!');
      return;
    }
    setLoading(true); // Start loading when the request is initiated

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/v4/referral-code`,
        { userId, referralCode }
      );
      navigate('/');
      setSuccess('Referral code updated successfully!');
      console.log('Response:', response.data);
    } catch (err) {
      toast.error(
          'This referral code is not valid.Please contact support if you continue to face issues'
      );
      console.log('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-400 text-black p-8">
      <div className="flex flex-col items-center gap-10 md:gap-0 md:items-start justify-center">
        {/* Logo */}
        <div className="mt-2">
          <img
            className="h-16 w-auto bg-gray-80 rounded"
            src="/Super5logo.png"
            alt="Super5"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">👋</span>
                <h1 className="text-4xl font-bold">Welcome!</h1>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed max-w-md">
                Showcase your products, create amazing collections, and
                experience the future of shopping. Start with a referral code
                for exclusive rewards.
              </p>
            </div>

            <div className="space-y-4 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  placeholder="Enter Your Referral/Promo Code"
                  disabled={loading}
                  className="w-full px-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryColor focus:border-transparent placeholder-gray-500"
                />
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {success && <p className="text-green-500 mt-2">{success}</p>}
              <button
                className="relative flex w-full justify-center items-center bg-primaryColor px-3 py-3 text-lg font-semibold leading-6 text-white rounded-full shadow-sm"
                onClick={handleSubmitReferralCode}
                disabled={loading} // Disable button while loading
              >
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <ClipLoader color="#ffffff" size={24} />
                  </div>
                ) : (
                  ''
                )}

                {/* Add blur effect and opacity to the text when loading */}
                <span
                  className={`transition-all ${
                    loading ? 'blur-sm opacity-50' : ''
                  }`}
                >
                  Continue
                </span>
              </button>

              <button
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                onClick={() => navigate('/')}
              >
                No, I don&apos;t have any code
              </button>
            </div>
          </div>

          {/* Right Column - Decorative Elements */}
          {/* ... The existing decorative elements remain unchanged ... */}
        </div>
      </div>
    </div>
  );
};

export default LoginWithEmail;
