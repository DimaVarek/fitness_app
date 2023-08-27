function Exercise({exercise}) {
    return (
        <div className="exercise">
            <div>Name: {exercise.type}</div>
            <div>Calories per minute: {exercise.calories}</div>
            <div>Time: {exercise.time} min</div>
        </div>
    );
}

export default Exercise;