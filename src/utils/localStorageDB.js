export function dounloadLocalStorage() {
    if (localStorage.typeOfExercises && localStorage.users) {
        return
    }
    const users = {}
    users["1"] = {
        login: "dmitry",
        password: "123",
        daysArray: [
            {
                date: "22.08.2023",
                exercises: [
                    {
                        type: "abs",
                        time: 30,
                    },
                    {
                        type: "push",
                        time: 20
                    }
                ],
                meals: [
                    {
                        type: "fried chicken",
                        amount: 0.3,
                        calories: 300
                    }
                ]
            }
        ]
    }
    const typeOfExercises = [
        {
            type: "abs",
            caloriesPerHour: 300
        },
        {
            type: "push",
            caloriesPerHour: 500
        }
    ]

    localStorage.typeOfExercises = JSON.stringify(typeOfExercises)
    localStorage.users = JSON.stringify(users)
}

function getUsers() {
    const users = JSON.parse(localStorage.users)
    return users
}

export function authentication (login, password) {
    const users = getUsers()
    for (let id of Object.keys(users)){
        if (users[id].login === login) {
            if (users[id].password == password) {
                return id
            }
        }
    }
    return undefined
}