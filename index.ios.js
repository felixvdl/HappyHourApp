'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import {Home} from './src/app/main'
import {BarInfo} from './src/app/barInfo'
import {Bar} from './src/app/bar'

class HappyHour extends Component {

  renderScene(route, navigator) {
    if(route.name == 'home') {
      console.log(route.name)
      return <Home navigator={navigator} />
    }
    if(route.name =='bar') {
      console.log(route.name)
      return <BarInfo navigator={navigator} {...route.passProps}/>
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'home'}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('HappyHour', () => HappyHour);
