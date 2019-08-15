import React,{Component} from "react";
import { View, Text, Dimensions, Image, StyleSheet, ActivityIndicator, ImageBackground} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { fetchCustomerLocation } from '../Customer/Redux/Actions/locationActions';
import Button from 'react-native-button';
import {connect} from 'react-redux';
import Geocoder from 'react-native-geocoding';

Geocoder.init('AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM');

class Map extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    console.log("in map")
    console.log(this.props)
    return (
      <View style={styles.container}>
          <MapView 
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            zoomEnabled={true}
            zoomControlEnabled={true}
            region={{
              latitude: this.props.location.source.latitude, 
              longitude: this.props.location.source.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          >
            <Marker
              draggable
              coordinate={{
                latitude:  this.props.location.source.latitude, 
                longitude: this.props.location.source.longitude,
              }}

              onDragEnd={
                e=>{
                  this.props.location.source.latitude= e.nativeEvent.coordinate.latitude;
                  this.props.location.source.longitude= e.nativeEvent.coordinate.longitude;
                  console.log(this.props.location.source)
                  Geocoder.from(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)
                  .then(json => {
                      let address=json.results[0].formatted_address;
                      this.props.fetchCustomerLocation(this.props.location.source.latitude, this.props.location.source.longitude, address);
                  }).catch(error => console.log(error));
                }
              }
            />
          </MapView >
        </View>
      );
  }
}

const mapStateToProps=state=>{
  console.log(state)
  return {
    location: state.location 
  };
}

export default connect(mapStateToProps,{
  fetchCustomerLocation
})(Map);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  search: {
    flex:1,
    width: '100%',
    flexDirection:'column',
  },
  text:{
    fontSize: 22,
    fontWeight: 'normal',
    margin: 10,
    color:'white',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
});


