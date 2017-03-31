import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { Grid, Col, Row, Icon} from 'react-native-elements'
import  MapView  from 'react-native-maps'
let { height, width } = Dimensions.get('window')


export class BarInfo extends Component {
  goBack(routeName) {
    this.props.navigator.push({
      name: routeName,
    })
  }
  render() {

    return(
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerBack}>
            <Icon
              name="keyboard-arrow-left"
              color='white'
              onPress={ this.goBack.bind(this, 'home') }
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
          <View style={{ height:0.4 *height}}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: parseFloat(this.props.bar.geolocation.split(",")[0]),
                longitude: parseFloat(this.props.bar.geolocation.split(",")[1]),
                latitudeDelta: 0.0102,
                longitudeDelta: 0.0101,
              }}
              onPress={console.log("hello")}
            >
              <MapView.Marker
                coordinate={{longitude: parseFloat(this.props.bar.geolocation.split(",")[1]), latitude: parseFloat(this.props.bar.geolocation.split(",")[0])}}
                title={this.props.bar.name}
                pinColor='#F9B05F'
              />
              <MapView.Marker
                coordinate={{longitude: parseFloat(this.props.longitude), latitude: parseFloat(this.props.latitude)}}
                title="you"
                image={require('../assets/map-icon.png')}
              />
            </MapView>
          </View>
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
    backgroundColor: '#F9B05F',
    height: 0.08 * height,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    marginTop: -0.03* height,
    fontWeight: 'bold'
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
    fontSize: 12
  },
  distance: {
    marginTop: 0.01 * height,
    fontSize: 12,
    color: 'grey',
    marginLeft: 0.3 * width
  },
  deal: {
    alignItems: 'center',
    marginTop: 0.03* height,
    width: 0.8 * width,
    marginLeft: 0.07* width,
  },
  dealText: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  days: {
    width: 0.6 * width,
    marginTop: 0.05 * height,
    marginLeft: 0.05* width,
    borderLeftWidth: 0.5,
    padding: 4,
    borderColor: '#F9B05F'
  },
  day: {
    fontWeight: 'bold',
    fontSize: 12,
    padding: 2
  },
  dayData: {
    color: 'grey',
    fontSize: 12,
    padding: 2
  },
  info: {
    marginTop: 0.05 *height,
    alignItems: 'center',

    padding: 5
  },
  infoText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'grey'
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
    borderColor: '#F9B05F'


  }

})
