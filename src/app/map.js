import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal} from 'react-native';
import { Grid, Col, Row, Icon} from 'react-native-elements'
import MapView  from 'react-native-maps'

let { height, width } = Dimensions.get('window')


export class Map extends Component {
  goBack() {
    this.props.return()
  }
  render() {
    return(
      <View>
        <View style={styles.mapView}>
          <Icon
            type= 'material-community'
            name= 'format-list-bulleted'
            size= {28}
            color= 'white'
            onPress={ this.goBack.bind(this) }
            underlayColor= 'transparent'

            />
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.0602,
            longitudeDelta: 0.0601,
          }}
        >
        {this.props.bars.map((bar,i) => (
          <MapView.Marker
            coordinate={{longitude: parseFloat(bar.geolocation.split(",")[1]), latitude: parseFloat(bar.geolocation.split(",")[0])}}
            title={bar.name}
            description={bar.deal}
            key={i}
            showsUserLocation = {true}
            pinColor='#2E5266'
          />
        ))}
        </MapView>
      </View>
    )
  }
}


const styles = StyleSheet.create ({
  mapView: {
    backgroundColor: '#4fd0ea',
    height: 0.08*height,
    justifyContent: 'center'
  },
  map: {
    top: 0,
    left: 0,
    right:0,
    bottom: 0,
    width: 1 * width,
    height: 1* height,
    borderWidth: 0.5,
    borderColor: '#2E5266'
  },
})
