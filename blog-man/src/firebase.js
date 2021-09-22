import firebase from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp({
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID
apiKey: "AIzaSyDzuBAPSMcuvafeqcnzX-gIncfcqiOGn-U",
  authDomain: "blog-man-87ec7.firebaseapp.com",
  projectId: "blog-man-87ec7",
  storageBucket: "blog-man-87ec7.appspot.com",
  messagingSenderId: "1097101258777",
  appId: "1:1097101258777:web:1ee491d0099272bf6e3a88"
});

export default app;


// import firebase from "firebase/app";
// import "firebase/database";
// const devConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
// };
// const prodConfig = {};
// const firebaseConfig = process.env.NODE_ENV === "development" ? devConfig : prodConfig;
// firebase.initializeApp(firebaseConfig);
// export default firebase;