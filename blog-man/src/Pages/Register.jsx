import React, { useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import { getAuth, createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components"
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField } from '@material-ui/core';
import BlogLogo from "../Assets/blok.png"
import { useHistory } from 'react-router';
import firebase from '../Helpers/firebase';

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
const RegisterContainer = styled.div`
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
const RegisterTitle = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-weight: 600;
  font-size: 35px;
  color: #212121;
`

const validationSchema = Yup.object({
  email: Yup
    .string("Enter your email")
    .email("Invalid Email")
    .required("Email required"),
  password: Yup
    .string("Enter your password")
    .max(15, "Must be 15 characters or less")
    .required("Password required")
    .min(6, 'Password must be longer than 6 characters'),
  name: Yup
    .string("What should we call you")
    .max(15, "Name cannot be longer than 15")
    .required("Name is required")
    .min(3, 'Must contain at least 3 characters'),
  photoURL: Yup
    .string("Enter Your Profile Pics URL")
});

export const Register = () => {
  const { user, setUser, userValue,  setUserValue, setInfos } = useContext(AuthContext);
  const history = useHistory();
  const formik = useFormik({
    initialValues: { email: "", password: "", name: "", photoURL: "", },
    validationSchema: validationSchema,
    onSubmit: (initialValues) => {
      let auth = getAuth()
      createUserWithEmailAndPassword(auth, initialValues.email, initialValues.password)
        .then((userCredential) => { setUser(userCredential.user) })
        .then(()=>{updateProfile(auth.currentUser, { displayName: initialValues.name, photoURL: initialValues.photoURL})})
        .then(()=>{history.push("/")})
        .then(setInfos)
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

        });
    },
  });

  const LoginInUsingGoogle = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth()
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        setUser(result.user)
        setInfos()
        history.push("/")
      }).catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  
  return (
    <HomeStyle>
      <RegisterContainer>
        <div><img src={BlogLogo} style={{ userSelect: "none" }} /></div>
        <RegisterTitle>Register</RegisterTitle>
        <FormContainer onSubmit={formik.handleSubmit}>

          <TextField sx={{ marginTop: "20px", width: "400px" }} type="text"
            onChange={formik.handleChange}
            className="name" name="name" label="Name" variant="outlined"
            helperText={formik.touched.name && formik.errors.name}
            error={formik.touched.name && Boolean(formik.errors.name)} />

          <TextField sx={{ m: "20px 0", width: "400px" }} type="text"
            onChange={formik.handleChange}
            className="email" name="email" label="Email" variant="outlined"
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)} />

          <TextField sx={{ marginBottom: "20px", width: "400px" }} className="password"
            onChange={formik.handleChange}
            name="password" type="password" label="Password" variant="outlined"
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password} />

          <TextField sx={{ marginBottom: "20px", width: "400px" }} className="photoURL"
            onChange={formik.handleChange}
            name="photoURL" type="text" label="Profile picture URL" variant="outlined"
            error={formik.touched.photoURL && Boolean(formik.errors.photoURL)}
            helperText={formik.touched.photoURL && formik.errors.photoURL} />

          <Button sx={{ p: "7px 30px" }} variant="contained" type="submit">Register</Button>
        </FormContainer>
        <Button sx={{marginTop: "20px"}} variant="outlined" onClick={LoginInUsingGoogle}>Login with Google</Button>
      </RegisterContainer>
    </HomeStyle>
  )
}