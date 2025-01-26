import React from 'react'
import BottomNavigationComponent from '../BottomNavigation/BottomNavigation'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase-config'
import CoinSVG from '../../Assets/coins.svg'
import ReferSVG from '../../Assets/refer.svg'
import RewardsSVG from '../../Assets/rewards.svg'
import BottomNavigationV2 from '../BottomNavigationV2/BottomNavigationV2'

function UserProfile() {
    const navigate = useNavigate()

    const handleRoute = (route) => {
        navigate('/' + route)
    }

    const handlePrivacyPage = () => {
        window.open('https://docs.google.com/document/d/e/2PACX-1vTTPgG4jKLBCdAL-G9ucIJfZTHJ9k0UFiCdqtW_jKGM5S0A8wG0-0VFhTELHLmliLVVfRcJ3K6d88b3/pub')
    }

    const handleTermsAndConditions = () => {
        window.open('https://docs.google.com/document/d/e/2PACX-1vSTD88F9JDUGR7zUUY2ITW1HA5LyoApajHjRyDnEV_neN0UyRV3m2VU38pkLjsi8ZhFQvuK3AKQQulO/pub')
    }

    const handleSignOut = () => {
        signOut(auth).then(() => {
            localStorage.clear()
            window.location.pathname = '/login'
        })
    }

    return (
        <>
            <div className='bg-gray-700 min-h-screen pb-32'>
                <div className='first__container bg-red-500 flex flex-col items-center py-2'>
                    <img className='rounded-full my-2 border-2 w-16' src={localStorage.getItem('user_photoURL')} alt='' />
                    <h1 className='text-2xl text-white my-2'>{localStorage.getItem('user_name')}</h1>
                    <h1 className='text-xl text-white font-bold'>SuperCoins : {localStorage.getItem('user_coins')}</h1>
                </div>
                <div className='second__container bg-gray-700'>
                    <div className='mb-16 p-8'>
                        <div className='flex flex-row items-center p-2'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='30px' height='30px'>
                                <path d='M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z' fill='white' />
                            </svg>
                            <h1 className='ml-4 text-white cursor-pointer hover:font-bold' onClick={() => handleRoute('my-info')}>
                                My Info and Settings
                            </h1>
                        </div>
                        <div className='flex flex-row items-center p-2'>
                            <img src={CoinSVG} alt='Your SVG' />
                            <h1 className='ml-4 text-white cursor-pointer hover:font-bold' onClick={() => handleRoute('coin-history')}>
                                My Transactions
                            </h1>
                        </div>
                        <div className='flex flex-row items-center p-2'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='30px' height='30px'>
                                <path
                                    fill='white'
                                    d='M 38.96875 0 C 35.675781 -0.0117188 28.804688 -0.121094 25.125 3.5625 L 24.46875 4.21875 L 24.46875 4.25 C 20.539063 8.207031 20.082031 14.121094 22.90625 18.5625 L 2.40625 37.3125 L 2.375 37.34375 C 1.476563 38.242188 0.53125 39.75 0.25 41.625 C -0.03125 43.5 0.453125 45.734375 2.375 47.65625 C 4.296875 49.578125 6.53125 50.0625 8.40625 49.78125 C 10.28125 49.5 11.789063 48.554688 12.6875 47.65625 L 12.71875 47.65625 L 12.71875 47.625 C 12.71875 47.625 17.425781 42.300781 22.1875 37 C 24.570313 34.347656 26.953125 31.710938 28.78125 29.75 C 29.695313 28.769531 30.484375 27.953125 31.03125 27.40625 C 31.183594 27.253906 31.261719 27.167969 31.375 27.0625 C 35.820313 29.992188 41.796875 29.585938 45.78125 25.59375 L 46.4375 24.9375 C 48.234375 23.144531 49.066406 20.523438 49.5 17.96875 C 49.933594 15.414063 49.929688 12.890625 49.9375 11.21875 C 49.941406 10.835938 49.933594 10.460938 49.625 10.09375 C 49.316406 9.726563 48.738281 9.628906 48.4375 9.6875 C 47.835938 9.808594 47.59375 10.125 47.59375 10.125 L 47.5625 10.15625 C 47.5625 10.15625 41.84375 15.902344 41.0625 16.6875 C 41.03125 16.707031 41.023438 16.710938 40.96875 16.71875 C 40.789063 16.746094 40.507813 16.777344 40.15625 16.78125 C 39.457031 16.789063 38.496094 16.742188 37.5625 16.65625 C 36.628906 16.570313 35.691406 16.425781 34.96875 16.28125 C 34.605469 16.207031 34.300781 16.128906 34.09375 16.0625 C 34.019531 16.039063 33.976563 16.023438 33.9375 16 C 33.914063 15.964844 33.894531 15.929688 33.875 15.875 C 33.808594 15.675781 33.757813 15.351563 33.6875 15 C 33.546875 14.296875 33.421875 13.382813 33.34375 12.46875 C 33.265625 11.554688 33.222656 10.628906 33.25 9.9375 C 33.265625 9.589844 33.277344 9.308594 33.3125 9.125 C 33.332031 9.035156 33.363281 8.984375 33.375 8.96875 C 34.242188 8.101563 39.9375 2.4375 39.9375 2.4375 L 39.96875 2.40625 L 39.96875 2.375 C 39.96875 2.375 40.265625 2.164063 40.40625 1.59375 C 40.476563 1.308594 40.453125 0.753906 40.09375 0.40625 C 39.734375 0.0585938 39.347656 0 38.96875 0 Z M 37.65625 2 C 36.414063 3.242188 32.566406 7.089844 31.9375 7.71875 C 31.5625 8.09375 31.535156 8.414063 31.46875 8.75 C 31.402344 9.085938 31.359375 9.464844 31.34375 9.875 C 31.308594 10.691406 31.355469 11.648438 31.4375 12.625 C 31.519531 13.601563 31.648438 14.570313 31.8125 15.375 C 31.894531 15.777344 31.988281 16.152344 32.09375 16.46875 C 32.199219 16.785156 32.265625 17.046875 32.59375 17.375 C 32.929688 17.710938 33.179688 17.769531 33.5 17.875 C 33.820313 17.980469 34.183594 18.074219 34.59375 18.15625 C 35.414063 18.320313 36.417969 18.4375 37.40625 18.53125 C 38.394531 18.625 39.351563 18.695313 40.15625 18.6875 C 40.558594 18.683594 40.933594 18.640625 41.25 18.59375 C 41.566406 18.546875 41.835938 18.632813 42.28125 18.1875 C 42.773438 17.691406 46.699219 13.714844 47.96875 12.4375 C 47.945313 13.996094 47.949219 15.742188 47.625 17.65625 C 47.226563 20.015625 46.421875 22.265625 45.09375 23.59375 L 44.4375 24.25 C 40.574219 28.117188 34.628906 28.015625 30.84375 24.21875 L 25.84375 19.21875 C 22.0625 15.417969 21.964844 9.464844 25.8125 5.59375 L 26.46875 4.90625 C 28.957031 2.414063 34.210938 2.058594 37.65625 2 Z M 24 20 C 24.164063 20.1875 24.320313 20.382813 24.5 20.5625 L 29.5 25.5625 C 29.636719 25.699219 29.792969 25.808594 29.9375 25.9375 C 29.867188 26.007813 29.828125 26.046875 29.75 26.125 C 29.171875 26.699219 28.390625 27.511719 27.46875 28.5 C 25.625 30.476563 23.226563 33.125 20.84375 35.78125 C 16.089844 41.074219 11.433594 46.375 11.40625 46.40625 L 11.375 46.4375 C 10.765625 47.035156 9.515625 47.789063 8.125 48 C 6.71875 48.210938 5.207031 47.957031 3.65625 46.40625 C 2.105469 44.855469 1.820313 43.316406 2.03125 41.90625 C 2.242188 40.515625 3.027344 39.265625 3.625 38.65625 L 3.65625 38.625 Z'
                                />
                            </svg>
                            <h1 className='ml-4 text-white cursor-pointer hover:font-bold' onClick={() => handleRoute('help-and-support')}>
                                Help and Support
                            </h1>
                        </div>
                        <div className='flex flex-row items-center p-2'>
                            <svg width='30px' height='30px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#ffffff'>
                                <g id='SVGRepo_iconCarrier'>
                                    {' '}
                                    <path
                                        d='M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z'
                                        stroke='#fafafa'
                                        stroke-linejoin='round'
                                    />{' '}
                                </g>
                            </svg>
                            <h1 className='ml-4 text-white cursor-pointer hover:font-bold' onClick={() => handleRoute('how-to-play')}>
                                How to Play
                            </h1>
                        </div>
                        <div className='flex flex-row items-center p-2'>
                            <svg width='30px' height='30px' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' stroke='#ffffff'>
                                <g id='SVGRepo_iconCarrier'>
                                    {' '}
                                    <path d='M12 19H12.01M8.21704 7.69689C8.75753 6.12753 10.2471 5 12 5C14.2091 5 16 6.79086 16 9C16 10.6565 14.9931 12.0778 13.558 12.6852C12.8172 12.9988 12.4468 13.1556 12.3172 13.2767C12.1629 13.4209 12.1336 13.4651 12.061 13.6634C12 13.8299 12 14.0866 12 14.6L12 16' stroke='#ffffff' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' />{' '}
                                </g>
                            </svg>
                            <h1 className='ml-4 text-white cursor-pointer hover:font-bold' onClick={() => handleRoute('FAQs')}>
                                FAQs
                            </h1>
                        </div>
                        <div className='flex flex-row items-center p-2'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='30px' height='30px'>
                                <path
                                    fill='white'
                                    d='M 38.96875 0 C 35.675781 -0.0117188 28.804688 -0.121094 25.125 3.5625 L 24.46875 4.21875 L 24.46875 4.25 C 20.539063 8.207031 20.082031 14.121094 22.90625 18.5625 L 2.40625 37.3125 L 2.375 37.34375 C 1.476563 38.242188 0.53125 39.75 0.25 41.625 C -0.03125 43.5 0.453125 45.734375 2.375 47.65625 C 4.296875 49.578125 6.53125 50.0625 8.40625 49.78125 C 10.28125 49.5 11.789063 48.554688 12.6875 47.65625 L 12.71875 47.65625 L 12.71875 47.625 C 12.71875 47.625 17.425781 42.300781 22.1875 37 C 24.570313 34.347656 26.953125 31.710938 28.78125 29.75 C 29.695313 28.769531 30.484375 27.953125 31.03125 27.40625 C 31.183594 27.253906 31.261719 27.167969 31.375 27.0625 C 35.820313 29.992188 41.796875 29.585938 45.78125 25.59375 L 46.4375 24.9375 C 48.234375 23.144531 49.066406 20.523438 49.5 17.96875 C 49.933594 15.414063 49.929688 12.890625 49.9375 11.21875 C 49.941406 10.835938 49.933594 10.460938 49.625 10.09375 C 49.316406 9.726563 48.738281 9.628906 48.4375 9.6875 C 47.835938 9.808594 47.59375 10.125 47.59375 10.125 L 47.5625 10.15625 C 47.5625 10.15625 41.84375 15.902344 41.0625 16.6875 C 41.03125 16.707031 41.023438 16.710938 40.96875 16.71875 C 40.789063 16.746094 40.507813 16.777344 40.15625 16.78125 C 39.457031 16.789063 38.496094 16.742188 37.5625 16.65625 C 36.628906 16.570313 35.691406 16.425781 34.96875 16.28125 C 34.605469 16.207031 34.300781 16.128906 34.09375 16.0625 C 34.019531 16.039063 33.976563 16.023438 33.9375 16 C 33.914063 15.964844 33.894531 15.929688 33.875 15.875 C 33.808594 15.675781 33.757813 15.351563 33.6875 15 C 33.546875 14.296875 33.421875 13.382813 33.34375 12.46875 C 33.265625 11.554688 33.222656 10.628906 33.25 9.9375 C 33.265625 9.589844 33.277344 9.308594 33.3125 9.125 C 33.332031 9.035156 33.363281 8.984375 33.375 8.96875 C 34.242188 8.101563 39.9375 2.4375 39.9375 2.4375 L 39.96875 2.40625 L 39.96875 2.375 C 39.96875 2.375 40.265625 2.164063 40.40625 1.59375 C 40.476563 1.308594 40.453125 0.753906 40.09375 0.40625 C 39.734375 0.0585938 39.347656 0 38.96875 0 Z M 37.65625 2 C 36.414063 3.242188 32.566406 7.089844 31.9375 7.71875 C 31.5625 8.09375 31.535156 8.414063 31.46875 8.75 C 31.402344 9.085938 31.359375 9.464844 31.34375 9.875 C 31.308594 10.691406 31.355469 11.648438 31.4375 12.625 C 31.519531 13.601563 31.648438 14.570313 31.8125 15.375 C 31.894531 15.777344 31.988281 16.152344 32.09375 16.46875 C 32.199219 16.785156 32.265625 17.046875 32.59375 17.375 C 32.929688 17.710938 33.179688 17.769531 33.5 17.875 C 33.820313 17.980469 34.183594 18.074219 34.59375 18.15625 C 35.414063 18.320313 36.417969 18.4375 37.40625 18.53125 C 38.394531 18.625 39.351563 18.695313 40.15625 18.6875 C 40.558594 18.683594 40.933594 18.640625 41.25 18.59375 C 41.566406 18.546875 41.835938 18.632813 42.28125 18.1875 C 42.773438 17.691406 46.699219 13.714844 47.96875 12.4375 C 47.945313 13.996094 47.949219 15.742188 47.625 17.65625 C 47.226563 20.015625 46.421875 22.265625 45.09375 23.59375 L 44.4375 24.25 C 40.574219 28.117188 34.628906 28.015625 30.84375 24.21875 L 25.84375 19.21875 C 22.0625 15.417969 21.964844 9.464844 25.8125 5.59375 L 26.46875 4.90625 C 28.957031 2.414063 34.210938 2.058594 37.65625 2 Z M 24 20 C 24.164063 20.1875 24.320313 20.382813 24.5 20.5625 L 29.5 25.5625 C 29.636719 25.699219 29.792969 25.808594 29.9375 25.9375 C 29.867188 26.007813 29.828125 26.046875 29.75 26.125 C 29.171875 26.699219 28.390625 27.511719 27.46875 28.5 C 25.625 30.476563 23.226563 33.125 20.84375 35.78125 C 16.089844 41.074219 11.433594 46.375 11.40625 46.40625 L 11.375 46.4375 C 10.765625 47.035156 9.515625 47.789063 8.125 48 C 6.71875 48.210938 5.207031 47.957031 3.65625 46.40625 C 2.105469 44.855469 1.820313 43.316406 2.03125 41.90625 C 2.242188 40.515625 3.027344 39.265625 3.625 38.65625 L 3.65625 38.625 Z'
                                />
                            </svg>
                            <h1 className='ml-4 text-white cursor-pointer hover:font-bold' onClick={() => handlePrivacyPage()}>
                                Privacy Policy
                            </h1>
                        </div>
                        <div className='flex flex-row items-center p-2'>
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 50 50' width='30px' height='30px'>
                                <path d='M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z' fill='white' />
                            </svg>
                            <h1 className='ml-4 text-white cursor-pointer hover:font-bold' onClick={() => handleTermsAndConditions()}>
                                Terms and Conditions
                            </h1>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex flex-row items-center justify-center border bg-red-400 mx-16 p-1 cursor-pointer hover:bg-red-500' onClick={() => handleSignOut()}>
                            <h1 className='ml-4 text-white'>Logout</h1>
                        </div>
                    </div>
                </div>
            </div>
            <BottomNavigationComponent />
        </>
    )
}

export default UserProfile
