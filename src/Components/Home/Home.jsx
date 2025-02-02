import React, { useEffect, useState } from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { formatTimeInStartsInFormat } from '../../Utils/time'
import BottomNavigationComponent from '../BottomNavigation/BottomNavigation'
import { BASE_URL } from '../../API/Constants'
import checkIcon from '../../Assets/checked.png'
import Carousel from 'react-material-ui-carousel'
import coinImage from '../../Assets/coin.png'
import { getFirstPrizeOfContest, shouldShowContest } from '../../Utils/Contest'
import slider4 from '../../Assets/slider4.gif'
import super5logo2 from '../../Assets/super5logo2.jpeg'
import super5logo3 from '../../Assets/super5logo3.png'
import super5logo4 from '../../Assets/super5logo4.png'
import super5logo5 from '../../Assets/super5logo5.png'
import PullToRefresh from 'react-simple-pull-to-refresh'
import BottomNavigationV2 from '../BottomNavigationV2/BottomNavigationV2'
import CustomAlert from '../CustomAlert/CustomAlert'

var items = [slider4]

function Home() {
    const navigate = useNavigate()
    const [apiCalled, setApiCalled] = useState(false)
    const [upcomingContests, setUpcomingContests] = useState([])
    const [sliderImages, setSliderImages] = useState([])
    const uid = localStorage.getItem('user_id')

    const openEachTicketContainer = (ticketId, cancelled, cancelledReason) => {
        if (cancelled) {
            setErrorMessage('Contest has been cancelled due to ' + cancelledReason)
            setOpenErrorAlert(true)
            return
        }
        navigate(`/contest-page/${ticketId}`)
    }

    const handleUserData = (coins) => {
        try {
            const parsedCoins = parseFloat(coins)

            if (!isNaN(parsedCoins)) {
                console.log('Coins : ', parsedCoins)
                localStorage.setItem('user_coins', parsedCoins)
            }
        } catch (error) {
            console.error('Error handling user data:', error)
        }
    }

    const handleSliderImages = (imagesList) => {
        let sliderList = []
        imagesList.forEach((image) => {
            if (image.length > 0) {
                sliderList.push(image)
            }
        })
        setSliderImages(sliderList)
    }

    const getPendingTickets = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`${BASE_URL}/api/user/contests/new/${uid}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log('Data :', data)
                if (data.status === 200) {
                    const list = data.data.upcomingContests
                    setUpcomingContests(list)
                    setApiCalled(true)
                    handleUserData(data.data.user.coins)
                    handleSliderImages(data.data.sliderImages)
                } else if (data.status === 500) {
                    handleUserData(data.data.user.coins)
                }
            })
            .catch((error) => {})
    }

    function onRefresh() {
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
            fetch(`${BASE_URL}/api/user/contests/new/${uid}`, requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    console.log('Data :', data)
                    if (data.status === 200) {
                        const list = data.data.upcomingContests
                        setUpcomingContests(list)
                        setApiCalled(true)
                        handleUserData(data.data.user.coins)
                        resolve()
                    } else if (data.status === 500) {
                        handleUserData(data.data.user.coins)
                        reject()
                    }
                })
                .catch((error) => {})
        })
    }

    useEffect(() => {
        if (!apiCalled) {
            getPendingTickets()
        }
        window.scrollTo(0, 0)
    }, [])

    const [successMessage, setSuccessMessage] = useState('Success')
    const [errorMessage, setErrorMessage] = useState('Error')
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false)
    const closeSuccessAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenSuccessAlert(false)
    }
    const [openErrorAlert, setOpenErrorAlert] = useState(false)
    const closeErrorAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpenErrorAlert(false)
    }

    return (
        <div className=''>
            <div className='bg-headerColor text-white flex justify-between px-4 py-3'>
                <div>
                    <img className='w-32' src={super5logo5} alt='' />
                </div>
                <div className='flex align-center justify-center items-center gap-2'>
                    <div className='font-bold text-xl'>{localStorage.getItem('user_coins') || 0}</div>
                    <div>
                        <img src={coinImage} alt='' className='w-8 h-8' />
                    </div>
                </div>
            </div>
            <div className=''>
                {sliderImages.length > 0 ? (
                    <Carousel>
                        {sliderImages.map((item, i) => (
                            <Item key={i} item={item} />
                        ))}
                    </Carousel>
                ) : (
                    <Carousel>
                        {items.map((item, i) => (
                            <Item key={i} item={item} />
                        ))}
                    </Carousel>
                )}
            </div>
            <div className='text-base text-gray-700 mt-5 ml-5'>Upcoming Matches</div>
            <PullToRefresh onRefresh={onRefresh} pullingContent={''}>
                <div className='all__tickets__container'>
                    {upcomingContests.length > 0 &&
                        upcomingContests.map((ticket) => {
                            if (shouldShowContest(ticket.startDate)) {
                                const firstPrize = getFirstPrizeOfContest(ticket)
                                return (
                                    <div className='tickets__card__container cursor-pointer' onClick={() => openEachTicketContainer(ticket._id, ticket.cancelled, ticket.cancelledReason)} key={ticket._id}>
                                        <article className='each__ticket__container bg-yellow-200'>
                                            <div className='flex justify-between'>
                                                <div className='team-image flex justify-center items-center' style={{ flex: '20%' }}>
                                                    <img src={ticket.teamOneLogo || 'https://i.postimg.cc/jjv3B5vP/flag1.jpg'} className='h-16 rounded-2xl' alt='Left Team' />
                                                </div>
                                                <div style={{ flex: '60%' }} className='text-center'>
                                                    <div>
                                                        <h2 className='text-xs mb-1'> {ticket.description}</h2>
                                                        <hr />
                                                    </div>
                                                    <div className='flex flex-col items-center my-4'>
                                                        <h2 className='font-bold'>
                                                            {ticket.teamOneShortName.length > 0 ? ticket.teamOneShortName : ticket.teamOne} vs {ticket.teamTwoShortName.length > 0 ? ticket.teamTwoShortName : ticket.teamTwo}
                                                        </h2>
                                                        <div className='text-xs text-gray-500'>{formatTimeInStartsInFormat(ticket.startDate)}</div>
                                                        {ticket.cancelled && <div className='text-xs font-bold text-red-500 mt-1'>Cancelled</div>}
                                                        {!ticket.cancelled && <div className='text-xs font-bold text-gray-500'>{ticket.entryFees} SuperCoins</div>}
                                                    </div>
                                                    {ticket.tagline !== '' && (
                                                        <div>
                                                            <h2 className='text-xs bg-blue-700 p-2 text-white rounded-lg py-2'>{ticket.tagline}</h2>
                                                        </div>
                                                    )}
                                                    {ticket.tagline === '' && firstPrize && (
                                                        <div>
                                                            <h2 className='text-xs bg-red-500 p-2 text-white rounded-lg py-2'> {firstPrize} </h2>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className='team-image flex justify-center items-center' style={{ flex: '20%' }}>
                                                    <img className='h-16 rounded-2xl' src={ticket.teamTwoLogo || 'https://i.postimg.cc/1tt7SQYT/flag2.jpg'} alt='Right Team' />
                                                </div>
                                            </div>
                                            {ticket.submissions && ticket.submissions.length > 0 && (
                                                <div className='absolute top-0 right-0 bg-yellow-300 p-1 rounded-bl-xl'>
                                                    <div className='flex items-center justify-center'>
                                                        <div className='text-base font-light px-1'>Joined</div>
                                                    </div>
                                                </div>
                                            )}
                                        </article>
                                    </div>
                                )
                            }
                        })}

                    {upcomingContests.length === 0 && (
                        <>
                            <img className='h-20 mt-8' src={checkIcon} alt='' />
                            <p className='text-2xl text-gray-500 mt-2'>No Contests found</p>
                        </>
                    )}
                </div>
            </PullToRefresh>
            <CustomAlert successMessage={successMessage} errorMessage={errorMessage} openSuccessAlert={openSuccessAlert} closeSuccessAlert={closeSuccessAlert} openErrorAlert={openErrorAlert} closeErrorAlert={closeErrorAlert} />
            <BottomNavigationComponent />
        </div>
    )
}

export default Home

function Item(props) {
    console.log('Props : ', props)

    if (props.item.length > 0) {
        return (
            <div className='flex justify-center align-center bg-white rounded-full'>
                <img className='w-full sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3' src={props.item} alt='src' />
            </div>
        )
    }
}
