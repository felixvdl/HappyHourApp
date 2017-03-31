import React, {Component} from 'react'
import axios from 'axios'

import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl
} from 'react-native';
import {Bar} from './bar'
let { height, width } = Dimensions.get('window')



export class Main extends Component {
  constructor() {
    super()
    this.state = {
      bars: [],
      lat: "40.7292510",
      long: "-73.9802730",
      refreshing: false,
      latitude: null,
      longitude: null,
      error: null,
    }
  }
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
    this.fetchData()
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }
  async fetchData() {
    try {
      let response = await fetch('http://localhost:3000/api/bars', {
        method: 'GET',
        headers: {
          'latitude': this.state.latitude,
          'longitude': this.state.longitude
        }
      })
      let res = await JSON.parse(response._bodyText)
      this.setState({bars: res})
    } catch(error) {
        console.log("error: " + error)
    }
  }
  render() {
    return(
      <View>

        <View style={styles.logo}>
          <Text>{this.state.longitude} </Text>
        </View>
        <View style={styles.bar}>
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >

              {this.state.bars.map((bar,i) => (
                <Bar name={bar.name} idx={bar.id} location={bar.location} deal={bar.deal} info={bar.info} wednesday={bar.wednesday} thursday={bar.thursday} geolocation={bar.geolocation}  distance={bar.distance} idy={i} key={i} />
              ))}
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
   bar: {
      paddingTop: 22,
      width: 0.9*width
   },
   logo: {
     paddingTop: 0.1*height,
     alignItems: 'center'
   },

})
