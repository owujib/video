import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image,
  View,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

// import Slider from '@react-native-community/slider';

export default function ImageScreen(props) {
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [status, setStatus] = useState({});
  const [durationTime, setDurationTime] = useState('');
  const [muted, setMuted] = useState(false);
  const [datas, setDatas] = useState(null);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);

  const [position, setPosition] = useState(0);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();

        await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
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

    if (result.cancelled !== true) {
      const data = new FormData();

      let a = FileSystem.getInfoAsync(result.uri)
        .then((res) => console.log('a', res))
        .catch((err) => console.log('a Err', err));

      // data.append('video', {
      //   name: 'file.mov',
      //   type: `video/${result.uri.split('.')[1]}`,
      //   path: result.uri,
      //   // Platform.OS === 'ios'
      //   //   ? result.uri.replace('file://', '')
      //   //   : result.uri,
      // });

      setDatas({ ...result });
    }
  };

  const upload = () => {
    FileSystem.uploadAsync(
      'https://lovely-test.herokuapp.com/api/user/add/files',
      datas.uri,
      {
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: 'video',
        // parameters: {},
        httpMethod: 'POST',
        mimeType: `video/${datas.uri.split('.')[1]}`,
        headers: {
          Authorization: `Bearer ${props.user?.token}`,
        },
        sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
      }
    )
      .then((res) => {
        setLoading(!loading);
        console.log(res?.body);
        props.navigation.navigate('Videos');
      })
      .catch((err) => {
        setLoading(!loading);
        console.log(err);
      });
  };
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'start',
          width: '100%',
        }}
      >
        <Text>{props.user?.email}</Text>
        <View style={{ width: '50%' }}>
          <Button text="pick a video" onPress={pickVideo} />
        </View>
        {/* {video && ( */}
        {datas?.uri && (
          <>
            <View>
              <Video
                ref={videoRef}
                style={{ width: '100%', height: 400 }}
                source={{
                  uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
                }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </View>
            <View style={{ width: '50%' }}>
              <Button
                text="upload video"
                isLoading={loading}
                onPress={() => {
                  setLoading(!loading);
                  upload();
                  // axios
                  //   .post(
                  //     'https://lovely-test.herokuapp.com/api/user/add/files',
                  //     datas,
                  //     {
                  //       headers: {
                  //         Authorization: `Bearer ${props.user?.token}`,
                  //       },
                  //     }
                  //   )
                  //   .then(({ data }) => {
                  //     console.log('Response', data);
                  //     // setVideo(res);
                  //   })
                  //   .catch((err) => {
                  //     console.log('ERR', err?.response.data);
                  //     setDatas(null);
                  //   });
                }}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
}
