import React from 'react';
import MapboxGL from '@mapbox/react-native-mapbox-gl';


class ShowMap extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <MapboxGL.MapView
          zoomLevel={15}
          styleURL={this.state.styleURL}
          centerCoordinate={[11.256,43.77]}
          style={sheet.matchParent}
        />
    );
  }
}

export default ShowMap;
