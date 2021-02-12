import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView,StyleSheet,ScrollView,View,Text,StatusBar,Button,} from 'react-native';
import { Header,Colors,} from 'react-native/Libraries/NewAppScreen';
import {GoogleSignin,GoogleSigninButton,statusCodes,} from 'react-native-google-signin';
import firebase from 'firebase';
import {WEB_CLIENT_ID} from '../Base';
import {FIRConfig} from './FIRConfig';
import {connect} from 'react-redux';
import {auth} from '../Customer/Redux/Actions/Auth';
import CustomerTab from '../Customer/Tab/Tab';
//import auth from '@react-native-firebase/auth'
//import firebase from '@react-native-firebase/app';


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

// const increment = ()=>{
//   setIncrementValue(incrementValue+1);
// }

// const increment = useCallback(
//   ()=>setIncrementValue(incrementValue+1), 
//   [incrementValue]
// );

const firebasesignin = (props) => {
  console.log("firebasesignin")
  
  //state
  const [loggedIn, setloggedIn] = useState(false);
  const [user, setUser] = useState([]);

  signIn = useCallback(
    async () => {
    try {
      console.log("try");
      await GoogleSignin.hasPlayServices();

      const userDetails = await GoogleSignin.signIn();

      //setloggedIn(true);
      
      const credential = firebase.auth.GoogleAuthProvider.credential(
        userDetails.idToken
      );

      const user = {
        userToken: userDetails.idToken,
        userDetails: userDetails.user
      }

      await props.auth(user);
      await firebase.auth().signInWithCredential(credential);
      //const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
      //console.log(subscriber)
    } catch (error) {
      alert(error.message);
    }
  },[]);

  

  function onAuthStateChanged(user) {
    //setUser(user);
    //console.log(user);
    //setloggedIn(user ? true : false)
  }

  setupGoogleSignin = async () => {
    try {
      console.log("setupGoogleSignin")
      await GoogleSignin.hasPlayServices//({ autoResolve: true });
      await GoogleSignin.configure({
        //iosClientId: Constants.GOOGLE_LOGIN_CLIENT_ID_IOS,
        webClientId: WEB_CLIENT_ID,//'226013215024-m20igc14ri3n7sku796ncdl12n61k5d3.apps.googleusercontent.com',
        offlineAccess: true
      });
      
    } catch (err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

  useEffect(() => {
    // console.log("change state")
    // await GoogleSignin.configure({
    //   //iosClientId: Constants.GOOGLE_LOGIN_CLIENT_ID_IOS,
    //   webClientId: WEB_CLIENT_ID,//'226013215024-m20igc14ri3n7sku796ncdl12n61k5d3.apps.googleusercontent.com',
    //   offlineAccess: true
    // });

    // const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
    setupGoogleSignin();

  }, []);

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      firebase.auth().signOut().then(() => alert('Your are signed out!'));
      //setloggedIn(false);
      // setuserInfo([]);
    } catch (error) {
      console.error(error);
    }
  };

  if(props.auth.isSuccessed){
    return(<CustomerTab />);
  } else {
    return (
      <>
        {/* <StatusBar barStyle="dark-content" /> */}
        <View style={styles.container}>
          <View style={styles.googleSection}>
            {/* {!loggedIn && ( */}
              <GoogleSigninButton
                style={{width: 192, height: 48}}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={this.signIn}
              />
            {/* )} */}
          </View>
          {/* <View style={styles.buttonContainer}> */}
            {/* {!user && <Text>You are currently logged out</Text>}
            {user && (
              <View>
                <Text>Welcome {user.displayName}</Text>
                <Button
                  onPress={this.signOut}
                  title="LogOut"
                  color="red"></Button>
              </View>
            )} */}
          {/* </View> */}
        </View>
      </>
    );

  }
};


const mapStateToProps=state=>{
  return {
    signup: state.auth,
  };
}

export default React.memo(connect(mapStateToProps,{
  auth
})(firebasesignin));

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.lighter
  },
  googleSection: {
    bottom: 64,
    position:'absolute',
    alignSelf:'center'
  }
});