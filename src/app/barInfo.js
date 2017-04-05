import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, TouchableHighlight, Linking} from 'react-native';
import { Grid, Col, Row, Icon} from 'react-native-elements'
import  MapView  from 'react-native-maps'
let { height, width } = Dimensions.get('window')


export class BarInfo extends Component {
  goBack() {
    this.props.return()
  }
  openMaps(){
     console.log(this.props.bar.geolocation)
    let url = 'https://www.google.com/maps/place/' + this.props.bar.location
    console.log(url)
    Linking.openURL(url)
  }
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBack}>
            <Icon
              name="close"
              color='white'
              onPress={ this.goBack.bind(this, 'home') }
              underlayColor= 'transparent'

            />
          </View>
          <Text style={styles.headerText}>
            {this.props.bar.name}
          </Text>
        </View>
        <ScrollView style={styles.content}>
          <Grid>
              <Col>
                <Text style={styles.adress}>
                  {this.props.bar.location}
                </Text>
              </Col>
              <Col>
                <Text style={styles.distance}>
                  {this.props.bar.distance.toFixed(2)} miles
                </Text>
              </Col>
          </Grid>
          <View style={styles.deal}>
            <Text style={styles.dealText}>
              {this.props.bar.deal}
            </Text>
          </View>
          <View style={styles.days}>
            <Grid>
              <Row>
                <Text style={styles.day}>
                  Monday:
                </Text>
                <Text style={styles.dayData}>
                  {" " +this.props.bar.monday}
                </Text>
              </Row>
              <Row>
                <Text style={styles.day}>
                  Tuesday:
                </Text>
                <Text style={styles.dayData}>
                  {" " +this.props.bar.tuesday}
                </Text>
              </Row>
              <Row>
                <Text style={styles.day}>
                  Wednesday:
                </Text>
                <Text style={styles.dayData}>
                  {" " +this.props.bar.wednesday}
                </Text>
              </Row>
              <Row>
                <Text style={styles.day}>
                  Thursday:
                </Text>
                <Text style={styles.dayData}>
                  {" " +this.props.bar.thursday}
                </Text>
              </Row>
              <Row>
                <Text style={styles.day}>
                  Friday:
                </Text>
                <Text style={styles.dayData}>
                  {" " +this.props.bar.friday}
                </Text>
              </Row>
              <Row>
                <Text style={styles.day}>
                  Saturday:
                </Text>
                <Text style={styles.dayData}>
                  {" " +this.props.bar.saturday}
                </Text>
              </Row>
              <Row>
                <Text style={styles.day}>
                  Sunday:
                </Text>
                <Text style={styles.dayData}>
                  {" " +this.props.bar.sunday}
                </Text>
              </Row>
            </Grid>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>
              {"'"+this.props.bar.info+"'"}
            </Text>
          </View>
          <TouchableOpacity style={{ height:0.4 *height}} onPress={this.openMaps.bind(this)}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(this.props.bar.geolocation.split(",")[0]),
                longitude: parseFloat(this.props.bar.geolocation.split(",")[1]),
                latitudeDelta: 0.0102,
                longitudeDelta: 0.0101,
              }}
            >
              <MapView.Marker
                coordinate={{longitude: parseFloat(this.props.bar.geolocation.split(",")[1]), latitude: parseFloat(this.props.bar.geolocation.split(",")[0])}}
                title={this.props.bar.name}
                pinColor='#2E5266'
              />
              <MapView.Marker
                coordinate={{longitude: parseFloat(this.props.longitude), latitude: parseFloat(this.props.latitude)}}
                title="you"
                image={require('../assets/map-icon.png')}
              />
            </MapView>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    alignItems: 'center'
  },
  header: {
    backgroundColor: '#4fd0ea',
    height: 0.08 * height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    marginTop: -0.03* height,
    fontWeight: 'bold',
    fontSize:18
  },
  headerBack: {
    marginRight: 0.9 * width,
    marginTop: 0.02* height,
    width: 0.1 * width,
  },
  content: {
    width: 0.95 * width
  },
  adress: {
    marginTop: 0.01*height,
    fontSize: 12,
    color: '#2E5266'
  },
  distance: {
    marginTop: 0.01 * height,
    fontSize: 12,
    color: '#9FB1BC',
    marginLeft: 0.3 * width
  },
  deal: {
    alignItems: 'center',
    marginTop: 0.03* height,
    width: 0.8 * width,
    marginLeft: 0.07* width,
  },
  dealText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E5266',
    fontFamily: 'Helvetica Neue',
    textAlign: 'center',


  },
  days: {
    width: 0.6 * width,
    marginTop: 0.05 * height,
    marginLeft: 0.05* width,
    borderLeftWidth: 0.5,
    padding: 4,
    borderColor: '#4fd0ea'
  },
  day: {
    fontWeight: 'bold',
    fontSize: 14,
    padding: 2,
    color: '#2E5266'
  },
  dayData: {
    color: '#9FB1BC',
    fontSize: 14,
    padding: 2
  },
  info: {
    marginTop: 0.03 *height,
    alignItems: 'center',

    padding: 5
  },
  infoText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#9FB1BC'
  },
  map: {
    position: 'absolute',
    top: 0.03 * height,
    left: 0.025 * width,
    right:0,
    bottom: 0,
    width: 0.9 * width,
    height: 0.3* height,
    borderWidth: 0.5,
    borderColor: '#2E5266'


  }

})
