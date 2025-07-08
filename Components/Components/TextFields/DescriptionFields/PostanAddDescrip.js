import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextFieldStyles, TextStyles } from '../../Styles/Styles';
import { Colors } from '../../Styles/Colors';

const DescriptionComp = ({ placeholder, value, onChangeText, isTyping, keyboardtype }) => {
    return (
        <View style={Styles.textInputCont}>
            <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
                <TextInput
                    style={[TextStyles.regular16grayscale500, isTyping && TextStyles.regular16grayscale900]}
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardtype}
                    multiline
                />
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    textInputCont: {
        height: 152,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: Colors.Grayscale100
    }
});

export default DescriptionComp;