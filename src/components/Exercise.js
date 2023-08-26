function Exercise({exercise}) {
    return ( 
        <div className="exercise">
            <div>Name: {exercise.type}</div>
            <div>Time: {exercise.time} min</div>
        </div>
     );
}

export default Exercise;