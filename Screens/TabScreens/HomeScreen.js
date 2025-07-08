import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Animated,
  Dimensions,
  View,
  Text,
  Image
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllAdsData } from '../../Firebase/FireStore/firestoreAds';

// Components
import useStore from "../../src/Store";
import { Colors } from '../../Components/Styles/Colors';
import { MainStyles, TextStyles } from '../../Components/Styles/Styles';
import TextField01 from "../../Components/TextFields/QuickSearch/TextInput01";
import CButton from "../../Components/Buttons/SearchButtonInHome/Button";
import MenuItem from "../../Components/MenuBars/HomeMenuBar/MenuBarItem";
import Card from "../../Components/Cards/HomeCard/Card";
import Pagination from "../../Components/Pagination/Pagination";

// Icons
import PickArrowIcon from '../../assets/SVG/QuickSearch/arrow.svg';
import LocationIcon from '../../assets/SVG/QuickSearch/location.svg';
import VehicleIcon from '../../assets/SVG/QuickSearch/vehicle.svg';

// Headers
import HomeHeader from '../../Components/Headers/HomeHeader/HomeHeader';
import HomeHeaderScrolled from '../../Components/Headers/HomeHeader/HomeHeaderScrolled';

// Dimentions
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  // StatusBar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('rgba(28, 28, 28, 8)');
      StatusBar.setBarStyle('light-content');
      handlefetchAllAds();
    }, [])
  );

  // Firestore Database
  const [rides, setRides] = useState([]);

  const handlefetchAllAds = async () => {
    try {
      const data = await fetchAllAdsData();
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides: ", error);
    }
  };

  useEffect(() => {
    handlefetchAllAds();
  }, []);

  // Scrolled and NonScrolled Header
  const { downArrow, setDownArrow } = useStore(state => state.app);
  const [scrolled, setScrolled] = useState(false);
  const scrollY = new Animated.Value(0);
  const HEADER_TITLE_HEIGHT = 420;

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  useEffect(() => {
    if (downArrow) {
      scrollToTop();
    }
  }, [downArrow]);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > HEADER_TITLE_HEIGHT) {
        setScrolled(true);
        setDownArrow(false);
      } else {
        setScrolled(false);
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY, setScrolled, setDownArrow]);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

  // Ref for ScrollView
  const scrollViewRef = React.useRef(null);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(rides.length / cardsPerPage);
  const currentCards = rides.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // This is test version by develope(Design was not completed yet)
  // Render empty state when no rides are available
  const renderEmptyComponent = () => (
    <View style={{ backgroundColor: Colors.AdditionalWhite, flex: 1 }}>
      {/* Image */}
      <View style={Styles.imageContainer}>
        <Image
          style={Styles.image}
          source={require("../../assets/Images/MyRides/Illusration.png")}
        />
      </View>
      {/* It looks like */}
      <View style={{ height: 24, alignSelf: "center" }}>
        <Text style={TextStyles.regular16grayscale500}>It looks there is no rides available at the moment.</Text>
      </View>
      {/* Find A Ride Now */}
      <View style={{ height: 24, alignSelf: "center", marginTop: 16 }}>
        <Text style={TextStyles.SemiBold17Yellow}>Check your internet connection and try again!</Text>
      </View>
      <View style={{ paddingBottom: 40 }} />
    </View>
  );

  return (
    <SafeAreaView style={Styles.safeArea}>
      <StatusBar />
      {scrolled ? <HomeHeaderScrolled /> : <HomeHeader />}
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        contentContainerStyle={MainStyles.ScrollContainer}
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
      >
        {/* Quick Search */}
        <View style={Styles.QuickSearchContainer}>
          {/* Why Wait */}
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            <Text style={[TextStyles.bold24grayscale50, { height: 32 }]}>Why wait, find a pickup!</Text>
          </View>
          {/* SearchBox */}
          <View style={{ paddingHorizontal: 16, paddingTop: 24 }}>
            <View style={Styles.SearchBoxContainer}>
              {/* Quick Search Text */}
              <View style={{ paddingTop: 20, alignItems: "center" }}>
                <Text style={[TextStyles.bold20grayscale500, { height: 24, width: 140 }]}>Quick Search</Text>
              </View>
              {/* Options Container */}
              <View style={{ flex: 1 }}>
                <TextField01
                  text1={"Pickup"}
                  icon1={PickArrowIcon}
                  text2={"Drop Off"}
                  icon2={LocationIcon}
                  text3={"Vehicle Type"}
                  icon3={VehicleIcon}
                />
              </View>
              {/* Search Button */}
              <View style={{ alignItems: "center", paddingBottom: 16, paddingHorizontal: 16 }}>
                <CButton text={"Search"} navigate={"SearchResult"} />
              </View>
            </View>
          </View>
        </View>
        {/* Menu Bar and Empty Component */}
        {rides.length >= 1 ? (
          <View style={{ paddingTop: 96 }}>
            <View style={{ paddingHorizontal: 16 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {/* All */}
                <MenuItem />
              </ScrollView>
            </View>
            {/* Cards */}
            <View style={{ paddingHorizontal: 16 }}>
              {currentCards.map((ride, index) => (
                <View key={ride.id} style={{ paddingTop: index === 0 ? 0 : 16 }}>
                  <Card ride={ride} />
                </View>
              ))}
            </View>
            {/* Pagination */}
            <View style={{ paddingBottom: 24, paddingTop: 24 }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </View>
          </View>
        ) : (
          renderEmptyComponent()
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.Grayscale500,
  },
  QuickSearchContainer: {
    backgroundColor: 'rgba(28, 28, 28, 8)',
    height: 344
  },
  SearchBoxContainer: {
    height: 360,
    backgroundColor: Colors.AdditionalWhite,
    borderRadius: 12,
    elevation: 0.5
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
});

export default App;
