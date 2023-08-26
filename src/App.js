import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DayPage from './components/DayPage.js'
import {  useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { userManager } from './utils/localStorageDB';


function App() {
  // here should be token
  // let [token, setToken] = useState()
  let [userId, setUserId] = useState()
  const navigate = useNavigate()

  const exitEvent = () => {
    console.log('exitEvent')
    userManager.removeCurrentUser()
    setUserId(undefined)
    navigate('/')
  }

  const loginEvent = (currentUserId) => {
    console.log('loginEvent')
    userManager.setCurrentUser(currentUserId)
    setUserId(currentUserId)
  }

  const loginNav = () => {
    console.log(`loginNav - ${userId}`)
    
    if (userId) {
      return '/home'
    }
    let currentUserId = userManager.getCurrentUser()
    if (currentUserId) {
      setUserId(currentUserId)
      return '/'
    }
    return '/login'
  }

  return (
    <div className="main-container">
        <Routes>
          <Route path="/" element={<Navigate to={loginNav()} />} />
          <Route path="/login" element={<LoginPage loginEvent={loginEvent}/>} />
          <Route path='/home' element={<HomePage exitEvent={exitEvent} />} >
            <Route path='/home/' element={<Navigate to='/home/day/today' />} />
            <Route path='/home/day/:date' element={<DayPage userID={userId}/>} />
            <Route path='/home/stats' element={<div>Stats</div>} />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
