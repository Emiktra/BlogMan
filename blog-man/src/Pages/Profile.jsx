import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import AuthContext from '../Contexts/AuthContext';
import styled from "styled-components"
import firebase from '../Helpers/firebase';
import { Button, Switch } from '@material-ui/core';
import { getAuth, deleteUser, sendPasswordResetEmail } from "firebase/auth";
import CustomToastify from '../Helpers/CustomToastify';
import { ToastContainer } from 'react-toastify';
import NoData from "../Assets/placeholder.png"

const BackgroundContainer = styled.div`
    min-height: 100vh;
    padding: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    flex-flow: column nowrap;
    overflow: hidden;
    align-items: center;
    background-color: #fff;
    `
const ProfilePage = styled.div`
        background-color: #fff;
        min-width: 500px;
        width: 700px;
        box-shadow: 1px 1px  5px 0 gray;
        border-radius: 10px;
        margin-top: 70px;
        height: min-content;
        text-align: start;
        padding: 10px 30px;
    `
const InfoPageTitle = styled.h3`
    font-size: 18px;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const List = styled.div`
    display: flex;
    flex-flow: column nowrap;
`
const ListContainer = styled.ul`
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin: 10px 0;
`
const ListElements = styled.li`
    list-style: none;
    font-size: 14px;
    font-weight: 400;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`
const ListElementsTitle = styled.h2`
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    list-style: none;
    font-size: 14px;
    font-weight:300;
    color: #797979;
    margin: 0;
    width: 150px;
`
const ProfilePic = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin: 5px 0;
`

export const Profile = () => {
    const { user, setUser, userValue, setUserValue } = useContext(AuthContext);
    let history = useHistory();

    const DeleteAccount = () => {
        deleteUser(user)
            .then(() => { setUser(null) })
            .then(() => { setUserValue(null) })
            .then(()=>{CustomToastify.success("Account deleted")})
            .catch(() => {CustomToastify.warn("Session expired. Relogin to delete account")});
    }

    const ResetPassword = () => {
        sendPasswordResetEmail(getAuth(), user.email)
            .then(() => {CustomToastify.success("Verification email sent")})
            .catch((error) => {
                // const errorCode = error.code;
                // const errorMessage = error.message;
            });
    }

    const displayDate = ()=>{
        if(!userValue === null) {return userValue.date.toLocaleDateString()}
        else if(localStorage.getItem("creationDate"))
            {return localStorage.getItem("creationDate")}
        return "missing info";
    }

    const displayPhoto = ()=>{
        try {return user.photoURL}
        catch{
            if(!userValue === null) {return userValue.photo}
            else if(localStorage.getItem("photoURL")) 
            {return localStorage.getItem("photoURL")}
            return NoData
        }
    }


    return (
        <BackgroundContainer>
            <ToastContainer/>
            <ProfilePage>
                <InfoPageTitle>Personal Info</InfoPageTitle>
                <List>
                    <ListContainer>
                        <ListElementsTitle>Email:</ListElementsTitle>
                        <ListElements>{user ? user.email : null}</ListElements>
                    </ListContainer>
                    <ListContainer>
                        <ListElementsTitle>Name:</ListElementsTitle>
                        <ListElements>{user ? user.displayName : null}</ListElements>
                    </ListContainer>
                    <ListContainer>
                        <ListElementsTitle>Account created in:</ListElementsTitle>
                        <ListElements>{displayDate()}</ListElements>
                    </ListContainer>
                </List>
            </ProfilePage>
            <ProfilePage>
                <InfoPageTitle>General Info</InfoPageTitle>
                <List>
                    <ProfilePic src={displayPhoto()} alt="profilePic" /> 
                    <ListContainer>
                        <ListElementsTitle>Likes:</ListElementsTitle>
                        <ListElements>2854</ListElements>
                    </ListContainer>
                    <ListContainer>
                        <ListElementsTitle>Shares:</ListElementsTitle>
                        <ListElements>176</ListElements>
                    </ListContainer>
                    <ListContainer>
                        <ListElementsTitle>Posts:</ListElementsTitle>
                        <ListElements>24</ListElements>
                    </ListContainer>
                </List>
            </ProfilePage>
            <ProfilePage>
                <InfoPageTitle>Settings</InfoPageTitle>
                <List>
                    <ListContainer style={{ display: "flex", justifyContent: "space-between" }}>
                        <ListElementsTitle>Dark Mode:</ListElementsTitle>
                        <Switch disabled/>
                    </ListContainer>
                    <ListContainer style={{ display: "flex", justifyContent: "space-between" }}>
                        <ListElementsTitle>Reset Password:</ListElementsTitle>
                        <Button sx={{ width: "100px" }} variant="contained" color="warning" onClick={ResetPassword}>Reset</Button>
                    </ListContainer>
                    <ListContainer style={{ display: "flex", justifyContent: "space-between" }}>
                        <ListElementsTitle>Delete Account:</ListElementsTitle>
                        <Button sx={{ width: "100px" }} variant="contained" color="error" onClick={DeleteAccount}>Delete</Button>
                    </ListContainer>
                </List>
            </ProfilePage>
        </BackgroundContainer>
    )
}
