import React, {Component} from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TabBarIOS,
  ProgressViewIOS,
  Modal,
  Image
} from 'react-native';

import { Icon } from 'react-native-elements'
import { Bar } from './bar'
import { BarInfo } from './barInfo'
import { Map } from './map'
import Swiper from 'react-native-swiper';
import MapView  from 'react-native-maps'

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
      swiper: true,
      bar: 0,
      showBar: false
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
  _showMap(id) {
    this.setState({showBar: true, bar: id})
  }
  _returnFromDetail() {
    this.setState({showBar: false})
  }
  _returnFromMap() {
    this.setState({map:false})
  }
  renderConditional() {
    if (this.state.initialLoad == false) {
      return(
        <View style={styles.loading}>
          <ActivityIndicator
            color='white'
            size= 'large'
          />
        </View>
      )
    }
    else if (this.state.bars.length == 0) {
      return (
        <View style={styles.noHappy}>
          <ScrollView style={{height: 1 *height}}
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
            <View style={styles.noHappyImg}>
              <Image
                source={require('../assets/emoticon-sad.png')}
              />
            </View>
            <Text style={styles.noHappyText}>
              Come back later for more
            </Text>
          </ScrollView>
        </View>
      )
    } else {
      return(
        <View style={styles.main}>

          <Modal visible={this.state.showBar} animationType='slide'>
            <BarInfo bar={this.state.bars[this.state.bar]} longitude={this.state.longitude} latitude={this.state.latitude} return={this._returnFromDetail.bind(this)}/>
          </Modal>

          <Modal visible={this.state.map} animationType='slide'>
            <Map bars={this.state.bars} latitude={this.state.latitude} longitude={this.state.longitude} return={this._returnFromMap.bind(this)}/>
          </Modal>

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
              underlayColor= 'transparent'
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
            <Swiper showsButtons={false} loop= {false} showsPagination={false} buttonWrapperStyle={styles.swipeButton}>
                {this.state.bars.map((bar,i) => (
                <TouchableOpacity onPress={this._showMap.bind(this, i)} key={i} activeOpacity= {0.9} style={{height:0.6*height}}>
                  <Bar bar={bar} name={bar.name} idx={bar.id} location={bar.location} deal={bar.deal} info={bar.info} wednesday={bar.wednesday} thursday={bar.thursday} geolocation={bar.geolocation}  distance={bar.distance} key={i} />
                  <ProgressViewIOS style={styles.progressView} progress={(i+1)/this.state.bars.length} progressTintColor="white" trackTintColor='#2E5266'/>
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
     fontSize: 24,
     fontFamily: 'Helvetica Neue'
   },
   noHappyText: {
     color: 'white',
     fontWeight: 'bold',
     marginTop: 0.2 *height,
     textAlign: 'center',

   },
   noHappy: {
     alignItems: 'center',
     backgroundColor: '#4fd0ea'
   },
   noHappyImg: {
     marginLeft: 0.02 * width,
     marginBottom: -0.1*height
   },
   loading: {
     height: 1 *height,
     justifyContent: 'center',
     backgroundColor: '#4fd0ea'
   },
   mapIcon: {
     marginLeft: 0.7*width,
     marginTop: - 0.04 *height,
   },
   progressView: {
     marginTop: 0.05 *height,
     width: 0.9 *width,
     marginLeft: 0.05 * width
   },
   buttonText: {
     color: 'red',
     marginTop: -200,
     fontSize: 200
   }

})
