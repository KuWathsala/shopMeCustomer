import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity ,Dimensions, ScrollView,  RefreshControl} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import axios from 'axios';
import CurrentOrderList from './CurrentOrderList';
import {connect} from 'react-redux';
import baseURL from '../../Base';
class CurrentOrders extends Component {

  //static navigationOptions = { header: null };

  constructor(props){
    super(props);
    this.state={
        currentOrdersData: [],
        arr: [],
        refreshing: false,
        id: parseInt(this.props.customer.userId)
    }
  }

  componentDidMount(){
    this.refresh();
  }

  fetchData=async()=>{
    this.setState({refreshing: true})
    axios.post(`${baseURL}/api/orders/getAllOrderDetailsByCustomer/${this.state.id}`) //backend-webapi20190825122524.azurewebsites.net
    .then(response=>{
        this.setState({currentOrdersData: response.data})
        this.setState({refreshing: false})
        console.log(response.data, this.state.refreshing )
    })
    .catch(error=>{console.log(error),this.setState({refreshing: false})})
  }

  refresh(){
    this.setState({refreshing: true});
    this.fetchData();
  }

  render () {
        let list=<CurrentOrderList data={this.state.currentOrdersData} navigation={this.props.navigation} />;

        let loading=<View  style={{flex: 1,flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                      <Icon style={styles.icon} name="md-refresh" size={70} color="gray" />
                    </View>;
        
        let empty=<View  style={{flex: 1,flexDirection:'column', justifyContent: 'center', alignItems:'center', marginTop: 40}}>
                    <Icon style={styles.icon} name="md-clipboard" size={80} color="gray" />
                    <Text>Currently there are no orders</Text>
                  </View>;

        let data=<View style={{flex: 1,flexDirection:'column'}}>{list}</View>;

        let view= (this.state.refreshing) ? loading : (this.state.currentOrdersData.length!=0) ? data : empty ; 
         return ( <ScrollView refreshControl={<RefreshControl  refreshing={this.state.refreshing} onRefresh={this.refresh.bind(this)}/>}>
                    {view}
                  </ScrollView>
        );
  }
}

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

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
  icon: {
    marginTop: widthScreen/2+40
  }
});
