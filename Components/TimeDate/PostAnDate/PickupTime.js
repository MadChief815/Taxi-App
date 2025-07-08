import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DataToPost from '../../../src/PostanAdData/DatatoPost';

// Styles
import { TextStyles } from '../../Styles/Styles';
import { Colors } from '../../Styles/Colors';

// Icons
import ClockIcon from '../../../assets/SVG/PostAnAdd/clock.svg';
import BoldClockIcon from '../../../assets/SVG/PostAnAdd/boldclock.svg';

const Datejs = ({ setTime }) => {

    // Data To Post
    const {
        setPickUpTimeData
      } = DataToPost(state => state.DTP);

    // Time state
    const [pickupTime, setPickupTime] = useState('');
    const [time, setTimeState] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);

    const toggleTimePicker = () => {
        setShowTimePicker(!showTimePicker);
    };

    const onChangeTime = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        if (Platform.OS === 'android') {
            setShowTimePicker(false);
        }
        setTimeState(currentTime);
        const formattedTime = formatTime(currentTime);
        setPickupTime(formattedTime);
        setPickUpTimeData(formattedTime);
        setTime({ time: formattedTime });
    };

    const formatTime = (rawDate) => {
        let hours = rawDate.getHours();
        let minutes = rawDate.getMinutes();

        minutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${minutes}`;
    };

    return (
        <View style={{ flexDirection: "row", height: 56 }}>
            <View style={[Styles.container]}>
                <View style={{ justifyContent: "center" }}>
                    {showTimePicker && (
                        <DateTimePicker
                            mode="time"
                            display="spinner"
                            value={time}
                            onChange={onChangeTime}
                            style={Styles.picker}
                            is24Hour={true}
                        />
                    )}
                    {showTimePicker && Platform.OS === 'ios' && (
                        <View style={{ flexDirection: "row", justifyContent: "center" }}>
                            <TouchableOpacity onPress={toggleTimePicker}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleTimePicker}>
                                <Text>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    <View style={{ flexDirection: "row" }}>
                        <View style={{}}>
                            <View style={Styles.IconContainer}>
                                {pickupTime ? (
                                    <BoldClockIcon width={24} height={24} />
                                ) : (
                                    <ClockIcon width={24} height={24} />
                                )}
                            </View>
                        </View>
                        {!showTimePicker && (
                            <Pressable onPress={toggleTimePicker}>
                                <TextInput
                                    style={[
                                        TextStyles.regular16grayscale500,
                                        pickupTime ? TextStyles.regular16grayscale900 : null
                                    ]}
                                    placeholder="Add time"
                                    value={pickupTime}
                                    onPressIn={toggleTimePicker}
                                    editable={false}
                                />
                            </Pressable>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        borderWidth: 1.5,
        borderColor: Colors.Grayscale200,
        borderRadius: 8,
        height: 56,
        justifyContent: "center",
        flex: 1
    },
    picker: {
        height: 250,
        marginTop: -10,
    },
    IconContainer: {
        justifyContent: "center",
        paddingHorizontal: 16,
    },
});

export default Datejs;
