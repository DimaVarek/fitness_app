import logo from './logo.svg';
import './App.css';
import LoginPage from './components/LoginPage';
import { useEffect, useState } from 'react';
import { dounloadLocalStorage } from './utils/localStorageDB';

function App() {
  // here should be token
  // let [token, setToken] = useState()
  let [userId, setUserId] = useState()

  useEffect(() => {
    dounloadLocalStorage();
  }, [])

  const exitEvent = () => {
    setUserId(undefined)
  }

  if (!userId) {
    return (
      <LoginPage setUserId={setUserId} />
    )
  }
  return (
    <div>
      <div>some</div>
      <button onClick={exitEvent}>Exit</button>
    </div>
  );
}

export default App;
