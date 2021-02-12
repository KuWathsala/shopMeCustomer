import React, { useState } from 'react';
import { Button, TextInput } from 'react-native';
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
  
if (!firebase.apps.length) {
firebase.initializeApp(firebaseConfig);
}

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    try {const confirmation = await firebase.auth().signInWithPhoneNumber(phoneNumber, null)
        setConfirm(confirmation);
    } catch (error) {
        console.log(error)
    }
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log('Invalid code.'+error);
    }
  }

  if (!confirm) {
    return (
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber('+94710337474')}
      />
    );
  }

  return (
    <>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
}