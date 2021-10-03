import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import Button from '../components/Button';
import { Video } from 'expo-av';

export default function Videos({ user, navigation }) {
  const [currentUser, setcurrentUser] = useState(null);
  const [status, setStatus] = useState({});

  React.useEffect(() => {
    axios
      .get('https://lovely-test.herokuapp.com/api/user/profile', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setcurrentUser(data?.message);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <View>
      <Text>HEY</Text>
      {user.displayImage.length === 0 && (
        <View>
          <Text>No image uploaded yet upload images</Text>
        </View>
      )}
      <View style={{ height: 600 }}>
        <ScrollView>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', flex: 1 }}>
            {currentUser?.displayImage.map((images) => {
              return (
                <Video
                  key={images._id}
                  style={{ width: '45%', height: 200, margin: 10 }}
                  useNativeControls
                  resizeMode="cover"
                  source={{ uri: images.file }}
                  onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                />
              );
            })}
            <Text>No image uploaded yet upload images</Text>
          </View>
        </ScrollView>
      </View>
      <View style={{ width: '50%' }}>
        <Button
          text="upload video"
          onPress={() => {
            navigation.navigate('Upload');
          }}
        />
      </View>
    </View>
  );
}
