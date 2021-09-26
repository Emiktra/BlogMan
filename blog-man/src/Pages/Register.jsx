// export const Register2 = () => {
// const DeleteUser =()=>{
//         user.delete().then(() => {setUser();})
//             .catch((error) => {
//             // An error ocurred
//             // ...
//           });
//     }

//     const SignOut=()=>{
//         firebase.auth().signOut().then(() => {setUser();})
//         .catch((error) => {
//             // An error happened.
//         });
//     }
      

//     return (
//         <div>
//           <div>
//             <form style={{display:"flex", flexFlow:"column nowrap"}}>
//             <h1>Create User</h1>
//               <label htmlFor="email">Email</label>
//               <input onClicktype="email" id="email" name="email" required/>
//               <label htmlFor="password">Password</label>
//               <input type="password" id="password" name="password" required/>
//               <button type="submit">Create User</button>
//               </form>
//           </div>
//           <div>
//             <div>
//                 {user? JSON.stringify(user.email):null}
//             </div>
//             {user ? null : <button onClick={signInUser}>Sign In</button>}
//             {user ? <button onClick={SignOut}>Sign Out</button> : null}
//             <button onClick={checkConnection}>CheckConnection</button>
//             {user ? <button onClick={DeleteUser}>DeleteUser</button> : null}
//           </div>
//         </div>
//     )
// }



import React,{ useContext } from 'react';
import AuthContext from '../Contexts/AuthContext';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const submitValues = {email: "",   password: "", name: "",};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email required"),
  password: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Password required")
    .min(6, 'Password must be longer than 6 characters'),
  name: Yup.string()
    .max(15, "Name cannot be longer than 15")
    .required("Name is required")
});

export const Register = () => {
    const {user, setUser} = useContext(AuthContext);

    const registerUser = (initialValues) => {
      let auth = getAuth()
      createUserWithEmailAndPassword(auth, initialValues.email, initialValues.password)
        .then((userCredential) => {setUser(userCredential.user)})
        .catch((error) => {
          // const errorCode = error.code;
          // const errorMessage = error.message;
        });
      }

    return (
        <div>
        <h1>Register</h1>
      <Formik
        className="container"
        initialValues={submitValues}
        onSubmit={registerUser}
        validationSchema={validationSchema}
      >
        <Form className="formStyle">
          <ErrorMessage name="email"/>
          <ErrorMessage name="password" />
          <ErrorMessage name="name" />

          <label htmlFor="email">Email</label>
          <Field type="text" className="email" name="email" />
          
          <label htmlFor="password">Password</label>
          <Field type="password" className="password" name="password" />
          
          <label htmlFor="name">Name</label>
          <Field type="text" className="name" name="name" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      </div>
    )
}