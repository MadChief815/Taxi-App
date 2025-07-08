import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Components
import { TextStyles, TextFieldStyles } from '../../../Components/Styles/Styles';
import { Colors } from '../../../Components/Styles/Colors';
import DataToPost from '../../../src/PostanAdData/DatatoPost';

// Icons
import CalendarIcon from '../../../assets/SVG/PostAnAdd/calender.svg';
import BoldCalendarIcon from '../../../assets/SVG/PostAnAdd/boldcalender.svg';

const Datejs = (setDate) => {

    // Data To Post
    const {
        setDateData
      } = DataToPost(state => state.DTP);

    const [fromdata, setFromDate] = useState("");
    const [date, setDateState] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    // Date
    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker);
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        setDateState(currentDate);
        setFromDate(formatDate(currentDate));
        setDateData(formatDate(currentDate));
        setDate({ date: currentDate });
    };

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${day}/${month}/${year}`;
    };

    return (
        <View style={{ flexDirection: "row", height: 56 }}>
            <View style={Styles.container}>
                <View style={Styles.IconContainer}>
                    {fromdata ? (
                        <BoldCalendarIcon width={24} height={24} />
                    ) : (
                        <CalendarIcon width={24} height={24} />
                    )}
                </View>
                <View style={{ justifyContent: "center" }}>
                    <View style={{}}>
                        {showDatePicker && (
                            <DateTimePicker
                                mode="date"
                                display="spinner"
                                value={date}
                                onChange={onChangeDate}
                                style={Styles.picker}
                            />
                        )}
                        {showDatePicker && Platform.OS === 'ios' && (
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <TouchableOpacity onPress={toggleDatePicker}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={toggleDatePicker}>
                                    <Text>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <View style={{ justifyContent: "center" }}>
                            {!showDatePicker && (
                                <Pressable onPress={toggleDatePicker}>
                                    <TextInput
                                        style={[
                                            TextStyles.regular16grayscale500,
                                            fromdata ? TextStyles.regular16grayscale900 : null
                                        ]}
                                        placeholder="Add pickup date"
                                        value={fromdata}
                                        onPressIn={toggleDatePicker}
                                        editable={false}
                                    />
                                </Pressable>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        borderWidth: 1.5,
        borderRadius: 8,
        borderColor: Colors.Grayscale200
    },
    picker: {
        height: 150,
        marginTop: -10
    },
    IconContainer: {
        justifyContent: "center",
        paddingHorizontal: 16
    }
});

export default Datejs;
