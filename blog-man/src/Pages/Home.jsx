import React, { useContext} from 'react'
import AuthContext from '../Contexts/AuthContext'
import { toast, ToastContainer } from 'react-toastify'
import firebase from '../Helpers/firebase'
import { useHistory } from 'react-router'

export const Home = () => {
    const { user, setUser } = useContext(AuthContext)
    const history = useHistory()

    return (
        <div>
            <ToastContainer containerId="HomeToastContainer"/>

        </div>
    )
}
