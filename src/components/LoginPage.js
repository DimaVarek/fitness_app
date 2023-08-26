import { useState } from "react"
import { userManager as db } from "../utils/localStorageDB"
import { useNavigate } from "react-router-dom"

export default function ({loginEvent}) {
    let [userName, setUserName] = useState()
    let [password, setPassword] = useState()

    const navigate = useNavigate()

    const submit = (event) => {
        console.log('submit')
        event.preventDefault()
        let userId = db.authentication(userName, password)
        if (userId) {
            loginEvent(userId)
            navigate('/')
        }
    }

    return (
        <div className="password-page">
            <div className="login-wrapper">
                <h1>Please Log In</h1>
                <form>
                    <label>
                        <p>Username</p>
                        <input type="text" onChange={e => setUserName(e.target.value)}/>
                    </label>
                    <label>
                        <p>Password</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <div>
                        <button type="submit" onClick={(event) => submit(event)}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}