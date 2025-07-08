import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { fetchAllAdsData } from '../../Firebase/FireStore/firestoreAds';

const FontLoader = ({ children }) => {
  const [fontsLoaded] = useFonts({
    'CBold': require("./Outfit-Bold.ttf"),
    'CSemiBold': require("./Outfit-SemiBold.ttf"),
    'CMedium': require("./Outfit-Medium.ttf"),
    'CBlack': require("./Outfit-Black.ttf"),
    'CExtraBold': require("./Outfit-ExtraBold.ttf"),
    'CExtraLight': require("./Outfit-ExtraLight.ttf"),
    'CLight': require("./Outfit-Light.ttf"),
    'CRegular': require("./Outfit-Regular.ttf"),
    'CThin': require("./Outfit-Thin.ttf"),
  });

  // Firestore Database
  const handlefetchAllAds = async () => {
    try {
      const data = await fetchAllAdsData();
    } catch (error) {
      console.error("Error fetching rides: ", error);
    }
  };

  useEffect(() => {
    handlefetchAllAds();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FontLoader;
