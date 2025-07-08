import { StyleSheet } from "react-native";
import { Colors, rgbaColors } from "./Colors";

export const MainStyles = StyleSheet.create({
  ScrollContainer: {
    // flex: 1,
    backgroundColor: rgbaColors.FFFFFF_94
  }
});

export const TextFieldStyles = StyleSheet.create({
  TextContainer: {
    flexDirection: "row",
    height: 56,
    borderBottomWidth: 1.5,
    borderColor: Colors.Grayscale100,
  },
  IconMainContainer: {
    paddingVertical: 16,
    paddingRight: 16,
  },
  IconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
  NormalText: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  boldText: {
    fontWeight: '400',
    color: "#2C2C2E"
  },
});

export const TextStyles = StyleSheet.create({

  // Regular
  regular12grayscale500: {
    fontSize: 12,
    color: Colors.Grayscale500,
    fontFamily: "CRegular"
  },
  regular14grayscale500: {
    fontSize: 14,
    color: Colors.Grayscale500,
    fontFamily: "CRegular"
  },
  regular16grayscale500: {
    fontSize: 16,
    color: Colors.Grayscale500,
    fontFamily: "CRegular"
  },
  regular16grayscale900: {
    fontSize: 16,
    color: Colors.Grayscale900,
    fontFamily: "CRegular"
  },

  // Medium
  medium16grayscale500: {
    fontSize: 16,
    color: Colors.Grayscale500,
    fontFamily: "CMedium"
  },
  medium16grayscale900: {
    fontSize: 16,
    color: Colors.Grayscale900,
    fontFamily: "CMedium"
  },
  Medium14grayscale900: {
    fontFamily: "CMedium",
    fontSize: 14,
    color: Colors.Grayscale900
  },
  Medium14Yellow: {
    fontFamily: "CMedium",
    fontSize: 14,
    color: Colors.PrimaryYellow
  },

  Medium17Yellow: {
    fontFamily: "CMedium",
    fontSize: 17,
    color: Colors.PrimaryYellow
  },

  // Bold
  bold24grayscale50: {
    fontSize: 24,
    fontFamily: "CBold",
    color: Colors.Grayscale50
  },
  bold20grayscale500: {
    fontSize: 20,
    fontFamily: "CBold",
    color: Colors.Grayscale900
  },
  bold17grayscale900: {
    fontSize: 17,
    fontFamily: "CBold",
    color: Colors.Grayscale900
  },

  // SemiBold
  SemiBold17grayscale500: {
    fontFamily: "CSemiBold",
    fontSize: 17,
    color: Colors.Grayscale500
  },
  SemiBold17grayscale900: {
    fontFamily: "CSemiBold",
    fontSize: 17,
    color: Colors.Grayscale900
  },
  SemiBold17white: {
    fontFamily: "CSemiBold",
    fontSize: 17,
    color: Colors.AdditionalWhite
  },
  SemiBold14grayscale50: {
    fontFamily: "CSemiBold",
    fontSize: 14,
    color: Colors.Grayscale50
  },
  SemiBold14grayscale500: {
    fontFamily: "CSemiBold",
    fontSize: 14,
    color: Colors.Grayscale500
  },
  SemiBold17Yellow: {
    fontFamily: "CSemiBold",
    fontSize: 17,
    color: Colors.PrimaryYellow
  },
  SemiBold12White: {
    fontFamily: "CSemiBold",
    fontSize: 12,
    color: Colors.AdditionalWhite,
  },
});