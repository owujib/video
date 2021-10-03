import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

import Login from './screens/Login';
import ImageScreen from './screens/ImageScreen';
import Videos from './screens/Videos';
export default function App() {
  const [user, setUser] = React.useState(null);

  let getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('user');
      setUser(jsonValue);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // read error'
      return e;
    }
  };
  React.useEffect(() => {
    getStorage();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <View style={styles.authContainer}>
          {user === null ? (
            <Stack.Navigator>
              <Stack.Screen
                name="LOGIN"
                options={{
                  headerStyle: {
                    backgroundColor: '#e0e9ec',
                  },
                }}
              >
                {(props) => <Login {...props} setUser={setUser} />}
              </Stack.Screen>
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen
                name="Videos"
                options={{
                  headerStyle: {
                    backgroundColor: '#e0e9ec',
                  },
                }}
              >
                {(props) => <Videos {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen
                name="Upload"
                options={{
                  headerStyle: {
                    backgroundColor: '#e0e9ec',
                  },
                }}
              >
                {(props) => <ImageScreen {...props} user={user} />}
              </Stack.Screen>
            </Stack.Navigator>
          )}
        </View>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    backgroundColor: '#e0e9ec',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
