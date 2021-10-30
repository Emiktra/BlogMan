import React, { useState, useContext } from 'react'
import { useHistory } from "react-router-dom";
import CWLogo from "../Assets/cw.jpeg"
import AuthContext from '../Contexts/AuthContext';
import { MenuItem, Menu, } from '@material-ui/core';
import { getAuth, signOut } from "firebase/auth";
import styled from "styled-components"

// Styles
const NavBar = styled.div`
        background-color: #72aad8;
        width: 100%;
        height: 70px;
        display: flex;
        position: sticky;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 0 4px 2px #00000061;
    `
const HomeLogoContainer = styled.a`
        margin-left: 10px;
        width: 60px;
    `
const HomeLogo = styled.img`
        width: 50px;
        height: 50px;
        padding: 5px;
        transition: 200ms;
        cursor: pointer;
        &:hover{
            background-color: rgba(0,0,0,0.15);
            border-radius: 50px;
        }
    `
const MainLogoContainer = styled.div`
        user-select: none;
        color: #ffffff;
        -ms-user-select: none;
        background-color: #72aad8;
        border-radius: 10px;
        padding: 0 15px;
        height: 60px;
        cursor: pointer;
        align-items: center;
        display: flex;
    `
const MainLogo = styled.h3`
        font-weight: 500;
        letter-spacing: 1.5px;
        font-style: italic;
        font-size: 35px;
        
        font-family: 'Courier New', Courier, monospace;
    `
const MainLogoPic = styled.i`
        font-size: 50px;
        margin-right: 15px;
    `
const UserDropDownContainer = styled.div`
        margin-right: 10px;
        align-items: center;
        flex-flow: row nowrap;
        justify-content: space-between;
        display: flex;
    `
const UserDropDown = styled.i`
        font-size: 24px;
        color: #fff;
        border-radius: 50%;
        padding: 0;
        transition: 50ms;
        cursor: pointer;
        margin: 10px;
        &:hover{
            background-color: rgba(0,0,0,0.05);
            padding: 10px;
            margin: 0;
        }
        &:active{
            background-color: rgba(0,0,0,0.10);
            padding: 10px
        }
    `
const AddNewBlogBtn = styled.i`
    font-size: 24px;
    color: #fff;
    border-radius: 50%;
    transition: 50ms;
    cursor: pointer;
    margin: 10px 20px 10px 10px;
    &:hover{
        background-color: rgba(0,0,0,0.05);
        padding: 10px;
        margin: 0 10px 0 0;
    }
    &:active{
        background-color: rgba(0,0,0,0.10);
        padding: 10px
    }
`

export const Header = () => {
    const { user, setUser } = useContext(AuthContext);
    let history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenu = (event) => { setAnchorEl(event.currentTarget) };
    
    const handleSignOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {setUser(null)})
        .then(()=>{history.push("/login")})
        .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        });
    }

    return (
        <NavBar>
            <HomeLogoContainer onClick={() => { history.push('/') }}>
                <HomeLogo src={CWLogo} />
            </HomeLogoContainer>
            <MainLogoContainer>
                <MainLogoPic className="fas fa-chess-king"/>
                <MainLogo>BlogMan</MainLogo>
            </MainLogoContainer>
            <UserDropDownContainer>
                {user ? <AddNewBlogBtn onClick={()=>{history.push("/createBlog")}} className="far fa-plus-square"/>
                :null}
                <UserDropDown className="fas fa-user-circle" onClick={handleMenu}/>
                <Menu
                    anchorEl={anchorEl}
                    onClick={()=>{setAnchorEl(null)}}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right"
                    }}
                    open={Boolean(anchorEl)}
                >
                {user ?
                <div>
                <MenuItem onClick={() => { history.push("/profile") }}>Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                </div>
                :
                <div>
                <MenuItem onClick={() => { history.push("/register") }}>Register</MenuItem>
                <MenuItem onClick={() => { history.push("/login") }}>Sign In</MenuItem>
                </div>
                }
                </Menu>
            </UserDropDownContainer>
        </NavBar>
    )
}
