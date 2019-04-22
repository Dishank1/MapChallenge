import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import MapboxGL from '@mapbox/react-native-mapbox-gl';

import DisplayMap from './src/components/DisplayMap'
import token from './maptoken.json';

type Props = {};


MapboxGL.setAccessToken(token['accessToken']);

const IS_ANDROID = Platform.OS === 'android';

export default class App extends Component<Props> {


  constructor(props) {
      super(props);

      this.state = {
        isFetchingAndroidPermission: IS_ANDROID,
        isAndroidPermissionGranted: false
      };
    }

    async componentWillMount() {
      if (IS_ANDROID) {
        const isGranted = await MapboxGL.requestAndroidLocationPermissions();
        this.setState({
          isAndroidPermissionGranted: isGranted,
          isFetchingAndroidPermission: false,
        });
      }
    }

  render() {
    return (
      <View style={styles.container}>
        <DisplayMap />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
