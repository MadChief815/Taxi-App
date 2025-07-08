import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Components
import useStore from '../../src/Store';
import AdsStore from '../../src/AdsData/AdsStore';
import { TextStyles } from '../../Components/Styles/Styles';
import { Colors } from '../../Components/Styles/Colors';
import MenuBar from "../../Components/MenuBars/MyAdsMenuBar/MyAdsMenuBar";
import Card from '../../Components/Cards/MyAdsCard/Card';

// Icons
import PlusIcon from "../../assets/SVG/plus.svg";

// Header
import Header from '../../Components/Headers/NormalHeader/NormalHeader';

// Data
import {
  fetchActiveAds,
  fetchCompletedAds,
  fetchGivenAds,
  fetchIncompleteAds,
  fetchRequestedAds,
  fetchReviewAds,
  fetchUntaknAds
} from "../../Firebase/FireStore/firestoreFetchAllAds";
import ActiveData from '../../src/MyAds/Active';
import RequestsData from '../../src/MyAds/Requests';
import GivenData from '../../src/MyAds/Given';
import ReviewData from '../../src/MyAds/Review';
import CompletedData from '../../src/MyAds/Completed';
import IncompleteData from '../../src/MyAds/Incomplete';
import UntakenData from '../../src/MyAds/Untaken';

// Combining all arrays into one
const CombinedData = [
  ...ActiveData,
  ...RequestsData,
  ...GivenData,
  ...ReviewData,
  ...CompletedData,
  ...IncompleteData,
  ...UntakenData
];

// Dimentions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyRides = () => {

  // Selected Data
  const { MAselectedData, MAselectedAd, setMAselectedData } = useStore(state => state.myAds);
  // Data Fetching
  // AdsStore
  const {
    ActveAds, setActveAds,
    RequestsAds, setRequestsAds,
    GivenAds, setGivenAds,
    ReviewAds, setReviewAds,
    CompletedAds, setCompletedAds,
    IncompleteAds, setIncompleteAds,
    UntakenAds, setUntakenAds
  } = AdsStore(state => state.myAdsData);

  // UseFocusEffect
  // StatusBar Settings, Data Fetching
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#FFFFFF');
      StatusBar.setBarStyle('dark-content');
      handleFetchData(fetchActiveAds);
    }, [])
  );


  // Data Fetching
  const handleFetchData = async (fetchFunction) => {
    try {
      const data = await fetchFunction();
      // setMAselectedData(data);
      setActveAds(data)
    } catch (error) {
      console.error("Error fetching ads: ", error);
    }
  };

  // Navigation
  const navigation = useNavigation();

  const handleNavigateAd = (item) => {
    navigation.navigate('ActiveAdScrn', { rideData: item });
  };

  // Render empty state when no rides are available
  const renderEmptyComponent = () => (
    <View style={{ backgroundColor: Colors.AdditionalWhite }}>
      {/* Image */}
      <View style={Styles.imageContainer}>
        <Image
          style={Styles.image}
          source={require("../../assets/Images/MyRides/Illusration.png")}
        />
      </View>
      {/* It looks like */}
      <View style={{ height: 24, alignSelf: "center" }}>
        <Text style={TextStyles.regular16grascale500}>There is no {MAselectedAd} ads.</Text>
      </View>
      {/* Find A Ride Now */}
      <View style={{ height: 24, alignSelf: "center", marginTop: 16 }}>
        <Text style={TextStyles.SemiBold17Yellow}>Create an ad now!</Text>
      </View>
      {/* Post an Add */}
      <View style={{ paddingTop: 114 }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.circleCont_1}
          onPress={() => navigation.navigate("PostanAd")}
        >
          <PlusIcon width={40} height={40} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[Styles.safeArea1, MAselectedData.length <= 2 && Styles.safeArea2]}>
      <StatusBar />
      <Header name={"My Ads"} icon={false} />
      {CombinedData.length >= 1 ? (
        // Main content when rides are available
        <View style={{ flex: 1 }}>
          {/* Menu Bar */}
          <View style={{ paddingBottom: 8 }}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <MenuBar />
            </ScrollView>
          </View>
          {/* FlatList with rides */}
          <FlatList
            data={MAselectedData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleNavigateAd(item)}
                >
                  <Card ride={item} />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={renderEmptyComponent}
          />
          <View style={{ paddingBottom: 24 }} />
          {/* Post an Add */}
          {MAselectedData.length >= 2 ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.circleCont_2}
              onPress={() => navigation.navigate("PostanAd")}
            >
              <PlusIcon width={40} height={40} />
            </TouchableOpacity>
          ) : (null)}
        </View>
      ) : (
        renderEmptyComponent()
      )}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeArea1: {
    flex: 1,
    backgroundColor: Colors.Grayscale50
  },
  safeArea2: {
    flex: 1,
    backgroundColor: Colors.AdditionalWhite
  },
  imageContainer: {
    paddingTop: 96,
    paddingBottom: 16,
    alignItems: "center",
  },
  image: {
    height: 280,
    width: 280,
  },
  circleCont_1: {
    width: 64,
    height: 64,
    backgroundColor: Colors.PrimaryYellow,
    borderRadius: 100,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  circleCont_2: {
    width: 64,
    height: 64,
    backgroundColor: Colors.PrimaryYellow,
    borderRadius: 100,
    position: "absolute",
    bottom: 24,
    right: 16,
    justifyContent: "center",
    alignItems: "center"
  },
});

export default MyRides;
