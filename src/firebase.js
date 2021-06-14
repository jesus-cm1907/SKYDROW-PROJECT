import firebase from 'firebase'

 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCC31s43eVlSvRPUYykEp_dQohr8su-c4A",
    authDomain: "linkedin-947f8.firebaseapp.com",
    projectId: "linkedin-947f8",
    storageBucket: "linkedin-947f8.appspot.com",
    messagingSenderId: "837452451426",
    appId: "1:837452451426:web:68f413db71f425cd7f8b3b",
    measurementId: "G-V7BHFKNP3L"
  };
  // Initialize Firebase
  const firebaseApp= firebase.initializeApp(firebaseConfig);
  firebase.analytics();





const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()


export { db, auth, storage }