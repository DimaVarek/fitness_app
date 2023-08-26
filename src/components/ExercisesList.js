import Exercise from "./Exercise";

function ExercisesList({exercises, add, changeable}) {
    return ( 
        <div className="exercises-list">
            <div className="exercises-container">
                {exercises? exercises.map(exercise => <Exercise exercise={exercise} key={Math.random()}/>): "You need to do exercises"}
            </div>
            <div>
                {changeable? <button  onClick={add}>Add</button>: ""}
            </div>
        </div>
     );
}

export default ExercisesList;