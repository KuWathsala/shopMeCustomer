import React,{Component} from "react";
import { View, Text, Dimensions, Image, StyleSheet} from "react-native";
import MapView, {PROVIDER_GOOGLE, Marker, Circle} from 'react-native-maps';

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
      //{ enableHighAccuracy: false, timeout: 25000, maximumAge: 3600000 },
    );
  }

  render(){
    console.log('state->',this.state);
    return(
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

        {/*<Circle
          center={{
            latitude:  this.state.latitude, 
            longitude: this.state.longitude,
          }}
          radius={500}
          strokeWidth={2}
          strokeColor="#3399ff"
          //fillColor="#80bfff"
        />*/}

        
        {/*<MapViewDirections
          origin={this.state.source}
          destination={this.state.destination}
          strokeWidth={6}
          strokeColor="blue"
          apikey="AIzaSyAnAth7L5EhCtuNs_Znsvl-Ihhtsxb1Dlg"
        />*/}
        </MapView >
      </View>
    );
  }
}


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
  }
});


