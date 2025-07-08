import React from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import { TextStyles } from '../../Styles/Styles';
import { Colors } from '../../Styles/Colors';
import { useNavigation } from '@react-navigation/native';
import BackArrowIcon from "./backarrow.svg";

// Dimensions
const windowWidth = Dimensions.get('window').width;

const HeaderIcon = ({ name, icon }) => {

  // Navigation
  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      {icon && (
        <Pressable onPress={() => navigation.goBack()} style={Styles.BackArrowCont}>
          <BackArrowIcon />
        </Pressable>
      )}
      <View style={Styles.TextContainer}>
        <Text style={TextStyles.SemiBold17grayscale900}>{name}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    alignSelf: "center",
    backgroundColor: Colors.AdditionalWhite,
    height: 48
  },
  TextContainer: {
    height: 24,
  },
  BackArrowCont: {
    position: "absolute",
    left: 0,
    width: 34,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default HeaderIcon;
