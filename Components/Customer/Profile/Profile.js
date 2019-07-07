import React, {Component} from 'react';
import ProfileNav from './ProfileNav';
import {StyleSheet} from 'react-native';

export default class Profile extends Component {
    render () {
    return (
      <ProfileNav />
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
    width: 40,
    height:40,
    tintColor: 'red'
  }
});