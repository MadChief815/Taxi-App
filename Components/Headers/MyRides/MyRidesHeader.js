import React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TextStyles } from '../../Styles/Styles';
import { useFonts } from 'expo-font';

// Dimensions
const windowWidth = Dimensions.get('window').width;

const HeaderIcon = () => {

  // Fonts
  const FontLoader = () => {
    const [fontsLoaded] = useFonts({
      'CBold': require("../../../assets/Fonts/Outfit-Bold.ttf"),
      'CMedium': require("../../../assets/Fonts/Outfit-Medium.ttf"),
      'CBlack': require("../../../assets/Fonts/Outfit-Black.ttf"),
      'CExtraBold': require("../../../assets/Fonts/Outfit-ExtraBold.ttf"),
      'CExtraLight': require("../../../assets/Fonts/Outfit-ExtraLight.ttf"),
      'CLight': require("../../../assets/Fonts/Outfit-Light.ttf"),
      'CRegular': require("../../../assets/Fonts/Outfit-Regular.ttf"),
      'CThin': require("../../../assets/Fonts/Outfit-Thin.ttf"),
    });

    if (!fontsLoaded) {
      return null;
    }

    return null;
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.TextContainer}>
        <Text style={TextStyles.SemiBold17grayscale900}>My Rides</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    alignSelf: "center",
  },
  TextContainer: {
    width: 69, 
    height: 24,
  }
});

export default HeaderIcon;
