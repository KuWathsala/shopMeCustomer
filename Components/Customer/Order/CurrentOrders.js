import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity ,TextInput} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import CurrentOrderList from './CurrentOrderList';
import {connect} from 'react-redux';

class CurrentOrders extends Component {

  //static navigationOptions = { header: null };

  constructor(props){
    super(props);
    this.state={
        currentOrdersData: [],
        arr: []
    }
  }

  componentDidMount(){
    axios.post(`https://backend-webapi20190825122524.azurewebsites.net/api/orders/getAllOrderDetailsByCustomer/${parseInt(this.props.customer.userId)}`) //backend-webapi20190825122524.azurewebsites.net
    .then(response=>{
        this.setState({currentOrdersData: response.data})
        console.log(this.state.currentOrdersData)
    })
    .catch(error=>{console.log(error)})
  }

  render () {
        let list=<CurrentOrderList data={this.state.currentOrdersData} navigation={this.props.navigation} />;
        
        if(this.state.currentOrdersData.length!=0)
            return (<View style={{flex: 1,flexDirection:'column'}}>{list}</View>);
        else
            return( <View style={{flex: 1,flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                        <Icon style={styles.icon} name="md-clipboard" size={100} color="gray" />
                        <Text>Currently there are no orders</Text>
                    </View> 
            );
  }
}

const mapStateToProps=state=>{
  return {
    customer: state.auth,
  };
}

export default connect(
  mapStateToProps,{}
)(CurrentOrders);


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
});
