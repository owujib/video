import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import Button from '../components/Button';

export default function Login(props, { navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let setStorage = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      // save error
    }
  };
  function loginUser() {
    axios
      .post('https://lovely-test.herokuapp.com/api/user/login', {
        email,
        password,
      })
      .then(async ({ data }) => {
        if (isLoading) {
          setIsLoading(false);
        }
        let info = {
          ...data?.data,
          token: data?.token,
        };
        props.setUser(info);
      })
      .catch(({ response }) => {
        console.log(response?.data);
        setError(response?.data);
        if (isLoading) {
          setIsLoading(false);
          setStorage(info);
        }
        Alert.alert(`an error occured please try again`);
      });
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          textContentType={'password'}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <>
        <Button
          text="Login"
          isLoading={isLoading}
          onPress={() => {
            setIsLoading(true);
            loginUser();
          }}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // #242525
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    borderColor: '#000',
    padding: 20,
    borderWidth: 1.5,
  },
  inputText: {
    height: 50,
    color: '#000',
  },
});
