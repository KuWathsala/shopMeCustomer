import React, {Component} from 'react';
import {Text,View,StyleSheet,Button,Image} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class Order extends Component {

    static navigationOptions=({navigation}) => {
        let tabBarLabel='Order';
        let tabBarIcon=()=>(
          <Icon name="md-book" size={37} />
            //<Image style={styles.icon} source={require('../../Assets/imageOrder.png')}/>
        );
        return {tabBarIcon, tabBarLabel}
    }

    render () {
    return (
        <View style={styles.container}>
            <Text>Order Screen</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 27,
    height:27,
    tintColor: 'red'
  }
});