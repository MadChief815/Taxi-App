import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextStyles } from '../Styles/Styles';
import { Colors } from '../Styles/Colors';

const Button01 = ({ text }) => {

    // Consts

    // const AllValue = pickupValue && vehicle && dropValue;

    // Navigation
    const navigation = useNavigation();
    const handlePost = () => {
        navigation.goBack();
    };

    return (
        // Button
        <TouchableOpacity
            onPress={handlePost}
            activeOpacity={0.8}
            style={[Styles.ButtonContainer, AllValue && { backgroundColor: Colors.PrimaryYellow }]}
        >
            <View style={{ width: 54, height: 24 }}>
                <Text style={[TextStyles.SemiBold17grayscale500, AllValue && { color: Colors.AdditionalWhite }]}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const Styles = StyleSheet.create({
    ButtonContainer: {
        height: 58,
        borderRadius: 8,
        backgroundColor: Colors.Grayscale200,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
});

export default Button01;