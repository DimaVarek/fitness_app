import { useState } from "react"
import { authentication } from "../utils/localStorageDB"

export default function ({setUserId}) {
    let [userName, setUserName] = useState()
    let [password, setPassword] = useState()

    const submit = () => {
        let userId = authentication(userName, password)
        if (userId) {
            setUserId(userId)
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
                        <button type="submit" onClick={submit}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}