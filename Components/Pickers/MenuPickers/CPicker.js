import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useStore from '../../../src/Store';
import { Colors } from '../../../Components/Styles/Colors';

const Item = ({ text1, text2 }) => {

    // Conts
    const {
        CCcalls, setCCcalls,
        CChats, setCCchats
    } = useStore(state => state.callsAndChats);

    // Handlers
    const CallsHandler = () => {
        setCCcalls(true);
        setCCchats(false);
    };
    const ChatsHandler = () => {
        setCCcalls(false);
        setCCchats(true);
    };

    return (
        <View style={Styles.Container}>
            {/* Calls */}
            <TouchableOpacity activeOpacity={0.9} onPress={CallsHandler} style={{ flex: 1, paddingLeft: 4 }}>
                <View style={[Styles.ItemConatiner, { backgroundColor: CCcalls ? Colors.AdditionalWhite : Colors.Grayscale100 }]}>
                    <Text style={[Styles.textStyles, { color: CCcalls ? Colors.Grayscale900 : Colors.Grayscale500 }]}>{text1}</Text>
                </View>
            </TouchableOpacity>
            {/* Chats */}
            <TouchableOpacity activeOpacity={0.9} onPress={ChatsHandler} style={{ flex: 1, paddingRight: 4 }}>
                <View style={[Styles.ItemConatiner, { backgroundColor: CChats ? Colors.AdditionalWhite : Colors.Grayscale100 }]}>
                    <Text style={[Styles.textStyles, { color: CChats ? Colors.Grayscale900 : Colors.Grayscale500 }]}>{text2}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    ItemConatiner: {
        height: 28,
        borderRadius: 6,
        elevation: 0.5,
        justifyContent: "center",
        alignItems: "center",
    },
    textStyles: {
        fontFamily: "CMedium",
        fontSize: 14,
        color: Colors.Grayscale500,
        backgroundColor: "transparent"
    },
    Container: {
        flexDirection: "row",
        height: 36,
        backgroundColor: Colors.Grayscale100,
        borderRadius: 8,
        alignItems: "center",
        flex: 1
    }
});

export default Item;