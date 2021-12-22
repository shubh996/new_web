import firebase from "firebase"

var FirebaseKeys = {
  apiKey: "AIzaSyD8kViPH8oEqU14ejdixldQnuMeVYzlKpk",
  authDomain: "b2cloud-c4da9.firebaseapp.com",
  databaseURL: "https://b2cloud-c4da9-default-rtdb.firebaseio.com",
  projectId: "b2cloud-c4da9",
  storageBucket: "b2cloud-c4da9.appspot.com",
  messagingSenderId: "345412401857",
  appId: "1:345412401857:web:03a7d6b6149593fb87b240",
  measurementId: "G-YMHQXRSXD3"
  };

 const keys =  firebase.initializeApp(FirebaseKeys);
 
 export default keys 
  
 

 