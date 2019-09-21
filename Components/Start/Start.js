import React,{Component} from "react";
import { View, Text, Dimensions, Image, StyleSheet, ActivityIndicator} from "react-native";

export default class Start extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={{fontSize: 70,color: '#26bf63',fontWeight:'400', marginTop: '65%', fontWeight:'bold', }}>
                    shop
                    <Text style={{color: '#5189c9',}}>
                        Me
                    </Text>
                </Text>

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
