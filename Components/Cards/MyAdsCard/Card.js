import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { Colors } from '../../Styles/Colors';
import { TextStyles } from '../../Styles/Styles';
import useStore from '../../../src/Store';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

// Icons
import StarIcon from "./star.svg";
import CalendarIcon from "./calendar.svg";
import CarIcon from "./car.svg";
import TeamIcon from "./team.svg";
import ClockIcon from './clock.svg';
import VoiceClipIcon from "./voice.svg";
import PressedClipIcon from "./greenclip.svg";
import ArrowIcon from './Vector.svg'

const Card = ({ ride }) => {

  // Consts
  const [clipPressed, setClipPressed] = useState(false)

  // Selected Data
  const { MAselectedAd } = useStore(state => state.myAds);

  // Selected Card Color Type
  const selectedCardColor = () => {
    switch (MAselectedAd) {
      case "Active":
        return { backgroundColor: "transparent" }
      case "Requested":
        return { backgroundColor: '#FFB715' };
      case "Given":
        return { backgroundColor: '#429DFF' };
      case "Review":
        return { backgroundColor: '#5A308C' };
      case "Completed":
        return { backgroundColor: '#97DB43' };
      case "Incomplete":
        return { backgroundColor: '#979797' };
      case "Untaken":
        return { backgroundColor: '#DADADA' };
    }
  };

  // Selected Card Name
  const selectedCardName = () => {
    switch (MAselectedAd) {
      case "Active":
        return "Active";
      case "Requests":
        return "Requests";
      case "Given":
        return "Given";
      case "Review":
        return "Dropped";
      case "Completed":
        return "Completed";
      case "Incomplete":
        return "Incomplete";
      case "Untaken":
        return "Untaken";
    }
  };

  // Function to calculate the time difference between two dates
  const calculateTimeDifference = (publishedTime) => {
    const currentDate = new Date();

    // Parse the publishedTime (assumes format "YYYY-MM-DD HH:MM:SS")
    const publishedDate = new Date(publishedTime);

    // Get the difference in milliseconds
    const timeDifferenceMs = currentDate - publishedDate;

    // Convert milliseconds to seconds, minutes, hours, days
    const seconds = Math.floor(timeDifferenceMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Return the time difference in the most significant unit
    if (days > 0) {
      return `${days} d`;
    } else if (hours > 0) {
      return `${hours} h`;
    } else if (minutes > 0) {
      return `${minutes} m`;
    } else {
      return `Just now`;
    }
  };

  // Function to fetch and compare the time since it was published
  const [timeSincePublished, setTimeSincePublished] = useState("");

  const fetchAdDataAndCompareTime = async () => {
    try {
      const publishedTime = ride.PublishedTime;
      const timeSincePublished = calculateTimeDifference(publishedTime);
      setTimeSincePublished(timeSincePublished)

      console.log(`This ad was published ${timeSincePublished}`);
    } catch (error) {
      console.error("Error fetching ad data:", error);
    }
  };

  // Call Date Compare
  useEffect(() => {
    fetchAdDataAndCompareTime();

    const intervalId = setInterval(() => {
      fetchAdDataAndCompareTime();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={Styles.Container}>
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
                <Text style={[TextStyles.regular14grayscale500, { paddingRight: 8 }]}>{timeSincePublished}</Text>
                {/* Ratings */}
                <View style={{ height: 20, width: 68, flexDirection: "row", alignItems: "center" }}>
                  {/* Star Icon */}
                  <StarIcon width={12} height={12} />
                  {/* Ratings */}
                  {/* <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 4 }]}>{ride.Ratings} {ride.Raters}</Text> */}
                  <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 4 }]}>4.5 (128)</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Type Container */}
        <View style={{ paddingRight: 16, paddingTop: 32, }}>
          <View style={[Styles.RideType, selectedCardColor()]}>
            <Text style={TextStyles.SemiBold12White}>{selectedCardName()}</Text>
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
              <Text style={TextStyles.bold17grayscale900}>{ride.PickUpTown}</Text>
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
            <Text style={TextStyles.bold17grayscale900}>{ride.DropOffTown}</Text>
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
              <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.PickUpDate}</Text>
            </View>
            {/* Time */}
            <View style={{ paddingTop: 8 }}>
              <View style={{ flexDirection: "row", height: 20, }}>
                <ClockIcon />
                <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.PickUpTime}</Text>
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
              <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.VehicleType}</Text>
            </View>
            {/* Number of People */}
            <View style={{ paddingTop: 8 }}>
              <View style={{ flexDirection: "row", height: 20, }}>
                <TeamIcon />
                <Text style={[TextStyles.regular14grayscale500, { paddingLeft: 16 }]}>{ride.PassengerCount}</Text>
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
        <View style={{ bottom: 8 }}>
          <Pressable onPress={() => setClipPressed(prevState => !prevState)}>
            {!clipPressed ? <VoiceClipIcon /> : <PressedClipIcon />}
          </Pressable>
        </View>
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
