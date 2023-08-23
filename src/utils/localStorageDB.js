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
}

export const userManager = new UserManager();
