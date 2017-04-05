import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal} from 'react-native';
import { Grid, Col, Row, Icon} from 'react-native-elements'

let { height, width } = Dimensions.get('window')


export class Bar extends Component {
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
  render() {
    return(

      <View style={styles.barView} shadowOpacity={0.3}>
        <View style={styles.iconView}>
          <Icon
            type= 'material-community'
            name= 'glass-tulip'
            size= {34}
            color= '#2E5266'
            />
          </View>
          <Text style={styles.name}>
            {this.props.name}
          </Text>
          <Text style={styles.deal}>
            {this.props.deal.slice(10)}
          </Text>
          <View style={styles.footer}>
            <Grid>
              <Col size={65}>
                <Text style={styles.distance}>
                  {this.props.distance.toFixed(2)} miles
                </Text>
              </Col>
              <Col size={35}>
                <Text style={styles.location}>
                  {this.props.location.slice(0,-10)}
                </Text>
              </Col>
            </Grid>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
   name: {
      fontWeight: 'bold',
      color: '#4fd0ea',
      fontSize:20,
      marginTop: 0.02 *height
   },

   distance: {
     fontSize: 10,
     marginTop: 0.02*height,
     color: 'grey'
   },
   deal: {
     marginTop: 0.03 *height,
     fontSize: 24,
     lineHeight: 30,
     textAlign: 'center',
     letterSpacing: 2,
     marginLeft: 50,
     marginRight: 60,
     fontFamily: 'Helvetica Neue',
     color: '#2E5266'
   },
   barView: {
     borderWidth: 0.5,
     borderRadius: 4,
     borderColor: 'grey',
     backgroundColor: 'white',
     width: 0.9 * width,
     marginLeft: 0.05 * width,
     height: 0.6 * height,
     alignItems: 'center',
     marginTop: 0.1 *height


   },
   dealView: {
     marginTop: 0.02 * height,
   },
   adress: {
     fontSize:10,
     color: 'grey'
   },
   iconView: {
     marginTop: 0.05 * height
   },
   footer: {
     marginTop: 0.53 * height,
     borderTopWidth: 0.5,
     borderColor: '#9FB1BC',
     width: 0.85 * width,
     position: 'absolute'
   },
   distance: {
     marginTop: 0.02 *height,
     color: '#9FB1BC',
     fontSize: 12
   },
   location: {
     marginTop: 0.02 *height,
     color: '#9FB1BC',
     fontSize: 12,
   }

})
