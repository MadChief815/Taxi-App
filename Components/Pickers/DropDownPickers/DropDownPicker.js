import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { Colors } from '../../Styles/Colors';
import { TextStyles, TextFieldStyles } from '../../Styles/Styles';
import { Dropdown } from 'react-native-element-dropdown';

const DropDownPickerComponent = ({ defaultIcon, selectedIcon, placeholder, Data }) => {

    // Consts
    const [isSelected, setIsSelected] = useState(null);

    // Reset
    useEffect(() => {
        setIsSelected(null);
    }, []);

    // Data Handler
    const handleSelectedData = (item) => {
        setIsSelected(item.value);
    };

    return (
        <View style={Styles.container}>
            <View style={{ paddingHorizontal: 16 }}>
                <View style={[TextFieldStyles.TextContainer, { borderBottomWidth: 0 }]}>
                    <View style={TextFieldStyles.IconMainContainer}>
                        <View style={TextFieldStyles.IconContainer}>
                            {isSelected ? selectedIcon : defaultIcon}
                        </View>
                    </View>
                    <View style={{ alignContent: "space-between", flex: 1, justifyContent: "center" }}>
                        <Dropdown
                            style={Styles.dropdown}
                            placeholderStyle={TextStyles.regular16grayscale500}
                            selectedTextStyle={TextStyles.regular16grayscale900}
                            data={Data}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isSelected ? placeholder : '...'}
                            value={isSelected}
                            onChange={handleSelectedData}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        height: 56,
        borderWidth: 1.5,
        borderRadius: 8,
        borderColor: Colors.Grayscale200,
        justifyContent: "center",

    }
});

export default DropDownPickerComponent;