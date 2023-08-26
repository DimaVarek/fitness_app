import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userManager } from "../utils/localStorageDB";
import MealsList from "./MealsList";
import ExercisesList from "./ExercisesList";
import Modal from 'react-modal';
import ModalMeals from "./ModalMeals";
import ModalExercise from "./ModalExercise";

function DayPage({userID}) {
    let changeable = false
    let {date} = useParams()
    let [dayInfo, setDayInfo] = useState("")
    let [mealModalIsOpen, setMealModalIsOpen] = useState(false)
    let [exerciseModalIsOpen, setExerciseModalIsOpen] = useState(false)
    
    Modal.setAppElement('#root')
    function openMealModal() {
        setMealModalIsOpen(true);
    } 
    function closeMealModal() {
        setMealModalIsOpen(false);
    }
    function addMeal(name, amount, calories) {
        userManager.addMeal(userID, date, name, amount, calories)
        getDateInfo()
    }
    function openExerciseModal() {
        setExerciseModalIsOpen(true);
    }
    function closeExerciseModal() {
        setExerciseModalIsOpen(false);
    }
    function addEx(name, time) {
        userManager.addEx(userID, date, name, time)
        getDateInfo()
    }
    
    if (date === "today") {
        changeable = true
        date = new Date(Date.now())
        date = [date.getDate(), date.getMonth()+1,date.getFullYear()].join('-')
    }
    const getDateInfo = (userID, date) => {
        setDayInfo(userManager.getDayInfoForUser(userID, date))
    }
    useEffect(() => {
        getDateInfo(userID, date)
    }, [])

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
            <div>Date - {dayInfo.date}</div>
            <MealsList meals={dayInfo.meals} add={openMealModal} changeable={changeable}/>
            <ExercisesList exercises={dayInfo.exercises} add={openExerciseModal} changeable={changeable}/>
        </div> 
     );
}

export default DayPage;