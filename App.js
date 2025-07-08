import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Easing, View, Text } from 'react-native';

// Auth
import AuthStackNavigator from "./AuthStackNavigator"

// Data
import useStore from './src/Store';

// Tab Screens
import HomeScreen from './Screens/TabScreens/HomeScreen';
import MyRide from './Screens/TabScreens/MyRideScreen';
import MyAds from './Screens/TabScreens/MyAdsScreen';
import CallsChats from './Screens/TabScreens/Calls&ChatsScreen';
import Profile from './Screens/TabScreens/ProfileScreen';

// Stack Screens
import SearchResult from './Screens/StackScreens/SearchResult';
import PostanAd from './Screens/StackScreens/PostAnAdd';

// Stack Ads Screens ( Owner )
import ActiveAdScrn from './Screens/StackScreens/AdInfo/ownerView/activescrn'

// Components
import { Colors } from './Components/Styles/Colors';
import FontLoader from './assets/Fonts/Fonts';

// Icons
import HomeIcon from "./assets/SVG/TabBar/defaulthome.svg";
import PressedHomeIcon from "./assets/SVG/TabBar/home.svg";
import RideIcon from "./assets/SVG/TabBar/defaultride.svg";
import PressedRideIcon from "./assets/SVG/TabBar/ride.svg";
import AddIcon from "./assets/SVG/TabBar/defaultadd.svg";
import PressedAddIcon from "./assets/SVG/TabBar/add.svg";
import CallIcon from "./assets/SVG/TabBar/call.svg";
import PressedCallIcon from "./assets/SVG/TabBar/defaultcall.svg";
import ProfileIcon from "./assets/SVG/TabBar/profile.svg";
import PressedProfileIcon from "./assets/SVG/TabBar/defaultprofile.svg";

// Stack and Tab Navigators
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const config = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.ease,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.ease,
  },
};

// Custom Tab Bar Icon Component
const TabBarIcon = ({ focused, IconComponent, DefaultIconComponent, label }) => (
  <FontLoader>
    <View style={{ width: 60, justifyContent: "center", alignSelf: "center" }}>
      <View style={{ alignItems: 'center' }}>
        <View>
          {focused ? <IconComponent width={24} height={24} /> : <DefaultIconComponent width={24} height={24} />}
        </View>
      </View>
      <Text style={{
        color: focused ? Colors.PrimaryYellow : Colors.Grayscale500,
        fontSize: 10,
        height: 12,
        fontFamily: "CMedium",
        textAlign: 'center',
      }}>
        {label}
      </Text>
    </View>
  </FontLoader>
);

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarPosition="bottom"
      screenOptions={({ route }) => ({
        swipeEnabled: false,
        animationEnabled: true,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.PrimaryYellow,
          height: 2,
          top: 0
        },
        tabBarPressColor: 'rgba(255, 255, 255, 0.3)',
        tabBarPressOpacity: 0.8,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          let DefaultIconComponent;
          let label;

          switch (route.name) {
            case 'Home':
              DefaultIconComponent = HomeIcon;
              IconComponent = PressedHomeIcon;
              label = 'Home';
              break;
            case 'My Rides':
              DefaultIconComponent = RideIcon;
              IconComponent = PressedRideIcon;
              label = 'My Rides';
              break;
            case 'My Ads':
              DefaultIconComponent = AddIcon;
              IconComponent = PressedAddIcon;
              label = 'My Ads';
              break;
            case 'Calls & Chats':
              DefaultIconComponent = PressedCallIcon;
              IconComponent = CallIcon;
              label = 'Calls & Chats';
              break;
            case 'Profile':
              DefaultIconComponent = PressedProfileIcon;
              IconComponent = ProfileIcon;
              label = 'Profile';
              break;
          }

          return <TabBarIcon focused={focused} IconComponent={IconComponent} DefaultIconComponent={DefaultIconComponent} label={label} />;
        },
        tabBarStyle: {
          height: 56,
          backgroundColor: Colors.AdditionalWhite,
        },
        tabBarLabelStyle: {
          display: 'none',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Rides" component={MyRide} />
      <Tab.Screen name="My Ads" component={MyAds} />
      <Tab.Screen name="Calls & Chats" component={CallsChats} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

// Main Stack Navigator
function MainStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tabs">
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          headerShown: false,
          headerLeft: () => null,
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="PostanAd"
        component={PostanAd}
        options={{
          headerShown: false,
          headerLeft: () => null,
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="ActiveAdScrn"
        component={ActiveAdScrn}
        options={{
          headerShown: false,
          headerLeft: () => null,
          gestureEnabled: true,
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
}

// App Content Component
const AppContent = () => {
  const user = useStore(state => state.auth.user);
  const initializeAuth = useStore(state => state.auth.initializeAuth);

  useEffect(() => {
    const unsubscribe = initializeAuth();
    return () => unsubscribe();
  }, [initializeAuth]);

  if (user === undefined) {
    return <View><Text>Loading...</Text></View>;
  }

  return user ? <MainStackNavigator /> : <AuthStackNavigator />;
};

// App Component
const App = () => {
  return (
    <FontLoader>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </FontLoader>
  );
};

export default App;
