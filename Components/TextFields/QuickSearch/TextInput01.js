import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet
} from 'react-native';
import { Colors } from '../../Styles/Colors';
import { TextFieldStyles, TextStyles } from "../../Styles/Styles";
import useStore from "../../../src/Store";

const TextField01 = ({ icon1: ICON1, icon2: ICON2, icon3: ICON3, text1, text2, text3 }) => {

    const {
        pickupValue, setPickupValue,
        dropValue, setDropValue,
        vehicle, setVehicle,
        DropValueIsTyping, setDropValueIsTyping,
        PickupValueIsTyping, setPickupValueIsTyping,
        VehicleIsTyping, setVehicleIsTyping
    } =  useStore(state => state.search);

    // PickUp Value
    const handlePickupTyping = (text) => {
        setPickupValue(text);
        setPickupValueIsTyping(text.length > 0);
    };

    // Drop Value
    const handleDropTyping = (text) => {
        setDropValue(text);
        setDropValueIsTyping(text.length > 0);
    };

    // Drop Value
    const handleVehicleTyping = (text) => {
        setVehicle(text);
        setVehicleIsTyping(text.length > 0);
    };

    return (
        <View style={{ paddingTop: 20, paddingHorizontal: 16 }}>
            {/* Container01 */}
            <View style={Styles.Container01}>
                <View style={{ paddingHorizontal: 16 }}>
                    {/* PickUp */}
                    <View style={TextFieldStyles.TextContainer}>
                        <View style={TextFieldStyles.IconMainContainer}>
                            <View style={TextFieldStyles.IconContainer}>
                                <ICON1 width={24} height={24} />
                            </View>
                        </View>
                        <View style={{ alignContent: "space-between", flex: 1, justifyContent: "center" }}>
                            <TextInput
                                style={[TextStyles.medium16grayscale500, PickupValueIsTyping && TextStyles.medium16grayscale900]}
                                placeholder={text1}
                                value={pickupValue}
                                onChangeText={handlePickupTyping}
                            />
                        </View>
                    </View>
                    {/* Drop Off */}
                    <View style={[TextFieldStyles.TextContainer, { borderBottomWidth: 0 }]}>
                        <View style={TextFieldStyles.IconMainContainer}>
                            <View style={TextFieldStyles.IconContainer}>
                                <ICON2 width={24} height={24} />
                            </View>
                        </View>
                        <View style={{ alignContent: "space-between", flex: 1, justifyContent: "center" }}>
                            <TextInput
                                style={[TextStyles.medium16grayscale500, DropValueIsTyping && TextStyles.medium16grayscale900]}
                                placeholder={text2}
                                value={dropValue}
                                onChangeText={handleDropTyping}
                            />
                        </View>
                    </View>
                    <View style={{ paddingTop: 24 }} />
                </View>
                {/* Container02 */}
                <View style={Styles.Container02}>
                    <View style={{ paddingHorizontal: 16 }}>
                        {/* Vehicle */}
                        <View style={[TextFieldStyles.TextContainer, { borderBottomWidth: 0 }]}>
                            <View style={TextFieldStyles.IconMainContainer}>
                                <View style={TextFieldStyles.IconContainer}>
                                    <ICON3 width={24} height={24} />
                                </View>
                            </View>
                            <View style={{ alignContent: "space-between", flex: 1, justifyContent: "center" }}>
                                <TextInput
                                    style={[TextStyles.medium16grayscale500, VehicleIsTyping && TextStyles.medium16grayscale900]}
                                    placeholder={text3}
                                    value={vehicle}
                                    onChangeText={handleVehicleTyping}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const Styles = StyleSheet.create({
    Container01: {
        height: 112,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: Colors.Grayscale100
    },
    Container02: {
        height: 56,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: Colors.Grayscale100
    }
})

export default TextField01;
