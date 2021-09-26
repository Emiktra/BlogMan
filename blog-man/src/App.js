import { AppRouter } from './App Router/AppRouter';
import './App.css';
import { useState } from "react";
import AuthContext from './Contexts/AuthContext'

function App() {
  const [user, setUser] = useState(null)

  return (
      <AuthContext.Provider value={{   user, setUser   }}><div className="App">
        <AppRouter/>
      </div></AuthContext.Provider>
  );
}

export default App;
