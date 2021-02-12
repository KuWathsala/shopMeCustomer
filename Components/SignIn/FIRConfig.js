import firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBftXwSIWKDqf-43sDqXi-XkVbEnUo1CFo",
  authDomain: "shopmecustomer-demo.firebaseapp.com",
  projectId: "shopmecustomer-demo",
  storageBucket: "shopmecustomer-demo.appspot.com",
  messagingSenderId: "226013215024",
  appId: "1:226013215024:web:7fce22194f3e4fe040f0f5",
  measurementId: "G-SY0Q13NP2W"
};

const FIRConfig = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

//export {FIRConfig}