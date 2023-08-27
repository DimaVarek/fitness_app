import React from 'react'; // Import React for React.Fragment
import Exercise from "./Exercise";

function ExercisesList({exercises, add, changeable}) {
    return (
        <div className="exercises-list">
            <div className="exercises-container">
                {
                    exercises
                        ? exercises.map((exercise, index) => (
                            <React.Fragment key={index}>
                                <Exercise exercise={exercise} />
                                <br/>
                            </React.Fragment>
                        ))
                        : "You need to do exercises"
                }
            </div>
            <div>
                {changeable ? <button  onClick={add}>Add</button> : ""}
            </div>
        </div>
    );
}

export default ExercisesList;
