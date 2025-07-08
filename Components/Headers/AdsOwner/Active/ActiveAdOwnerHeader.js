import React from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  Dimensions, 
  Pressable, 
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Components
import { TextStyles } from '../../../Styles/Styles';
import { Colors } from '../../../Styles/Colors';

// Icons
import BackArrowIcon from "./backarrow.svg";

// Dimensions
const windowWidth = Dimensions.get('window').width;

const HeaderIcon = ({ name }) => {

  // Navigation
  const navigation = useNavigation();

  // Edit Text Handler
  const handleEdit = () => {
    console.log("Pressed")
  };

  return (
    <View style={Styles.container}>
      <Pressable onPress={() => navigation.goBack()} style={Styles.BackArrowCont}>
        <BackArrowIcon />
      </Pressable>
      <View style={Styles.TextContainer}>
        <Text style={TextStyles.SemiBold17grayscale900}>{name} Ago</Text>
      </View>
      <TouchableOpacity
          onPress={handleEdit}
          activeOpacity={0.7}
          style={Styles.editText}
        >
          <Text style={TextStyles.Medium17Yellow}>Edit</Text>
        </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: windowWidth,
    alignSelf: "center",
    backgroundColor: Colors.AdditionalWhite,
    height: 48
  },
  TextContainer: {
    height: 24,
    flexDirection: "row"
  },
  BackArrowCont: {
    position: "absolute",
    left: 0,
    width: 34,
    height: 48,
    justifyContent: "center",
    alignItems: "center"
  },
  editText: {
    position: "absolute",
    right: 16
  }
});

export default HeaderIcon;
