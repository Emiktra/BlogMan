import React, {useState} from 'react'
import app from '../firebase'
import { useAuth } from '../Contexts/AuthContext'
import firebase from "firebase/app"
import "firebase/auth";
import "firebase/firestore"

export const Register = () => {
    const [user, setUser] = useState("asdasd");

    const createUser =()=>{
        firebase.auth().createUserWithEmailAndPassword("aha@gmail.com", "staticAF")
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        setUser(userCredential.user)
        console.log(user)
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
      });
    }

    const DeleteUser =()=>{
        user.delete().then(() => {
            // User deleted.
          }).catch((error) => {
            // An error ocurred
            // ...
          });
    }

    const SignOut=()=>{
        

        firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }
    const checkConnection=()=>{
            firebase.auth().onAuthStateChanged(() => {
            if (user) {
              console.log("You are connected")
              // ...
            } else {
                console.log("negative")
            }
          });
    }

    return (
        <div>
            <div>
                {user? JSON.stringify(user.email):null}
            </div>
            <button onClick={createUser}>Create User</button>
            <button onClick={SignOut}>Sign Out</button>
            <button onClick={checkConnection}>CheckConnection</button>
            <button onClick={DeleteUser}>DeleteUser</button>
        </div>
    )
}
