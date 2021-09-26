import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import ImageScreen from './screens/ImageScreen';
import VideoTrimmer from './screens/VideoTrimmer';
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageScreen /> */}
      <VideoTrimmer />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
