import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Stats.css';

const Stats = () => {
    const navigate = useNavigate();
    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [daysInMonth, setDaysInMonth] = useState(0);

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    useEffect(() => {
        setDaysInMonth(getDaysInMonth(currentMonth, currentYear));
    }, [currentMonth, currentYear]);

    const goToDay = (day) => {
        navigate(`/home/day/${day}-${currentMonth + 1}-${currentYear}`);
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
                        className={`day ${day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear() ? 'today' : ''}`}
                        onClick={() => goToDay(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stats;
