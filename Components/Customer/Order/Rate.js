import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Modal} from 'react-native';
import {Rating} from 'react-native-ratings';

export default class Rate extends Component {

    ratingCompleted(rating) {
        console.log("Rating is: " + rating)
    }

    constructor(props){
        super(props)
    } 

    render () {
    return ( 
        <Modal style={styles.container}>
            <Rating
                showRating
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10 }}
            />
            <TouchableOpacity
                onPress={() => {
                  //this.setModalVisible(!this.state.modalVisible);
                  this.props.navigation.navigate('CurrentOrders')
                }}>
                <Text>Ok</Text>
              </TouchableOpacity>
        </Modal>  
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
  
    }
})
