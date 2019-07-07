import React,{Component} from "react";
import { View, Text, Dimensions, Image, StyleSheet, ActivityIndicator} from "react-native";

export default class Start extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text} >shopMe</Text>
                <ActivityIndicator
                    animating={true} 
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
        fontSize: 50,
        fontWeight: 'normal',
        margin: 20,
        color:'green'
    },
});
