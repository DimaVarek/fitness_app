import Meal from "./Meal";

function MealsList({meals, add, changeable}) {
    return ( 
        <div className="meals-list">
            <div className="meals-container">
                {meals? meals.map(meal => <Meal meal={meal} key={Math.random()}/>): "You should eat something"}
            </div>
            <div>
                {changeable? <button  onClick={add}>Add</button>: ""}
            </div>
        </div>
     );
}

export default MealsList;