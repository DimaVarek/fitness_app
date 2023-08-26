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
    const addEx = (name, time) => {
        userManager.addEx(userID, date, name, time);
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
        date = new Date(Date.now());
        date = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
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
