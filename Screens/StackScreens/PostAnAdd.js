import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  Pressable
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import useStore from '../../src/Store';
import DataToPost from '../../src/PostanAdData/DatatoPost';

// Components
import { rgbaColors, Colors } from '../../Components/Styles/Colors';
import { MainStyles, TextStyles } from '../../Components/Styles/Styles';
import CustomFormField from '../../Components/TextFields/CustomTextInput01/CustomTextInput01';
import CPicker from '../../Components/Pickers/MenuPickers/CPicker';
import DatePicker from '../../Components/TimeDate/PostAnDate/DatePicker';
import PickupTimePicker from '../../Components/TimeDate/PostAnDate/PickupTime';
import DropoffTimePicker from "../../Components/TimeDate/PostAnDate/DropoffTime";
import VehiclePicker from "../../Components/Pickers/DropDownPickers/PostanAd/VehiclePicker";
import PassengersPicker from "../../Components/Pickers/DropDownPickers/PostanAd/PassengersPicker";
import CustomDescription from '../../Components/TextFields/DescriptionFields/PostanAddDescrip';
import VoiceComponent from '../../Components/VoiceClip/VoiceClip';
import Button from '../../Components/Buttons/PostanAd/Button01';

// Header
import Header from '../../Components/Headers/NormalHeader/NormalHeader';

// Icons
import TownIcon from "../../Components/TextFields/CustomTextInput01/town.svg";
import BoldTownIcon from "../../Components/TextFields/CustomTextInput01/BoldTown.svg";
import LocationIcon from "../../Components/TextFields/CustomTextInput01/location.svg";
import BoldLocationIcon from "../../Components/TextFields/CustomTextInput01/BoldLocation.svg";
import CarIcon from "../../assets/SVG/PostAnAdd/car.svg";
import BoldCarIcon from "../../assets/SVG/PostAnAdd/boldCar.svg";
import PassengersIcon from "../../assets/SVG/PostAnAdd/passengers.svg";
import BoldPassengersIcon from "../../assets/SVG/PostAnAdd/boldpassengers.svg";
import PriceIcon from "../../assets/SVG/PostAnAdd/money.svg";
import BoldPriceIcon from "../../assets/SVG/PostAnAdd/boldmoney.svg";
import CloseIcon from "../../assets/SVG/PostAnAdd/close.svg";

// Data
import { VehiclesData } from '../../src/VehiclesData';
import { PassengersCountData } from '../../src/PassengersCount';

const SearchResult = () => {

  // useStore Consts
  const { PAAvoiceDelete, setPAAvoiceDelete } = useStore(state => state.PostAnAdd);
  const {
    PAAVCrecordingUri,
    setPAAVCrecordingUri,
    setPAAVCsound,
    setPAAVCisPlaying
  } = useStore(state => state.PAAVoiceClip);

  // Copying Data To Post
  const { 
    setPickUpTownData,
    setPickUpLocationData,
    setDropOffTownData,
    setDropOffLocationData,
    setPriceData,
    setDescriptionData,
    setDateData,
    setPickUpTimeData,
    setDropOfTimeData,
    setVehicleTypeData,
    setPassengerCountData,
    setRecordedAudioData,
   } = DataToPost(state => state.DTP);

  // Pickup
  // PickUp Town
  const [pickuptown, setPickUpTown] = useState('');
  const [pickuptownIsTyping, setPickUpTownIsTyping] = useState(false);
  const handlePickUpTownTyping = (text) => {
    setPickUpTown(text);
    setPickUpTownData(text);
    setPickUpTownIsTyping(text.length > 0);
  };
  // PickUp Location
  const [pickuplocation, setPickUpLocation] = useState('');
  const [pickuplocationIsTyping, setPickUpLocationIsTyping] = useState(false);
  const handlePickUpLocationTyping = (text) => {
    setPickUpLocation(text);
    setPickUpLocationData(text);
    setPickUpLocationIsTyping(text.length > 0);
  };

  // Drop Off
  // Drop Off Town
  const [dropofftown, setDropOffTown] = useState('');
  const [dropofftownIsTyping, setDropOffTownIsTyping] = useState(false);
  const handleDropOffTownTyping = (text) => {
    setDropOffTown(text);
    setDropOffTownData(text);
    setDropOffTownIsTyping(text.length > 0);
  };
  // Drop Off Location
  const [dropofflocation, setDropOffLocation] = useState('');
  const [dropofflocationIsTyping, setDropOffLocationIsTyping] = useState(false);
  const handleDropOffLocationTyping = (text) => {
    setDropOffLocation(text);
    setDropOffLocationData(text);
    setDropOffLocationIsTyping(text.length > 0);
  };

  // Price
  const [price, setPrice] = useState("");
  const [priceIsTyping, setPriceIsTyping] = useState(false);
  const handlerPriceTyping = (text) => {
    setPrice(text);
    setPriceData(text);
    setPriceIsTyping(text.length > 0);
  };

  // Description
  const [description, setDescription] = useState("");
  const [descriptionIsTyping, setDescriptionIsTyping] = useState(false);
  const handleDescriptionTyping = (text) => {
    setDescription(text);
    setDescriptionData(text);
    setDescriptionIsTyping(text.length > 0);
  };

  // StatusBar
  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBackgroundColor('#FFFFFF');
      StatusBar.setBarStyle('dark-content');
    }, [])
  );

  // Delete Voice Clip
  const deleteRecording = () => {
    if (PAAVCrecordingUri) {
      setPAAVCisPlaying(false);
      setPAAVCrecordingUri(null);
      setPAAVCsound(null);
      setPAAvoiceDelete(true);
      setRecordedAudioData(null);

    }
  };

  // Reset Audio
  useEffect(() => {
    setPAAVCisPlaying(false);
    setPAAVCrecordingUri(null);
    setPAAVCsound(null);
    setPAAvoiceDelete(true);
  }, [])

  // Reset Data
  useEffect(() => {
    setPickUpTownData(""),
    setPickUpLocationData(""),
    setDropOffTownData(""),
    setDropOffLocationData(""),
    setPriceData(""),
    setDescriptionData(""),
    setDateData(""),
    setPickUpTimeData(""),
    setDropOfTimeData(""),
    setVehicleTypeData(""),
    setPassengerCountData(""),
    setRecordedAudioData(null)
  }, [])

  return (
    <SafeAreaView style={Styles.safeArea}>
      <StatusBar />
      <Header name={"Post an Ad"} icon={true} />
      <ScrollView
        contentContainerStyle={MainStyles.ScrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Menu */}
        <View style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24 }}>
          <CPicker text1={"For All"} text2={"For Selected"} />
        </View>
        {/* List */}
        <View style={{ paddingHorizontal: 16, paddingBottom: 40 }}>
          {/* PickUp */}
          <View style={{ paddingBottom: 24 }}>
            {/* Pickup Title */}
            <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Pickup *</Text>
            {/* Pick Up Town Textinput */}
            <CustomFormField
              defaultIcon={<TownIcon width={24} height={24} />}
              typingIcon={<BoldTownIcon width={24} height={24} />}
              placeholder="Add closest town to the pickup"
              value={pickuptown}
              onChangeText={handlePickUpTownTyping}
              isTyping={pickuptownIsTyping}
              keyboardtype={"default"}
            />
            <View style={{ paddingBottom: 8 }} />
            {/* Pick Up Location Textinput */}
            <CustomFormField
              defaultIcon={<LocationIcon width={24} height={24} />}
              typingIcon={<BoldLocationIcon width={24} height={24} />}
              placeholder="Add actual Google Maps location"
              value={pickuplocation}
              onChangeText={handlePickUpLocationTyping}
              isTyping={pickuplocationIsTyping}
              keyboardtype={"default"}
            />
            <View style={{ paddingBottom: 4 }} />
            <Text style={[
              TextStyles.regular12grayscale500, {
                paddingHorizontal: 8,
              }]}>This field is powered by Google Maps. So use it like Google Maps search bar.
            </Text>
          </View>
          {/* Drop Off */}
          <View style={{ paddingBottom: 24 }}>
            {/* Drop Off Title */}
            <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Drop Off *</Text>
            {/* Drop Off Town Textinput */}
            <CustomFormField
              defaultIcon={<TownIcon width={24} height={24} />}
              typingIcon={<BoldTownIcon width={24} height={24} />}
              placeholder="Add closest town to the drop off"
              value={dropofftown}
              onChangeText={handleDropOffTownTyping}
              isTyping={dropofftownIsTyping}
              keyboardtype={"default"}
            />
            <View style={{ paddingBottom: 8 }} />
            {/* Drop Off Location Textinput */}
            <CustomFormField
              defaultIcon={<LocationIcon width={24} height={24} />}
              typingIcon={<BoldLocationIcon width={24} height={24} />}
              placeholder="Add actual Google Maps location"
              value={dropofflocation}
              onChangeText={handleDropOffLocationTyping}
              isTyping={dropofflocationIsTyping}
              keyboardtype={"default"}
            />
            <View style={{ paddingBottom: 4 }} />
            <Text style={[
              TextStyles.regular12grayscale500, {
                paddingHorizontal: 8,
              }]}>This field is powered by Google Maps. So use it like Google Maps search bar.
            </Text>
          </View>
          {/* Pickup Date */}
          <View style={{ paddingBottom: 24 }}>
            {/* Pickup date title */}
            <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Pickup date*</Text>
            {/* Pickup Date Picker */}
            <DatePicker />
          </View>
          {/* Pickup Time and Drop Off Time */}
          <View style={{ paddingBottom: 24 }}>
            <View style={{ paddingBottom: 4, flexDirection: "row" }}>
              {/* Pickup Time */}
              <View style={{ flex: 1 }}>
                {/* Pickup Time title */}
                <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Pickup time*</Text>
                {/* Pickup Time Picker */}
                <PickupTimePicker />
              </View>
              {/* Padding */}
              <View style={{ padding: 8 }} />
              {/* DropOff Time */}
              <View style={{ flex: 1 }}>
                {/* Pickup Time title */}
                <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Drop off time</Text>
                {/* Pickup Time Picker */}
                <DropoffTimePicker />
              </View>
            </View>
            <Text style={[TextStyles.regular12grayscale500, { paddingHorizontal: 8 }]}>After the pickup time, if any driver has not chosen to ride your ad, the ad will be automatically moved to the unsold folder.</Text>
          </View>
          {/* Vehicle Type */}
          <View style={{ paddingBottom: 24 }}>
            <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Vehicle type *</Text>
            {/* Vehicle Picker */}
            <VehiclePicker
              defaultIcon={<CarIcon width={24} height={24} />}
              selectedIcon={<BoldCarIcon width={24} height={24} />}
              placeholder={"Add vehicle type"}
              Data={VehiclesData}
            />
          </View>
          {/* Passengers Count */}
          <View style={{ paddingBottom: 24 }}>
            <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Passengers *</Text>
            {/* Passengers Count Picker */}
            <PassengersPicker
              defaultIcon={<PassengersIcon width={24} height={24} />}
              selectedIcon={<BoldPassengersIcon width={24} height={24} />}
              placeholder={"Add the number of passengers"}
              Data={PassengersCountData}
            />
          </View>
          {/* Price */}
          <View style={{ paddingBottom: 24 }}>
            <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Price (LKR)</Text>
            <CustomFormField
              defaultIcon={<PriceIcon width={24} height={24} />}
              typingIcon={<BoldPriceIcon width={24} height={24} />}
              placeholder="Add a payment to the ride"
              value={price}
              onChangeText={handlerPriceTyping}
              isTyping={priceIsTyping}
              keyboardtype={"numeric"}
            />
          </View>
          {/* Description */}
          <View style={{ paddingBottom: 24 }}>
            <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Description</Text>
            <CustomDescription
              placeholder="Add a short description..."
              value={description}
              onChangeText={handleDescriptionTyping}
              isTyping={descriptionIsTyping}
              keyboardtype={"default"}
            />
          </View>
          {/* Voice Massage */}
          <View style={{ paddingBottom: 0 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={[TextStyles.Medium14grayscale900, { paddingLeft: 8, paddingBottom: 8 }]}>Voice message</Text>
              {/* Delete Voice Clip Icon */}
              <View style={{ paddingRight: 8 }}>
                <TouchableOpacity onPress={deleteRecording}>
                  {PAAvoiceDelete != true ? <CloseIcon width={20} height={20} /> : null}
                </TouchableOpacity>
              </View>
            </View>
            {/* Audio Recorder and Player */}
            <VoiceComponent />
            <View style={{ paddingBottom: 4 }} />
            {PAAvoiceDelete === true ? (
              <Text style={[TextStyles.regular12grayscale500, { paddingHorizontal: 8 }]}>
                Press and hold the mic button to record a voice message.
              </Text>
            ) : null}
          </View>
        </View>
        <View style={{ paddingHorizontal: 16, paddingBottom: 40 }}>
          <Button text={"Post"} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: rgbaColors.FFFFFF_94,
  },
  Boder: {
    height: 56,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: Colors.Grayscale200,
    flexDirection: "row"
  }
});

export default SearchResult;