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
        <View style={styles.nameView}>
          <Text style={styles.name}>
            {this.props.name}
          </Text>
        </View>
          <Text>
            {this.props.location}
          </Text>
          <Text>
            {this.props.distance.toFixed(2)}
          </Text>
          <Text style={styles.deal}>
            {this.props.deal}
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create ({
   name: {
      fontWeight: 'bold',
      color: 'white',
      fontSize:20
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
     borderWidth: 0.5,
     borderRadius: 6,
     borderColor: 'lightgrey',
     backgroundColor: 'white',
     width: 0.9 * width,
     marginLeft: 0.05 * width,
     height: 0.35 * height,
     marginTop: 0.2*height,
     alignItems: 'center'


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
   nameView: {
     backgroundColor: '#F9B05F',
     width: 0.9* width,
     alignItems: 'center',
     height: 0.08* height,
     borderTopLeftRadius: 6,
     borderTopRightRadius: 6,
     justifyContent: 'center'

   }
})
