import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import { Audio } from 'expo-av';
import { downloadAudioFromFirebase } from './audiodownload'; 

const AudioPlayerComponent = ({ customId }) => {
  const [sound, setSound] = useState(null);
  const [audioUri, setAudioUri] = useState('');  
  const [isPlaying, setIsPlaying] = useState(false);  

  // Function to load and play the audio
  const loadAndPlayAudio = async () => {
    try {
      if (customId) {
        // Fetch the download URL from Firebase using the customId
        const downloadURL = await downloadAudioFromFirebase(customId);
        setAudioUri(downloadURL);

        // Load the audio
        const { sound } = await Audio.Sound.createAsync(
          { uri: downloadURL },
          { shouldPlay: true }  // Automatically play when loaded
        );
        setSound(sound);
        setIsPlaying(true);
        await sound.playAsync();  // Start playing the audio
      }
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  // Function to stop the audio
  const stopAudio = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error stopping audio:', error);
    }
  };

  // Cleanup when the component unmounts
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();  // Unload the sound to free up resources
        }
      : undefined;
  }, [sound]);

  return (
    <View>
      <Text>Audio Player for ID: {customId}</Text>
      {isPlaying ? (
        <Button title="Stop Audio" onPress={stopAudio} />
      ) : (
        <Button title="Play Audio" onPress={loadAndPlayAudio} />
      )}
      {audioUri ? <Text>Audio File URL: {audioUri}</Text> : null}
    </View>
  );
};

export default AudioPlayerComponent;
