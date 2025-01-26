import React, { useEffect, useState } from 'react'
import BottomNavigationComponent from '../BottomNavigation/BottomNavigation'
import { BASE_URL } from '../../API/Constants'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

function HowToPlay() {
    const navigate = useNavigate()
    const [apiCalled, setApiCalled] = useState(false)
    const [howToPlayRules, setHowToPlayRules] = useState([])

    const handleReturnHome = () => {
        navigate('/')
    }

    const getSettingsData = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        }

        fetch(`${BASE_URL}/api/settings/data/how_to_play`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log('Data :', data)
                if (data.status === 200) {
                    const list = data.data.settings.list
                    setHowToPlayRules(list)
                    setApiCalled(true)
                } else {
                }
            })
            .catch((error) => {})
    }

    useEffect(() => {
        if (!apiCalled) {
            getSettingsData()
        }
    })
    return (
        <div>
            <div className='text-center bg-gray-800 text-white py-2 relative'>
                <div className='absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer hover:font-bold'>
                    <ArrowBack className='font-bold' onClick={() => handleReturnHome()} />
                </div>
                <div className='text-center p-2 font-bold text-white'>How to Play</div>
            </div>
            <div className='m-8 text-xl'>
                {howToPlayRules.length > 0 &&
                    howToPlayRules.map((rule) => {
                        return <div>• {rule}</div>
                    })}
            </div>
        </div>
    )
}

export default HowToPlay
