import React,{Component} from "react";
import { View, Text, Dimensions, Image, StyleSheet} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Button from "react-native-button";
import MapViewDirections from "react-native-maps-directions";
import SearchPlace from './SearchPlace';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


export default class Map extends React.Component{
  constructor(props){
    super(props);
    this.state={
      source: {
        latitude: 0,
        longitude: 0
      },
      address: null,
      error: null,
    };
  }
  
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      position=> {
        console.log('position->',position);
        this.setState({
          source:{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
          error:null,
        });
      },
      error=> {this.setState({error: error.message })},
      { enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 },
    );
  }

  render(){
    console.log('state->',this.state);
    return(
      <GooglePlacesAutocomplete style={{height:100,}}
        placeholder="find that close to you"
        minLength={3}
        autoFocus={false}
        returnKeyType={'search'} 
        listViewDisplayed='auto'  
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render

        onPress={(data, details = null) => { 
          this.setState({
            source:{
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng
            }}
          )
          console.log(details.geometry);
        }}
        
        getDefaultValue={() => ''}
        
        query={{
        key: MAP_API_KEY,
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
      <View style={styles.container}>
      <MapView 
          showsUserLocation
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude:  this.state.source.latitude, 
            longitude: this.state.source.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >

          <Marker
            draggable
            coordinate={{
              latitude:  this.state.source.latitude, 
              longitude: this.state.source.longitude,
            }}

            onDragEnd={ 
              (e) => this.setState({ 
                source:{
                  latitude:  e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,  
                }
              },
              console.log(this.state))
            }
          />
        </MapView >
      </View>
    </GooglePlacesAutocomplete>
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    //width: '100%',
    //height: '60%',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    justifyContent: 'center',
    width: '100%',
    flexDirection:'column',
  }
});


