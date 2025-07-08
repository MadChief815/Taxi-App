import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from './Logo.svg';
import NotificationIcon from './notification.svg'

const HeaderIcon = () => {
  return (
    <View style={Styles.container}>
      <View style={{ paddingLeft: 16 }}>
        <Icon width={120} height={24} />
      </View>
      <View style={Styles.IconContainer}>
        <NotificationIcon width={24} height={24} />
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row', 
    justifyContent: "space-between", 
    alignItems: "center", 
    width: "100%",
    backgroundColor: 'rgba(28, 28, 28, 8)',
    height: 48,
  },
  IconContainer: {
    width: 56, 
    height: 48,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default HeaderIcon;
