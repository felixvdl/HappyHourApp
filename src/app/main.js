import React, {Component} from 'react'
import axios from 'axios'

import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View,
  Dimensions,
  ScrollView
} from 'react-native';
import {Bar} from './bar'
let { height, width } = Dimensions.get('window')


export class Main extends Component {
  constructor() {
    super()
    this.state = {
      bars: [],
      lat: "40.7292510",
      long: "-73.9802730"
    }
  }
  componentDidMount() {
    this.fetchData()
  }
  async fetchData() {
    try {
      let response = await fetch('http://localhost:3000/api/bars', {
        method: 'GET',
        headers: {
          'latitude': this.state.lat,
          'longitude': this.state.long
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
          <Text style={styles.logoText}>HappyHour</Text>
        </View>
        <View style={styles.bar}>
          <ScrollView>
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
   logoText: {
     fontWeight: 'bold',
     fontSize: 24,
     color: '#517fa4'
   }

})
