import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function Button({
  buttonStyle,
  text,
  onPress,
  textStyle,
  isLoading,
}) {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, buttonStyle]}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={[styles.text, textStyle]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: '#272626',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    borderWidth: 1,
    height: 80,
    borderRadius: 10,
  },

  text: {
    color: '#fff',
    fontSize: 30,
  },
});
