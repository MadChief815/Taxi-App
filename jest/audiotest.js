import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import { Audio } from 'expo-av';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addNewAdData } from '../Firebase/FireStore/firestoreAds';
import AudioPlayerComponent from './audioplayer';  // Import the audio player

const RecordingComponent = () => {
  const [recording, setRecording] = useState(null);
  const [audioUri, setAudioUri] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);  // Track upload progress
  const [customId, setCustomId] = useState(''); // State to store customId for naming the audio file

  // Function to start recording
  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.granted) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const recording = new Audio.Recording();
        await recording.prepareToRecordAsync({
          android: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
            audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.m4a',
            outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
            audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
        });
        await recording.startAsync();
        setRecording(recording);
      }
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  // Function to stop recording
  const stopRecording = async () => {
    try {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setAudioUri(uri);

      // Add new ad and get customId
      const newAd = { /* Your ad data */ };
      const customId = await addNewAdData(newAd);  // Get customId from Firestore
      setCustomId(customId);

      // Upload the audio with customId as the file name
      uploadAudioToFirebase(uri, customId);
    } catch (err) {
      console.error('Failed to stop recording', err);
    }
  };

  // Function to upload audio to Firebase Storage
  const uploadAudioToFirebase = async (uri, customId) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `Audio/${customId}.m4a`);

      // Convert URI to a Blob
      const response = await fetch(uri);
      const blob = await response.blob();

      // Start uploading the audio file
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);  // Update progress state
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Failed to upload audio', error);
        },
        async () => {
          // Get download URL after upload is complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('Audio available at:', downloadURL);
        }
      );
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Button title="Start Recording" onPress={startRecording} />
      <Button title="Stop Recording" onPress={stopRecording} disabled={!recording} />
      {audioUri ? <Text>Audio Recorded: {audioUri}</Text> : null}
      {uploadProgress > 0 && uploadProgress < 100 ? (
        <Text>Upload Progress: {uploadProgress.toFixed(2)}%</Text>
      ) : null}
      {customId ? <AudioPlayerComponent customId={customId} /> : null}
    </View>
  );
};

export default RecordingComponent;
