function Meal({meal}) {
    return ( 
        <div className="meal">
            <div>Name: {meal.type}</div>
            <div>Amount: {meal.amount} kg</div>
            <div>Calories: {meal.calories} </div>
        </div>
     );
}

export default Meal;