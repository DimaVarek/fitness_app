class UserManager {
    constructor() {
        if (UserManager.instance) {
            return UserManager.instance;
        }
        UserManager.instance = this;

        if (!this.loadDataFromLocalStorage()) {
            this.loadTestData();
        }
    }

    loadDataFromLocalStorage() {
        const users = localStorage.getItem('users');
        const typeOfExercises = localStorage.getItem('typeOfExercises');

        if (users && typeOfExercises) {
            this.users = JSON.parse(users);
            this.typeOfExercises = JSON.parse(typeOfExercises);
            return true;
        }
        return false;
    }

    saveDataToLocalStorage() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('typeOfExercises', JSON.stringify(this.typeOfExercises));
    }

    loadTestData() {
        this.users = {
            "1": {
                login: "dmitry",
                password: "123",
                daysArray: [
                    {
                        date: "27-08-2023",
                        exercises: [
                            {
                                type: "abs",
                                time: 5,
                                calories: 120
                            },
                            {
                                type: "push",
                                time: 0.5,
                                calories: 100
                            }
                        ],
                        meals: [
                            {
                                type: "fried chicken",
                                amount: 0.3,
                                calories: 1000
                            }
                        ]
                    },
                    {
                        date: "26-08-2023",
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
        };

        this.typeOfExercises = [
            {
                type: "abs",
                caloriesPerHour: 300
            },
            {
                type: "push",
                caloriesPerHour: 500
            }
        ];
        
        this.saveDataToLocalStorage();
    }

    getUsers() {
        return this.users;
    }

    getCurrentUser() {
        const currentUser = localStorage.getItem('currentuser');
        return currentUser
    }

    getUserById(userId) {
        return this.users[userId];
    }
    setCurrentUser(currentUser) {
        localStorage.setItem('currentuser', currentUser)
    }
    removeCurrentUser() {
        localStorage.removeItem('currentuser')
    }

    authentication(login, password) {
        for (let id of Object.keys(this.users)) {
            if (this.users[id].login === login) {
                if (this.users[id].password === password) {
                    return id;
                }
            }
        }
        return undefined;
    }

    getDayInfoForUser(userID, date) {
        return this.users[userID].daysArray.find(day => {
            return _isSameDates(date, day.date)
        })
    }

    addMeal(userID, date, name, amount, calories) {
        let index = this.users[userID].daysArray.findIndex(day => _isSameDates(day.date, date))
        if (index == -1){
            this.users[userID].daysArray.push(
                {
                    date: date,
                    exercises: [],
                    meals: [
                        {
                            type: name,
                            amount: amount,
                            calories: calories
                        }
                    ]
                }
            )
        }
        else {
            this.users[userID].daysArray[index].meals.push(
                {
                    type: name,
                    amount: amount,
                    calories: calories
                }
            ) 
        }
        this.saveDataToLocalStorage() 
    }
    addEx(userID, date, name, time, calories) {  // Added calories
        let index = this.users[userID].daysArray.findIndex(day => _isSameDates(day.date, date))
        if (index == -1){
            this.users[userID].daysArray.push({
                date: date,
                exercises: [{
                    type: name,
                    time: time,
                    calories: calories  // Added calories
                }],
                meals: []
            })
        }
        else {
            this.users[userID].daysArray[index].exercises.push({
                type: name,
                time: time,
                calories: calories  // Added calories
            })
        }
        this.saveDataToLocalStorage()
    }
    
}

function _isSameDates(date1, date2) {
    date1 = date1.split("-").map(num => parseInt(num))
    date2 = date2.split("-").map(num => parseInt(num))
    
    return date1[0] === date2[0] && date1[1] === date2[1] && date1[2] === date2[2]
    
}



export const userManager = new UserManager();
