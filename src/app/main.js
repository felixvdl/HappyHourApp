import React, {Component} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TabBarIOS,
  ProgressViewIOS
} from 'react-native';

import { Icon } from 'react-native-elements'
import {Bar} from './bar'
import Swiper from 'react-native-swiper';
import  MapView  from 'react-native-maps'

let { height, width } = Dimensions.get('window')



export class Home extends Component {
  constructor() {
    super()
    this.state = {
      bars: [],
      refreshing: false,
      latitude: null,
      longitude: null,
      error: null,
      initialLoad: false,
      map: false,
      swiper: true
    }
  }
  navigate(routeName, id) {
    this.props.navigator.push({
      name: routeName,
      passProps: {
        bar: this.state.bars[id],
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    });
  }
  reLocate() {
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
  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },);
    this.fetchData()
  }
  async fetchData() {
    try {
      let response = await fetch('https://mysterious-brook-11592.herokuapp.com/api/bars', {
        method: 'GET',
        headers: {
          'latitude': this.state.latitude,
          'longitude': this.state.longitude
        }
      })
      let res = await JSON.parse(response._bodyText)
      this.setState({bars: res, initialLoad: true})
    } catch(error) {
        console.log("error: " + error)
    }
  }
  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }
  _mapView() {
    this.setState({map: true})
  }
  _listView() {
    this.setState({map: false})
  }
  renderConditional() {
    if (this.state.initialLoad == false) {
      return(
        <View style={styles.loading}>
          <ActivityIndicator
            color='#F9B05F'
            size= 'large'
          />
        </View>
      )
    }

    else if (this.state.map == true) {
      return(
        <View>
          <View style={styles.mapView}>
            <Icon
              type= 'material-community'
              name= 'format-list-bulleted'
              size= {28}
              color= 'white'
              onPress={this._listView.bind(this)}
              />
          </View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: this.state.latitude,
              longitude: this.state.longitude,
              latitudeDelta: 0.0602,
              longitudeDelta: 0.0601,
            }}
          >
          {this.state.bars.map((bar,i) => (
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
    else if (this.state.bars.length == 0) {
      return (
        <View style={styles.noHappy}>
          <ScrollView style={{height: 0.8 *height}}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
          >
            <Text style={styles.noHappyText}>
              No happy hours going on at this moment
            </Text>
          </ScrollView>
        </View>
      )
    } else {
      return(
        <View style={styles.main}>
          <TouchableOpacity style={styles.logo} onPress={this.reLocate.bind(this)}>
            <Text style={styles.findMe}>locate me</Text>
          </TouchableOpacity>
          <View style={styles.mapIcon}>
            <Icon
              type= 'material-community'
              name= 'google-maps'
              size= {28}
              color= 'white'
              onPress={this._mapView.bind(this)}
              />
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
            <Swiper showsButtons={true} loop= {false} showsPagination={false} buttonWrapperStyle={styles.swipeButton}>

                {this.state.bars.map((bar,i) => (
                <TouchableOpacity onPress={this.navigate.bind(this, 'bar', i)} key={i}>
                  <Bar name={bar.name} idx={bar.id} location={bar.location} deal={bar.deal} info={bar.info} wednesday={bar.wednesday} thursday={bar.thursday} geolocation={bar.geolocation}  distance={bar.distance} key={i} />
                  <ProgressViewIOS style={styles.progressView} progress={i/this.state.bars.length} progressTintColor="white" trackTintColor='#2E5266'/>
                </TouchableOpacity>

                ))}

            </Swiper>

            </ScrollView>
          </View>
        </View>
      )
    }
  }
  render() {

    return (
      <View>
        {this.renderConditional()}

      </View>
    )
  }
}

const styles = StyleSheet.create ({
   bar: {
      paddingTop: 12,
   },
   logo: {
     marginTop: 0.15 * height,
     alignItems: 'center',
   },
   main: {
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: '#4fd0ea',
   },
   findMe: {
     color: 'white',
     fontWeight: 'bold',
     fontSize: 20,
   },
   noHappyText: {
     color: '#F9B05F',
     fontWeight: 'bold'
   },
   noHappy: {
     alignItems: 'center',
     marginTop: 0.1 * height
   },
   loading: {
     height: 1 *height,
     justifyContent: 'center'
   },
   mapIcon: {
     marginLeft: 0.7*width,
     marginTop: - 0.04 *height,
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
   progressView: {
     marginTop: 0.05 *height,
     width: 0.9 *width,
     marginLeft: 0.05 * width
   },
   mapView: {
     backgroundColor: '#4fd0ea',
     height: 0.08*height,
     justifyContent: 'center'
   },

})
