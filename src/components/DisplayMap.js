import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';
import { ActivityIndicator,StyleSheet } from 'react-native';

import markerFlag from '../images/flag.png';


class DisplayMap extends React.Component {

  constructor(props) {
    super(props);

  this.state = {
    styleURL: MapboxGL.StyleURL[0],
    data: {},
    loading:true
  };
}

  async componentDidMount() {
  try {
    let response = await fetch(
      'https://prod.greatescape.co/api/flights/cities'
    );
    let responseJson = await response.json();
    let geojson = {
      "type": "FeatureCollection",
      "features": []
    }

    for ( const key of Object.keys(responseJson) ) {

      const city = responseJson[key];
      const {name,id} = city;
      const coordinateLatitude = city.location.lat;
      const coordinateLongitude = city.location.lon;
      const coordinate = [coordinateLongitude,coordinateLatitude];

      const feature = this.newFeaturePoint(coordinate,name,id);
      geojson.features.push(feature);
    }

    this.setState({data: geojson, loading: false});
  } catch (error) {
    console.error(error);
  }
}

  newFeaturePoint(coordinates,name,id){
let feature = {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": coordinates
    },
    "properties": {name,id}
}
return feature;
}


  render() {
    const { styleURL,loading,data} = this.state;
    if ( !loading ) {
      return (
          <MapboxGL.MapView
            showUserLocation={true}
            animated={true}
            zoomLevel={14}
            centerCoordinate={[103.819836,1.352083]}
            styleURL={this.state.styleURL}
            style={{flex: 1}}
          >
            <MapboxGL.ShapeSource
              id="PinShapeSource"
              shape={data}
            >
              <MapboxGL.SymbolLayer
                id="PinSymbol"
                style={mapboxStyles.icon}
              />
            </MapboxGL.ShapeSource>
          </MapboxGL.MapView>
      );
    } else {
        return <ActivityIndicator style={reactStyles.activityInd} size="large" color="#0000ff" />
    }
  }
}

const mapboxStyles = MapboxGL.StyleSheet.create({
  icon: {
    iconImage: markerFlag,
    iconSize: 0.3
  },
});

const reactStyles = StyleSheet.create ({
   activityInd: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
      }
 })

export default DisplayMap
