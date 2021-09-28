import React, { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext';
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import BlogLogo from "../Assets/blok.png"
import { useHistory } from 'react-router';
import firebase from "../Helpers/firebase"
import {toast, ToastContainer} from "react-toastify"         
import "react-toastify/dist/ReactToastify.css"

const validationSchema = Yup.object({
  email: Yup
    .string("Enter your email")
    .email("Invalid email")
    .required("Email required"),
  password: Yup
    .string("Enter your password")
    .required("Password required"),
});

// Styles
const HomeStyle = styled.div`
  background-image: url('https://picsum.photos/1920/1080');
  min-height: 100vh;
  margin: 0;
  background-repeat: no-repeat;
  background-size: cover;
  padding-top: 1px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`
const LogInContainer = styled.div`
  background-color: #fff;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin-top: 100px;
  padding: 20px 40px;
  border-radius: 5px;
`
const FormContainer = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
`
const SignInTitle = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #212121;
`

export const SignIn = () => {
  const context = useContext(AuthContext);
  const history = useHistory();

  const LoginInUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        context.setUser(result.user)
        history.push("/")
        context.setInfos()
        // toast.success('Signed in using Google');
      }).catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;

        // // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const formik = useFormik({
    initialValues: { email: "", password: "", },
    validationSchema: validationSchema,
    onSubmit: (initialValues) => {
      signInWithEmailAndPassword(getAuth(), initialValues.email, initialValues.password)
      .then(()=>{history.push("/")})
      .then((userCredential) => {context.setUser(userCredential.user)})
      .then(context.setInfos)
      .catch((error) => {
        if (error.code === "auth/user-not-found"){toast.error("User not found")}
        if (error.code === "auth/wrong-password"){toast.error("Invalid Password")}
      });
    },
  });
  return (
    <HomeStyle>
      <ToastContainer limit={1}/>
      <LogInContainer>
        <div><img src={BlogLogo} style={{ userSelect: "none" }} alt='BlogLogo'/></div>
        <SignInTitle>Sign in</SignInTitle>
        <FormContainer onSubmit={formik.handleSubmit}>
          <TextField sx={{ marginTop: "20px", width: "400px" }} type="text"
            onChange={formik.handleChange}
            className="email" name="email" label="Email" variant="outlined"
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)} />

          <TextField sx={{ m: "20px 0", width: "400px" }} className="password"
            onChange={formik.handleChange}
            name="password" type="password" label="Password" variant="outlined"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password} />

          <Button sx={{ p: "7px 30px" }} variant="contained" type="submit">Login</Button>
        </FormContainer>
        <Button sx={{marginTop: "20px"}} variant="outlined" onClick={LoginInUsingGoogle}>Login with Google</Button>
      </LogInContainer >
    </HomeStyle>
  )
}