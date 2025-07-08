import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextStyles } from '../../Styles/Styles';
import ToIcon from './twoarrow.svg';
import CarIcon from './car.svg';
import CloseIcon from './close.svg';
import { useNavigation } from '@react-navigation/native';
import useStore from '../../../src/Store';

const SearchResultHeader = () => {

  // AppContext
  const { pickupValue, setPickupValue, vehicle, setVehicle, dropValue, setDropValue } = useStore(state => state.search);

  // Navigation
  const navigation = useNavigation();
  const NavigationHandler = () => {
    setPickupValue("");
    setDropValue("");
    setVehicle("");
    navigation.replace("Tabs");
  };

  return (
    <View style={Styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {/* From */}
        <Text style={[TextStyles.SemiBold14grayscale50, { textAlign: "center" }]}>{pickupValue}</Text>
        {/* To Icon */}
        <View style={{ paddingHorizontal: 4 }}>
          <ToIcon width={24} height={24} />
        </View>
        {/* To */}
        <Text style={[TextStyles.SemiBold14grayscale50, { textAlign: "center" }]}>{dropValue}</Text>
        {/* Car Icon */}
        <View style={{ paddingLeft: 24, paddingRight: 4 }}>
          <CarIcon width={24} height={24} />
        </View>
        {/* Car Name */}
        <Text style={[TextStyles.SemiBold14grayscale50, { textAlign: "center" }]}>{vehicle}</Text>
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={NavigationHandler}>
        <View style={Styles.IconContainer}>
          <CloseIcon width={24} height={24} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(28, 28, 28, 8)",
    height: 48,
    paddingHorizontal: 16,
  },
  IconContainer: {
    width: 56,
    height: 48,
    alignItems: "flex-end",
    justifyContent: "center"
  }
});

export default SearchResultHeader;
