import React from 'react'; // Import React for React.Fragment
import Meal from "./Meal";

function MealsList({meals, add, changeable}) {
    return (
        <div className="meals-list">
            <div className="meals-container">
                {
                    meals
                        ? meals.map((meal, index) => (
                            <React.Fragment key={index}>
                                <Meal meal={meal} />
                                <br/>
                            </React.Fragment>
                        ))
                        : "You should eat something"
                }
            </div>
            <div>
                {changeable ? <button onClick={add}>Add</button> : ""}
            </div>
        </div>
    );
}

export default MealsList;
