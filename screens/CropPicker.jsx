import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import ImagePicker from 'react-native-image-crop-picker';

export default class App extends Component {
  render() {
    return (
      <View
        style={styles.container}
        onTouchStart={() => {
          console.log('before crash');
          console.log('ImagePicker is', ImagePicker);
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then((image) => {
            console.log(image);
          });
          console.log('after crash');
        }}
      >
        <Text style={styles.paragraph}>Touch me</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
