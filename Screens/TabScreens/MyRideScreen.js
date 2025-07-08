import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Components
import useStore from '../../src/Store';
import { TextStyles } from '../../Components/Styles/Styles';
import { Colors } from '../../Components/Styles/Colors';
import MenuBar from "../../Components/MenuBars/MyRidesMenuBar/MenuBar";
import Card from '../../Components/Cards/MyRidesCard/Card';

// Header
import Header from '../../Components/Headers/NormalHeader/NormalHeader';

// Data
import RequestData from '../../src/MyRides/Requested';
import WaitingToReviewData from '../../src/MyRides/Waiting';
import IncompleteData from '../../src/MyRides/Incomplete';
import CompletedData from '../../src/MyRides/Completed';
import RidingData from '../../src/MyRides/Riding';

// Combining all arrays into one
const CombinedData = [
  ...RequestData,
  ...WaitingToReviewData,
  ...IncompleteData,
  ...CompletedData,
  ...RidingData
];

const MyRides = () => {

  // Selected Data
  const { MRselectedData } = useStore(state => state.myRides)

  // StatusBar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#FFFFFF');
      StatusBar.setBarStyle('dark-content');
    }, [])
  );

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
        <Text style={TextStyles.regular16grayscale500}>It looks like you have no ads in your list.</Text>
      </View>
      {/* Find A Ride Now */}
      <View style={{ height: 24, alignSelf: "center", marginTop: 16 }}>
        <Text style={TextStyles.SemiBold17Yellow}>Create a ad now!</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={Styles.safeArea}>
      <StatusBar />
      <Header name={"My Rides"} icon={false} />
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
            data={MRselectedData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
                <Card ride={item} />
              </View>
            )}
            ListEmptyComponent={renderEmptyComponent}
          />
          <View style={{ paddingBottom: 24 }} />
        </View>
      ) : (
        renderEmptyComponent()
      )}
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.Grayscale50
  },
  imageContainer: {
    paddingTop: 96,
    paddingBottom: 16,
    alignItems: "center",
  },
  image: {
    height: 280,
    width: 280,
  }
});

export default MyRides;
