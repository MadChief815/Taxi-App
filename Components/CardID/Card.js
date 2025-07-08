import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useFonts } from 'expo-font';
import { Colors } from '../Styles/Colors';
import { TextStyles } from '../Styles/Styles';
import { useAppContext } from '../../src/AppContext';

// Icons
import HeartIcon from "./heart.svg";
import StarIcon from "./star.svg";
import CalendarIcon from "./calendar.svg";
import CarIcon from "./car.svg";
import TeamIcon from "./team.svg";
import ClockIcon from './clock.svg';
import VoiceClipIcon from "./voice.svg";
import PressedClipIcon from "./greenclip.svg";
import ArrowIcon from './Vector.svg'

// MyRides Data
import RequestData from "../../src/MyRides/Requested";
import CompletedData from '../../src/MyRides/Completed';
import IncompleteData from '../../src/MyRides/Incomplete';
import RidingData from '../../src/MyRides/Riding';
import WaitingToReviewData from '../../src/MyRides/Waiting';

const Card = ({ ride }) => {

  // Fonts
  const FontLoader = () => {
    const [fontsLoaded] = useFonts({
      'CBold': require("../../assets/Fonts/Outfit-Bold.ttf"),
      'CSemiBold': require("../../assets/Fonts/Outfit-SemiBold.ttf"),
      'CMedium': require("../../assets/Fonts/Outfit-Medium.ttf"),
      'CBlack': require("../../assets/Fonts/Outfit-Black.ttf"),
      'CExtraBold': require("../../assets/Fonts/Outfit-ExtraBold.ttf"),
      'CExtraLight': require("../../assets/Fonts/Outfit-ExtraLight.ttf"),
      'CLight': require("../../assets/Fonts/Outfit-Light.ttf"),
      'CRegular': require("../../assets/Fonts/Outfit-Regular.ttf"),
      'CThin': require("../../assets/Fonts/Outfit-Thin.ttf"),
    });

    if (!fontsLoaded) {
      return null;
    }

    return null;
  };

  // Consts
  const [clipPressed, setClipPressed] = useState(false)

  // Selected Data
  const { MRselectedData } = useAppContext();

  // Selected Card Type
  const selectedCardColor = () => {
    switch (MRselectedData) {
      case RequestData:
        return { backgroundColor: '#FFB715' };
      case CompletedData:
        return { backgroundColor: '#97DB43' };
      case IncompleteData:
        return { backgroundColor: '#979797' };
      case RidingData:
        return { backgroundColor: '#429DFF' };
      case WaitingToReviewData:
        return { backgroundColor: '#5A308C' };
    }
  };

  return (
    <View style={Styles.Container}>
      <FontLoader />
      {/* User and Favorite */}
      <View style={{ flexDirection: "row" }}>
        {/* User Container */}
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
          <View style={Styles.user}>
            {/* Icon */}
            <View style={{ paddingVertical: 4, paddingRight: 12 }}>
              <Image
                style={{ width: 32, height: 32 }}
                source={require("./profile.png")}
              />
            </View>
            {/* Name And Details */}
            <View style={{ height: 40 }}>
              {/* Name */}
              <View style={{ height: 20 }}>
                <Text style={TextStyles.Medium14grayscale900}>{ride.DriverName}</Text>
              </View>
              {/* Details */}
              <View style={{ height: 20, width: 110, flexDirection: "row" }}>
                {/* Time */}
                <Text style={[TextStyles.regular14grayscale500, { paddingRight: 8 }]}>{ride.Time}</Text>
                {/* Ratings */}
                <View style={{ height: 20, width: 68, flexDirection: "row", alignItems: "center" }}>
                  {/* Star Icon */}
                  <StarIcon width={12} height={12} />
                  {/* Ratings */}
                  <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 4 }]}>{ride.Ratings} {ride.Raters}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Favorite Container */}
        <View style={{ paddingRight: 16, paddingTop: 32, }}>
          <View style={[Styles.RideType, selectedCardColor() ]}>
            <Text style={TextStyles.SemiBold12White}>Requested</Text>
          </View>
        </View>
      </View>
      {/* From and To */}
      <View style={{ paddingTop: 24, paddingHorizontal: 16 }}>
        <View style={{ height: 48, flexDirection: "row" }}>
          {/* From */}
          <View style={{ height: 48 }}>
            {/* Location Name */}
            <View style={{ height: 24 }}>
              <Text style={TextStyles.bold17grayscale900}>Katunayaka</Text>
            </View>
            {/* District */}
            <Text style={[TextStyles.regular14grayscale500, { paddingTop: 4 }]}>District</Text>
          </View>
          {/* Icon */}
          <View style={{ paddingHorizontal: 8 }}>
            <View style={{ width: 24, height: 24, justifyContent: "center", alignItems: "center" }}>
              <ArrowIcon />
            </View>
          </View>
          {/* To */}
          <View style={{ height: 48 }}>
            {/* Location Name */}
            <Text style={TextStyles.bold17grayscale900}>Arugam Bay</Text>
            {/* District */}
            <Text style={[TextStyles.regular14grayscale500, { paddingTop: 4 }]}>District</Text>
          </View>
        </View>
      </View>
      {/* Info */}
      <View style={{ paddingTop: 24, paddingHorizontal: 16 }}>
        <View style={{ height: 48, flexDirection: "row" }}>
          {/* Date and Time */}
          <View style={{ height: 48, width: 155 }}>
            {/* Date */}
            <View style={{ flexDirection: "row", height: 20 }}>
              <CalendarIcon />
              <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.Date}</Text>
            </View>
            {/* Time */}
            <View style={{ paddingTop: 8 }}>
              <View style={{ flexDirection: "row", height: 20, }}>
                <ClockIcon />
                <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.PublishedTime}</Text>
              </View>
            </View>
          </View>
          {/* Padding */}
          <View style={{ paddingLeft: 16 }} />
          {/* Vehicle Type and Number of People */}
          <View style={{ height: 48, width: 155 }}>
            {/* Vehicle Type */}
            <View style={{ flexDirection: "row", height: 20 }}>
              <CarIcon />
              <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.Car}</Text>
            </View>
            {/* Number of People */}
            <View style={{ paddingTop: 8 }}>
              <View style={{ flexDirection: "row", height: 20, }}>
                <TeamIcon />
                <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.Seats}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* Price and Voice Clip */}
      <View style={{ paddingTop: 24, paddingHorizontal: 16, flexDirection: "row" }}>
        {/* Price */}
        <View style={{ height: 24, justifyContent: "center", flex: 1 }}>
          <Text style={TextStyles.medium16grayscale900}>{ride.Price}</Text>
        </View>
        {/* Voice Clip */}
        <Pressable onPress={() => setClipPressed(prevState => !prevState)}>
          {!clipPressed ? <VoiceClipIcon /> : <PressedClipIcon />}
        </Pressable>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  Container: {
    height: 272,
    backgroundColor: Colors.AdditionalWhite,
    borderRadius: 12,
    elevation: 1,
    shadowColor: Colors.Grayscale50,
  },
  user: {
    height: 40,
    flexDirection: "row",
  },
  RideType: {
    height: 20,
    backgroundColor: Colors.PrimaryYellow,
    justifyContent: "center",
    paddingHorizontal: 4,
    borderRadius: 4
  }
});

export default Card;
