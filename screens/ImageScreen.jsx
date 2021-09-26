import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';

import Slider from '@react-native-community/slider';

export default function ImageScreen() {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState({});
  const [durationTime, setDurationTime] = useState('');
  const [muted, setMuted] = useState(false);
  const videoRef = useRef();

  const [position, setPosition] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        await ImagePicker.requestCameraPermissionsAsync();
        // if (status !== 'granted') {
        //   alert('Sorry, we need camera roll permissions to make this work!');
        // }
      }
    })();
  }, []);

  const onPositionChange = useCallback(
    async (pos) => {
      if (!videoRef.current) return;

      await videoRef.current.setPositionAsync(pos);
      setPosition(pos);
    },
    [position]
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const pickVideo = async () => {
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   //   mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    //   //   allowsEditing: true,
    //   //   aspect: [4, 3],
    //   //   quality: 1,
    // });
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (result.cancelled !== true) {
      setVideo(result.uri);
    }
  };
  // console.log(status);
  return (
    <>
      <SafeAreaView
        style={{
          flex: 0.7,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'green',
          width: '100%',
        }}
      >
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        <Button title="Pick a video" onPress={pickVideo} />
        {video && (
          <>
            <View style={{ flex: 0.7, width: '100%', position: 'relative' }}>
              <Text
                style={{
                  zIndex: 2,
                  position: 'absolute',
                  top: 19,
                  color: '#000',
                  fontSize: 40,
                  fontWeight: '600',
                }}
              >
                {durationTime}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setMuted(!muted);
                }}
                style={{
                  zIndex: 2,
                  position: 'absolute',
                  top: 19,
                  left: '90%',
                  width: 100,
                  height: 100,
                  backgroundColor: 'pink',
                  color: '#000',
                  fontSize: 40,
                  fontWeight: '600',
                }}
              >
                <Text> 🔇</Text>
              </TouchableOpacity>
              <Video
                style={{ width: '100%', height: 400, zIndex: 1 }}
                source={{ uri: video }}
                isLooping={true}
                ref={videoRef}
                onPlaybackStatusUpdate={(status) => {
                  setStatus(() => status);
                  var ms = status.positionMillis,
                    min = Math.floor((ms / 1000 / 60) << 0),
                    sec = Math.floor((ms / 1000) % 60);

                  console.log(min + ':' + sec);
                  setDurationTime(`${min}:${sec}`);
                }}
                shouldPlay={true}
                isMuted={muted}
                resizeMode="cover"
              />
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={0}
                maximumValue={20000}
                step={200}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
                onValueChange={onPositionChange}
                thumbImage={{ uri: image }}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}
