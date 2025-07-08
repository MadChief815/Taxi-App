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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

// Components
import useStore from '../../src/Store';
import { TextStyles } from '../../Components/Styles/Styles';
import { Colors } from '../../Components/Styles/Colors';
import CPicker from "../../Components/Pickers/MenuPickers/CPicker";


// Header
import Header from '../../Components/Headers/NormalHeader/NormalHeader';

// Data
import CallsData from '../../src/Calls&Chats/Calls';
import ChatsData from '../../src/Calls&Chats/Chats';

// Combining all arrays into one
const CombinedData = [
  // ...CallsData,
  // ...ChatsData,
];

const MyRides = () => {

  // Selected Data
  const { CCselectedData } = useStore(state => state.callsAndChats);

   // StatusBar
   useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#FFFFFF');
      StatusBar.setBarStyle('dark-content');
    }, [])
  );

  // Navigation
  const navigation = useNavigation();

  // Render empty state when no rides are available
  const renderEmptyComponent = () => (
    <View style={{ backgroundColor: Colors.Grayscale50, flex: 1 }}>
      {/* Image */}
      <View style={Styles.imageContainer}>
        <Image
          style={Styles.image}
          source={require("../../assets/Images/MyRides/Illusration.png")}
        />
      </View>
      {/* It looks like */}
      <View style={{ height: 24, alignSelf: "center" }}>
        <Text style={TextStyles.regular16grayscale500}>It looks like you have no calls in your list.</Text>
      </View>
      {/* Find A Ride Now */}
      <View style={{ height: 24, alignSelf: "center", marginTop: 16 }}>
        <Text style={TextStyles.SemiBold17Yellow}>Find a friend to call now!</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={Styles.safeArea}>
      <Header name={"Calls & Chats"} icon={false} />
      {/* Menu Bar */}
      <View style={{ paddingBottom: 0, paddingHorizontal: 16,}}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
        >
          <CPicker text1={"Calls"} text2={"Chats"} />
        </ScrollView>
      </View>
      {/* FlatList with Calls or Chats */}
      {/* This part need to first complete by designer !!!! */}
      <FlatList
        data={CCselectedData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ paddingTop: 16, paddingHorizontal: 16 }}>
            {/* Create a Component for Calls or Chats to display them */}
          </View>
        )}
        ListEmptyComponent={renderEmptyComponent}
      />
      <View style={{ paddingBottom: 24 }} />
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
    backgroundColor: Colors.Grayscale50
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
    position: "absolute",
    bottom: 24,
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
