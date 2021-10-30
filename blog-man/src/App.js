import { AppRouter } from './App Router/AppRouter';
import './App.css';
import { useEffect, useState } from "react";
import AuthContext from './Contexts/AuthContext'
import { getAuth, onAuthStateChanged } from '@firebase/auth'
import { useHistory } from 'react-router';
import CustomToastify from './Helpers/CustomToastify';

function App() {
  const [user, setUser] = useState(null);
  const [userValue, setUserValue] = useState(null);
  const [themeDark, setThemeDark] = useState(true)
  //  TODO: dark theme choice

  const setInfos = ()=>{
    setUserValue({date: new Date(getAuth().currentUser.metadata.creationTime),
      photo: getAuth().currentUser.photoURL})
    localStorage.setItem("creationDate", userValue.date.toLocaleDateString());
    localStorage.setItem("photoURL", userValue.photo);
  }
  const history = useHistory();

    //  Was user logged in last time?
    const auth = getAuth();
    useEffect(() => {onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user)
            setUserValue({date: Date(user.metadata.creationTime),photo: user.photoURL});
        } else {
          CustomToastify.info("You are logged out")
            history.push("/")
        }
    });}, [])


  return (
      <AuthContext.Provider value={{   user, setUser, userValue, setUserValue, setInfos, themeDark, setThemeDark }}>
        <AppRouter/>
      </AuthContext.Provider>
  );
}

export default App;
