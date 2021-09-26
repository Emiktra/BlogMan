import React, { useContext } from 'react'
import AuthContext from '../Contexts/AuthContext';
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styled from 'styled-components'
import { Button, TextField } from '@material-ui/core';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import BlogLogo from "../Assets/blok.png"

const submitValues = { email: "", password: "", };

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email required"),
  password: Yup.string()
    .required("Password required"),
});

// Styles
const HomeStyle = styled.div`
  background-image: url('https://picsum.photos/1920/1080');
  height: 100vh;
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
  margin-top: 100px;
  padding: 20px 40px;
  border-radius: 5px;
`
const FormContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-evenly;
  align-items: center;
`

export const SignIn = () => {
  const { user, setUser } = useContext(AuthContext);

  const signInUser = (initialValues) => {
    let auth = getAuth()
    signInWithEmailAndPassword(auth, initialValues.email, initialValues.password)
      .then((userCredential) => { setUser(userCredential.user) })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  }

  return (
    <HomeStyle>
      <LogInContainer>
        <div><img src={BlogLogo} style={{userSelect:"none"}}/></div>
        <h1>Sign In</h1>
        <Formik
          className="container"
          initialValues={submitValues}
          onSubmit={signInUser}
          validationSchema={validationSchema}
        >
          <Form className="formStyle">
            <FormContainer>
              <div><ErrorMessage name="email" /></div>
              <div><ErrorMessage name="password" /></div>

              <TextField sx={{marginTop: "20px", width:"400px"}} type="text" className="email" name="email" label="Email" variant="outlined" />

              <TextField sx={{m: "20px 0", width:"400px"}} className="password" name="password" type="password" label="Password" variant="outlined" />

              <Button variant="contained" type="submit">Login</Button>
            </FormContainer>
          </Form>
        </Formik>
      </LogInContainer >
    </HomeStyle>
  )
}