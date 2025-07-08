import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchAllAdsData } from '../../Firebase/FireStore/firestoreAds';

// Components
import Card from "../../Components/Cards/HomeCard/Card";
import Pagination from "../../Components/Pagination/Pagination";
import { MainStyles } from '../../Components/Styles/Styles';

// Header
import Header from '../../Components/Headers/SearchResult/SearchResultHeader';

// Data
import { cardData } from "../../src/RidesData";

const SearchResult = () => {

  // StatusBar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('rgba(28, 28, 28, 8)');
      StatusBar.setBarStyle('light-content');
    }, [])
  );

  // Firestore Database
  // Firestore Database
  const [rides, setRides] = useState([]);

  const handleFetchRides = async () => {
    try {
      const data = await fetchAllAdsData();
      setRides(data);
    } catch (error) {
      console.error("Error fetching rides: ", error);
    }
  };

  useEffect(() => {
    handleFetchRides();
  }, []);

  // Paging
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(rides.length / cardsPerPage);
  const currentCards = rides.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <SafeAreaView style={Styles.safeArea}>
      <StatusBar />
      <Header />
      <ScrollView
        contentContainerStyle={MainStyles.ScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Cards */}
        <View style={{ paddingTop: 8, paddingHorizontal: 16 }}>
          {currentCards.map((ride) => (
            <View key={ride.id} style={{ paddingTop: 16 }}>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
});

export default SearchResult;