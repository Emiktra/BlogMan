import React, { useContext } from 'react'
import App from '../App'

const AuthContext = React.createContext()

export const useAuth =()=>{
    return useContext(AuthContext)
}

export const AuthProvider = ({children}) => {
    return (
        <AuthContext.Provider value={{
            apple: 45,
        }}>
            <App/>
            {children}
        </AuthContext.Provider>
    )
}
