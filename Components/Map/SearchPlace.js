import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/Ionicons';
import Geocoder from 'react-native-geocoding';
import {fetchCustomerLocation} from '../Customer/Redux/Actions/locationActions';
import { connect } from 'react-redux';
import Map from './Map';
import Button from 'react-native-button';
import {Shops} from '../Menu/screenNames';
import Geolocation from 'react-native-geolocation-service';
import Geocode from 'react-native-geocoding';

Geocoder.init('AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM');

class SearchPlace extends React.Component{

  static navigationOptions = { header: null };
  
  constructor(props){
    super(props);  
  }

  componentDidMount(){
    console.log("SearchPlace");
    let address='';
    let latitude=0;
    let longitude=0;
    Geolocation.getCurrentPosition(
      position=> {
        latitude=position.coords.latitude;
        longitude=position.coords.longitude;
        console.log("position=>");
        console.log(position);
        Geocode.from(position.coords.latitude, position.coords.longitude)
        .then(json => {
          //console.log(json)
          address=json.results[0].formatted_address;
          this.props.fetchCustomerLocation(position.coords.latitude, position.coords.longitude, address);
        }).catch(error => console.log(error));
        this.props.fetchCustomerLocation(position.coords.latitude, position.coords.longitude, address);
      },
      error=> {this.setState({error: error.message }, console.log(error))},
      { enableHighAccuracy: false, timeout: 25000, }
      //{enableHighAccuracy: true}
    );
  }
  
  render(){
    const {latitude, longitude, address}=this.props.location.source; 
    return (
      <GooglePlacesAutocomplete style={{flexDirection: 'column', flex: 1}}
        placeholder="find that close to you"
        minLength={3}
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed='auto'  
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render

        onPress={(data, details = null) => { 
          this.props.location.source.latitude=details.geometry.location.lat,
          this.props.location.source.longitude=details.geometry.location.lng,
          this.props.location.source.address=details.formatted_address
          console.log(this.props.location.source);
          this.props.fetchCustomerLocation(this.props.location.source.latitude, this.props.location.source.longitude, this.props.location.source.address);
        }}
        
        getDefaultValue={() => ''}
        
        query={{
        key: 'AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM',
        language: 'en', 
        types: '(cities)' 
        }}

        nearbyPlacesAPI='GooglePlacesSearch' 
        
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_4']} 

        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

        
        styles={{
        textInputContainer: {
          flexDirection: 'column',
          width: '100%',
          backgroundColor: 'white',
          height: 50,
        },
        textInput: {
          marginLeft: 20,
          marginRight: 0,
          height: 40,
          backgroundColor: 'white',  
          fontSize: 20,
        },
        predefinedPlacesDescription: {
          color: 'white',
          backgroundColor: 'white'
        },
        }}
      >
        <View style={{flex:1}}><Map /></View>
        <Text style={styles.text}>{this.props.location.source.address}</Text>
        <Button style={styles.button}
          onPress={() =>this.props.navigation.navigate(Shops) }  
        >Next</Button>
      </GooglePlacesAutocomplete>
     
    );
  }
}
const mapStateToProps=state=>{
  return {
    location: state.location
  };
}


export default connect(mapStateToProps,{
  fetchCustomerLocation
})(SearchPlace);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 45,
    marginRight: 5,
    fontSize: 24,
    backgroundColor: 'black',
    marginTop: 10,
    padding: 5,
    paddingLeft:10,
    paddingTop: 10,
    color: 'white',
  },
  text: {
    fontSize: 18,
    color:'black'
  }
});
