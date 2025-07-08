import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Alert
} from 'react-native';
import { Colors } from '../../Components/Styles/Colors';
import { TextStyles } from '../../Components/Styles/Styles';
import { Audio } from 'expo-av';
import useStore from '../../src/Store';
import DataToPost from '../../src/PostanAdData/DatatoPost';
import Slider from '@react-native-community/slider';

// Icons
import RecordIcon from "./record.svg";
import PressedRecordIcon from "./pressedrec.svg";
import PlayIcon from "./play.svg";
import StopIcon from "./stop.svg";

const playbackSpeeds = [1.0, 1.5, 2.0];

const VoiceComponent = () => {
    const { setPAAvoiceDelete } = useStore(state => state.PostAnAdd);
    const {
        PAAVCrecordingUri,
        setPAAVCrecordingUri,
        PAAVCsound,
        setPAAVCsound,
        PAAVCisPlaying,
        setPAAVCisPlaying
    } = useStore(state => state.PAAVoiceClip);

    // Copying Data To Post
    const { 
        setRecordedAudioData
    } = DataToPost(state => state.DTP)

    const [recording, setRecording] = useState(null);
    const [playbackSpeedIndex, setPlaybackSpeedIndex] = useState(0);
    const [positionMillis, setPositionMillis] = useState(0);
    const [durationMillis, setDurationMillis] = useState(0);

    useEffect(() => {
        return () => {
            if (PAAVCsound) {
                PAAVCsound.unloadAsync();
            }
            if (recording) {
                recording.stopAndUnloadAsync();
            }
        };
    }, [PAAVCsound, recording]);

    const askForPermissions = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        return status === 'granted';
    };

    const startRecording = async () => {
        const hasPermission = await askForPermissions();
        if (hasPermission) {
            try {
                const recording = new Audio.Recording();
                await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                await recording.startAsync();
                setPositionMillis(0);
                setDurationMillis(0);
                setRecording(recording);
            } catch (error) {
                Alert.alert('Recording Error', 'Failed to start recording');
            }
        } else {
            Alert.alert('Permission Required', 'Permission to access microphone is required!');
        }
    };

    const stopRecording = async () => {
        if (recording) {
            try {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();
                setPAAVCrecordingUri(uri);
                setRecordedAudioData(uri);
                setRecording(null);
                setPAAvoiceDelete(false);
            } catch (error) {
                Alert.alert('Recording Error', 'Failed to stop recording');
            }
        }
    };

    const playRecording = async () => {
        if (PAAVCrecordingUri) {
            try {
                if (PAAVCsound) {
                    // If sound is already loaded, just start playback from the current position
                    await PAAVCsound.playAsync();
                    PAAVCsound.setRateAsync(playbackSpeeds[playbackSpeedIndex], true);
                    PAAVCsound.setPositionAsync(positionMillis); // Start from saved position
                } else {
                    // Load and play if not loaded
                    const { sound } = await Audio.Sound.createAsync(
                        { uri: PAAVCrecordingUri },
                        { shouldPlay: true, rate: playbackSpeeds[playbackSpeedIndex] }
                    );
                    setPAAVCsound(sound);
                    sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
                    sound.setPositionAsync(positionMillis); // Start from saved position
                }
                setPAAVCisPlaying(true);
            } catch (error) {
                console.error("Error playing recording:", error);
            }
        }
    };

    const stopPlayback = async () => {
        if (PAAVCsound) {
            try {
                if (PAAVCisPlaying) {
                    await PAAVCsound.stopAsync();
                }
                // Do not unload the sound here
                setPAAVCisPlaying(false);
            } catch (error) {
                console.error("Error stopping playback:", error);
            }
        }
    };

    const togglePlayback = async () => {
        try {
            if (PAAVCisPlaying) {
                await stopPlayback();
            } else {
                await playRecording();
            }
        } catch (error) {
            console.error("Error toggling playback:", error);
        }
    };

    const cyclePlaybackSpeed = () => {
        const nextIndex = (playbackSpeedIndex + 1) % playbackSpeeds.length;
        setPlaybackSpeedIndex(nextIndex);
        if (PAAVCsound && PAAVCisPlaying) {
            PAAVCsound.setRateAsync(playbackSpeeds[nextIndex], true);
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPositionMillis(status.positionMillis);
            setDurationMillis(status.durationMillis);
            if (status.didJustFinish) {
                setPAAVCisPlaying(false);
            }
        }
    };

    useEffect(() => {
        return () => {
            if (PAAVCsound) {
                PAAVCsound.unloadAsync();
            }
            if (recording) {
                recording.stopAndUnloadAsync();
            }
        };
    }, [PAAVCsound, recording]);

    const formattedPlaybackSpeed = playbackSpeeds[playbackSpeedIndex].toFixed(1);

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const thumbImage = require("./ElipseN.png");

    return (
        PAAVCrecordingUri == null ? (
            <View style={Styles.Container}>
                <View style={{ paddingHorizontal: 16 }}>
                    <Pressable
                        onPress={recording ? stopRecording : startRecording}
                        style={Styles.pressableCont}
                    >
                        <Text style={TextStyles.regular16grayscale500}>Add a voice message</Text>
                        <View style={[Styles.recordCont, recording && Styles.recordContPressed]}>
                            {!recording ? <RecordIcon width={24} height={24} /> : <PressedRecordIcon width={24} height={24} />}
                        </View>
                    </Pressable>
                </View>
            </View>
        ) : (
            <View style={Styles.Container}>
                <View style={{ paddingHorizontal: 16, paddingVertical: 16, flexDirection: "row" }}>
                    <View style={Styles.Cont2}>
                        <Pressable onPress={cyclePlaybackSpeed}>
                            <Text style={TextStyles.Medium14Yellow}>{formattedPlaybackSpeed}x</Text>
                        </Pressable>
                        <View style={{ paddingHorizontal: 16 }}>
                            <Pressable
                                onPress={togglePlayback}
                                style={[Styles.recordCont, PAAVCisPlaying && Styles.recordContPressed]}
                            >
                                {!PAAVCisPlaying ? <PlayIcon width={24} height={24} /> : <StopIcon width={24} height={24} />}
                            </Pressable>
                        </View>
                    </View>
                    <Slider
                        value={positionMillis}
                        minimumValue={0}
                        maximumValue={durationMillis}
                        disabled={false}
                        onValueChange={value => {
                            if (PAAVCsound) {
                                PAAVCsound.setPositionAsync(value);
                            }
                        }}
                        onSlidingComplete={value => {
                            if (PAAVCsound) {
                                PAAVCsound.setPositionAsync(value);
                            }
                        }}
                        style={Styles.slider}
                        minimumTrackTintColor={Colors.Grayscale500}
                        maximumTrackTintColor={Colors.Grayscale200}
                        thumbTintColor={Colors.Grayscale500}
                        thumbImage={thumbImage}
                    />
                    <View style={Styles.timeContainer}>
                        <Text style={TextStyles.regular12grayscale500}>{formatTime(positionMillis)}</Text>
                    </View>
                </View>
            </View>
        )
    );
};

const Styles = StyleSheet.create({
    Container: {
        height: 72,
        borderWidth: 1.5,
        borderColor: Colors.Grayscale200,
        borderRadius: 8,
        justifyContent: "center"
    },
    pressableCont: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    recordCont: {
        height: 40,
        width: 40,
        backgroundColor: Colors.Grayscale200,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    recordContPressed: {
        height: 40,
        width: 40,
        backgroundColor: Colors.AdditionalGreen,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    Cont2: {
        height: 40,
        alignItems: "center",
        flexDirection: "row"
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 8
    },
    slider: {
        height: 40,
        flex: 1
    },
});

export default VoiceComponent;
