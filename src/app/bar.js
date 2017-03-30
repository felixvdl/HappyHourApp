import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Grid, Col, Row, Icon} from 'react-native-elements'

let { height, width } = Dimensions.get('window')


export class Bar extends Component {
  render() {
    return(
      <View style={styles.barView}>
        <Grid>
          <Row>
            <Col size={15}>
              <View style={styles.icon}>
                <Icon
                  name='local-bar'
                  color= '#517fa4'
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
        <View style={styles.moreInfo}>
          <Icon
            name='keyboard-arrow-down'
            color='#517fa4'
          />
        </View>
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
   },
   deal: {
     fontSize: 12,
     paddingBottom:10
   },
   barView: {
     borderWidth: 0.5,
     marginTop: 0.02*height,
     borderRadius: 2,
     borderColor: 'lightgrey',
     padding: 10
   },
   dealView: {
     marginTop: 0.02 * height
   },
   adress: {
     fontSize:10
   },
   icon: {
     marginTop: 0.01 * height,

   },
   moreInfo: {
     marginBottom: -0.02 * height
   }

})
