import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stats.css';
import { userManager } from '../utils/localStorageDB';  // Import userManager

const Stats = () => {
    const navigate = useNavigate();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [daysInMonth, setDaysInMonth] = useState(0);
    const [selectedDay, setSelectedDay] = useState(today.getDate());

    const [caloriesStats, setCaloriesStats] = useState({ received: 0, burned: 0 });  // New state variable

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    useEffect(() => {
        setDaysInMonth(getDaysInMonth(currentMonth, currentYear));
    }, [currentMonth, currentYear]);

    const getUserDayData = (date) => {
        const currentUserID = userManager.getCurrentUser();
        const currentUser = userManager.getUserById(currentUserID);

        if (!currentUser || !currentUser.login || !currentUser.password) {
            console.log('Error: No user logged in');
            return null;
        }
        const userID = userManager.authentication(currentUser.login, currentUser.password);

        if (!userID || !userManager.users[userID]) {
            console.log('Error: No user found');
            return null;
        }
        console.log(date)
        console.log(userManager.getDayInfoForUser(userID, date))
        return userManager.getDayInfoForUser(userID, date);
    };

    useEffect(() => {
        if (selectedDay && (selectedDay === today.getDate() || selectedDay !== today.getDate())) {
            const dateStr = `${selectedDay}-${currentMonth + 1}-${currentYear}`;
            const userDayData = getUserDayData(dateStr);

            let totalBurned = 0, totalReceived = 0;

            if (userDayData && userDayData.exercises) {
                userDayData.exercises.forEach(ex => {
                    totalBurned += ex.time * ex.calories;
                });
            }

            if (userDayData && userDayData.meals) {
                userDayData.meals.forEach(meal => {
                    totalReceived += (meal.amount * 10) * meal.calories;
                });
            }

            setCaloriesStats({ received: totalReceived, burned: totalBurned });
        }
    }, [selectedDay, currentMonth, currentYear]);

    const goToDay = (day) => {
        setSelectedDay(day);
    };

    const goToDetails = () => {
        if (selectedDay) {
            navigate(`/home/day/${selectedDay}-${currentMonth + 1}-${currentYear}`);
        }
    };

    const moveMonth = (direction) => {
        if (direction === 'prev') {
            if (currentMonth === 0) {
                setCurrentYear(currentYear - 1);
                setCurrentMonth(11);
            } else {
                setCurrentMonth(currentMonth - 1);
            }
        } else if (direction === 'next') {
            if (currentMonth < today.getMonth() || currentYear < today.getFullYear()) {
                if (currentMonth === 11) {
                    setCurrentYear(currentYear + 1);
                    setCurrentMonth(0);
                } else {
                    setCurrentMonth(currentMonth + 1);
                }
            }
        }
        setSelectedDay(null);
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="stats">
            <button onClick={() => moveMonth('prev')}>Previous Month</button>
            <span className="current-month-year">{`${monthNames[currentMonth]} ${currentYear}`}</span>
            <button disabled={(currentMonth === today.getMonth() && currentYear === today.getFullYear())} onClick={() => moveMonth('next')}>Next Month</button>
            <div className="calendar">
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <div
                        key={day}
                        className={`day ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'today' : ''} ${day === selectedDay ? 'SelectedDay' : ''}`}
                        onClick={() => goToDay(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
            <button onClick={goToDetails}>Details</button>

            {selectedDay && (
                <div className="calories-info">
                    <p>Calories Burned: {caloriesStats.burned.toFixed(2)}</p>
                    <p>Calories Received: {caloriesStats.received.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
};

export default Stats;
