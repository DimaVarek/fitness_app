import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userManager } from "../utils/localStorageDB";
import MealsList from "./MealsList";
import ExercisesList from "./ExercisesList";
import Modal from 'react-modal';
import ModalMeals from "./ModalMeals";
import ModalExercise from "./ModalExercise";

function DayPage({userID }) {
    let changeable = false;
    let { date } = useParams();
    let [dayInfo, setDayInfo] = useState(null); // Initialize to null
    let [mealModalIsOpen, setMealModalIsOpen] = useState(false); // Added
    let [exerciseModalIsOpen, setExerciseModalIsOpen] = useState(false); // Added

    Modal.setAppElement('#root');

    const openMealModal = () => {
        setMealModalIsOpen(true);
    };
    const closeMealModal = () => {
        setMealModalIsOpen(false);
    };
    const addMeal = (name, amount, calories) => {
        userManager.addMeal(userID, date, name, amount, calories);
        getDateInfo();
    };

    const openExerciseModal = () => {
        setExerciseModalIsOpen(true);
    };
    const closeExerciseModal = () => {
        setExerciseModalIsOpen(false);
    };
    const addEx = (name, time, calories) => {
        userManager.addEx(userID, date, name, time, calories);  // Added calories
        getDateInfo();
    };

    const getDateInfo = () => {
        const info = userManager.getDayInfoForUser(userID, date);
        if (info) {
            setDayInfo(info);
        }
    };

    if (date === "today") {
        changeable = true;
        const currentDate = new Date(Date.now());
        date = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    } else {
        const [day, month, year] = date.split('-').map(Number);
        const inputDate = new Date(year, month - 1, day);

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);

        if (inputDate.getTime() === todayDate.getTime()) {
            changeable = true;
        }
    }


    useEffect(() => {
        getDateInfo();
    }, [userID, date]);

    return (
        <div className="day-page">
            <ModalMeals
                mealModalIsOpen={mealModalIsOpen}
                closeMealModal={closeMealModal}
                addMealToDB={addMeal}
            />
            <ModalExercise
                exerciseModalIsOpen={exerciseModalIsOpen}
                closeExerciseModal={closeExerciseModal}
                addExerciseToDB={addEx}
            />

            {dayInfo && <div>Date - {dayInfo.date}</div>}
            <h2>Meals</h2>
            <MealsList meals={dayInfo?.meals} add={openMealModal} changeable={changeable} />
            <h2>Exercises</h2>
            <ExercisesList exercises={dayInfo?.exercises} add={openExerciseModal} changeable={changeable} />
        </div>
    );
}

export default DayPage;
