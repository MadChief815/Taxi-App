import React from 'react';
import { View, StyleSheet, Text, Dimensions, Pressable } from 'react-native';
import Icon from './arrow.svg';
import { TextStyles } from '../../Styles/Styles';
import useStore from '../../../src/Store';

// Dimentions
const windowWidth = Dimensions.get('window').width;

const HeaderIcon = () => {

  const { setDownArrow } = useStore(state => state.app);

  return (
    <Pressable onPress={() => setDownArrow(true)}>
      <View style={Styles.container}>
        <Text style={TextStyles.SemiBold14grayscale50}>Quick Search</Text>
        <View style={{ paddingLeft: 4 }}>
          <Icon width={16} height={16} />
        </View>
      </View>
    </Pressable>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    alignSelf: "center",
    height: 48,
    backgroundColor: 'rgba(28, 28, 28, 8)'
  },
});

export default HeaderIcon;
