import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { CardGiftcard, Dashboard, Home, Person, Send } from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

export default function BottomNavigationComponent() {
    const [value, setValue] = React.useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    React.useEffect(() => {
        const routeToValue = {
            '/': 0,
            '/my-contests': 1,
            '/my-rewards': 2,
            '/refer-and-earn': 3,
            '/profile': 4,
            '/coin-history': 5,
            '/faqs': 6,
            '/FAQs': 10
        }
        if (location.pathname.length > 15) {
            setValue(10)
        } else {
            setValue(routeToValue[location.pathname] || 0)
        }
    }, [location.pathname])

    const handleNavigation = (value) => {
        if (value === 0) {
            navigate('/')
        } else if (value === 1) {
            navigate('/my-contests')
        } else if (value === 2) {
            navigate('/my-rewards')
        } else if (value === 3) {
            navigate('/refer-and-earn')
        } else if (value === 4) {
            navigate('/profile')
        } else {
            navigate('/')
        }
    }

    return (
        <div className=''>
            <Box sx={{ width: '100%', position: 'fixed', bottom: 0, height: '70px' }}>
                <BottomNavigation
                    showLabels
                    sx={{ backgroundColor: '#181818', color: 'white', height: '100%' }}
                    value={value}
                    onChange={(event, newValue) => {
                        handleNavigation(newValue)
                    }}>
                    <BottomNavigationAction label='Home' sx={{ color: 'white' }} icon={<Home />} />
                    <BottomNavigationAction label='MyMatches' sx={{ color: 'white' }} icon={<Dashboard />} />
                    <BottomNavigationAction label='Rewards' sx={{ color: 'white' }} icon={<CardGiftcard />} />
                    <BottomNavigationAction label='Refer' sx={{ color: 'white' }} icon={<Send />} />
                    <BottomNavigationAction label='Profile' sx={{ color: 'white' }} icon={<Person />} />
                </BottomNavigation>
            </Box>
        </div>
    )
}
