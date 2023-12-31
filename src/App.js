import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import DayPage from './components/DayPage';
import { userManager } from './utils/localStorageDB';
import Stats from "./components/Stats";

function App() {
  const [userId, setUserId] = useState(userManager.getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      userManager.setCurrentUser(userId);
    } else {
      navigate('/login');
    }
  }, [userId, navigate]);

  const exitEvent = () => {
    userManager.removeCurrentUser();
    setUserId(null);
  };

  const loginEvent = (currentUserId) => {
    setUserId(currentUserId);
  };

  return (
      <div className="main-container">
        <Routes>
          {userId ? (
              <>
                <Route path="/" element={<Navigate to="/home/day/today" />} />
                <Route path="/home/*" element={<HomePage exitEvent={exitEvent} />}>
                  <Route index element={<Navigate to="/day/today" />} />
                  <Route path="day/:date" element={<DayPage userID={userId} />} />
                  <Route path="stats" element={<Stats />} />
                </Route>
              </>
          ) : (
              <>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<LoginPage loginEvent={loginEvent} />} />
              </>
          )}
        </Routes>
      </div>
  );
}

export default App;
