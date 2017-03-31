import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Grid, Col, Row, Icon} from 'react-native-elements'

let { height, width } = Dimensions.get('window')


export class Bar extends Component {
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }
  render() {
    return(
      <View style={styles.barView} >
        <Grid>
          <Row>
            <Col size={15}>
              <View style={styles.icon} >
                <Icon
                  name='local-bar'
                  color= '#F9B05F'
                  reverse= {true}
                  size= {14}
                />
              </View>
            </Col>
            <Col size={60}>
              <Text style={styles.name}>
                {this.props.name}
              </Text>
              <Text style={styles.adress}>
                {this.props.location}
              </Text>
            </Col>
            <Col size={25}>
              <Text style={styles.distance}>
                {this.props.distance.toFixed(2)} miles
              </Text>
            </Col>
          </Row>
          <Row style={styles.dealView}>
              <Text style={styles.deal}>
                {this.props.deal}
              </Text>
          </Row>
        </Grid>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
   name: {
      paddingTop: 12,
      fontWeight: 'bold'
   },

   distance: {
     fontSize: 10,
     marginTop: 0.02*height,
     color: 'grey'
   },
   deal: {
     fontSize: 12,
     paddingBottom:10,
     fontStyle: 'italic'
   },
   barView: {
     borderTopWidth: 0.5,
     borderRadius: 2,
     borderColor: 'lightgrey',
     padding: 10,
     backgroundColor: 'white'

   },
   dealView: {
     marginTop: 0.02 * height,
   },
   adress: {
     fontSize:10,
     color: 'grey'
   },
   icon: {
     marginTop: 0.01 * height,

   },
})
