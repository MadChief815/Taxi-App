import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextFieldStyles, TextStyles } from '../../Styles/Styles';
import { Colors } from '../../Styles/Colors';

const CustomFormField = ({ defaultIcon, typingIcon, placeholder, value, onChangeText, isTyping, keyboardtype }) => {
    return (
        <View style={Styles.textInputCont}>
            <View style={{ paddingHorizontal: 16 }}>
                <View style={[TextFieldStyles.TextContainer, { borderBottomWidth: 0 }]}>
                    <View style={TextFieldStyles.IconMainContainer}>
                        <View style={TextFieldStyles.IconContainer}>
                            {isTyping ? typingIcon : defaultIcon}
                        </View>
                    </View>
                    <View style={{ alignContent: "space-between", flex: 1, justifyContent: "center" }}>
                        <TextInput
                            style={[TextStyles.regular16grayscale500, isTyping && TextStyles.regular16grayscale900]}
                            placeholder={placeholder}
                            value={value}
                            onChangeText={onChangeText}
                            keyboardType={keyboardtype}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    textInputCont: {
        height: 56,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: Colors.Grayscale100
    }
});

export default CustomFormField;