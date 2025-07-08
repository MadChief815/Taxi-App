import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from './car.svg';
import GrayIcon from './graycar.svg';
import useStore from '../../../src/Store';
import { Colors } from '../../Styles/Colors';

const Item = () => {

  // Conts
  const {
    allSelect, setAllSelect,
    nearbySelect, setNearbySelect,
    categorySelect, setCategorySelect,
    category2Select, setCategory2Select
  } = useStore(state => state.menuBar);

  // Handlers
  const AllHandler = () => {
    setAllSelect(true);
    setNearbySelect(false);
    setCategorySelect(false);
    setCategory2Select(false);
  };
  const NearbyHandler = () => {
    setAllSelect(false);
    setNearbySelect(true);
    setCategorySelect(false);
    setCategory2Select(false);
  };
  const CategoryHandler = () => {
    setAllSelect(false);
    setNearbySelect(false);
    setCategorySelect(true);
    setCategory2Select(false);
  };
  const Category2Handler = () => {
    setAllSelect(false);
    setNearbySelect(false);
    setCategorySelect(false);
    setCategory2Select(true);
  };

  return (
    <View style={Styles.Container}>
      {/* All */}
      <TouchableOpacity activeOpacity={0.9} onPress={AllHandler} style={{ paddingRight: 16 }}>
        <View style={[Styles.ItemConatiner, { backgroundColor: allSelect ? Colors.PrimaryYellow : Colors.AdditionalWhite }]}>
          <View style={{ paddingRight: 8 }}>
            {allSelect ? <Icon width={24} height={24} /> : <GrayIcon width={24} height={24} />}
          </View>
          <Text style={[Styles.textStyles, { color: allSelect ? Colors.Grayscale50 : Colors.Grayscale500 }]}>All</Text>
        </View>
      </TouchableOpacity>
      {/* Nearby */}
      <TouchableOpacity activeOpacity={0.9} onPress={NearbyHandler} style={{ paddingRight: 16 }}>
        <View style={[Styles.ItemConatiner, { backgroundColor: nearbySelect ? Colors.PrimaryYellow : Colors.AdditionalWhite }]}>
          <View style={{ paddingRight: 8 }}>
            {nearbySelect ? <Icon width={24} height={24} /> : <GrayIcon width={24} height={24} />}
          </View>
          <Text style={[Styles.textStyles, { color: nearbySelect ? Colors.Grayscale50 : Colors.Grayscale500 }]}>Nearby</Text>
        </View>
      </TouchableOpacity>
      {/* Catergory 1 */}
      <TouchableOpacity activeOpacity={0.9} onPress={CategoryHandler} style={{ paddingRight: 16 }}>
        <View style={[Styles.ItemConatiner, { backgroundColor: categorySelect ? Colors.PrimaryYellow : Colors.AdditionalWhite }]}>
          <View style={{ paddingRight: 8 }}>
            {categorySelect ? <Icon width={24} height={24} /> : <GrayIcon width={24} height={24} />}
          </View>
          <Text style={[Styles.textStyles, { color: categorySelect ? Colors.Grayscale50 : Colors.Grayscale500 }]}>Catergory</Text>
        </View>
      </TouchableOpacity>
      {/* Catergory 2 */}
      <TouchableOpacity activeOpacity={0.9} onPress={Category2Handler}>
        <View style={[Styles.ItemConatiner, { backgroundColor: category2Select ? Colors.PrimaryYellow : Colors.AdditionalWhite }]}>
          <View style={{ paddingRight: 8 }}>
            {category2Select ? <Icon width={24} height={24} /> : <GrayIcon width={24} height={24} />}
          </View>
          <Text style={[Styles.textStyles, { color: category2Select ? Colors.Grayscale50 : Colors.Grayscale500 }]}>Catergory</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  ItemConatiner: {
    alignItems: 'center',
    height: 40,
    borderRadius: 12,
    flexDirection: "row",
    elevation: 0.5,
    paddingLeft: 16,
    paddingRight: 16
  },
  textStyles: {
    fontFamily: "CSemiBold",
    fontSize: 14,
    color: Colors.Grayscale500,
    backgroundColor: "transparent",
  },
  Container: {
    flexDirection: "row",
    height: 88,
    backgroundColor: Colors.Grayscale50,
    alignItems: "center",
  }
});

export default Item;