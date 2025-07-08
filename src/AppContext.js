import React, { createContext, useContext, useState, useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

// MyRides Data
import RequestData from "../src/MyRides/Requested";
// MyAds Data
import ActiveData from './MyAds/Active';
// Calls and Chats Data
import CallsData from './Calls&Chats/Calls';

const AppContext = createContext();

// Device Check ( Emulator or Real )
const isEmulator = () => {
    if (Platform.OS === 'android') {
        const buildFingerprint = Platform.constants.Fingerprint;
        return (
            buildFingerprint.includes('generic') ||
            buildFingerprint.includes('emulator') ||
            buildFingerprint.includes('Android SDK')
        );
    } else if (Platform.OS === 'ios') {
        const deviceModel = Platform.constants.Model;
        return deviceModel === 'iPhone Simulator' || deviceModel === 'iPad Simulator';
    }
    return false;
};

// StatusBar Height
const getStatusBarHeight = () => {
    if (Platform.OS === 'android') {
        return StatusBar.currentHeight;
    }
    if (Platform.OS === 'ios') {
        const { height: windowHeight } = Dimensions.get('window');
        const { height: screenHeight } = Dimensions.get('screen');
        return screenHeight > windowHeight ? 20 : 0;
    }
    return 0;
};

export const AppProvider = ({ children }) => {

    // Device Check ( Emulator or Real )
    const isRunningOnEmulator = isEmulator();
    // StatusBar Height
    const [statusBarHeight, setStatusBarHeight] = useState(0);

    // Quick Search
    const [pickupValue, setPickupValue] = useState("");
    const [dropValue, setDropValue] = useState("");
    const [vehicle, setVehicle] = useState("");
    const [DropValueIsTyping, setDropValueIsTyping] = useState(false);
    const [PickupValueIsTyping, setPickupValueIsTyping] = useState(false);
    const [VehicleIsTyping, setVehicleIsTyping] = useState(false);

    // Home MenuBar Items
    const [allSelect, setAllSelect] = useState(true);
    const [nearbySelect, setNearbySelect] = useState(false);
    const [categorySelect, setCategorySelect] = useState(false);
    const [category2Select, setCategory2Select] = useState(false);

    // App.js HomeScreen.js and Headers
    const [scrolled, setScrolled] = useState(false);
    const [downArrow, setDownArrow] = useState(false);

    // MyRides MenuBar Items (MR)
    const [MRrequiest, setMRrequiest] = useState(true);
    const [MRriding, setMRriding] = useState(false);
    const [MRwaiting, setMRwaiting] = useState(false);
    const [MRcompleted, setMRcompleted] = useState(false);
    const [MRincomplete, setMRincomplete] = useState(false);
    const [MRselectedData, setMRselectedData] = useState(RequestData);

    // MyAds MenuBar Items (MA)
    const [MAactive, setMAactive] = useState(true);
    const [MArequest , setMArequest] = useState(false);
    const [MAgiven , setMAgiven] = useState(false);
    const [MAreview , setMAreview] = useState(false);
    const [MAcompleted , setMAcompleted] = useState(false);
    const [MAincomplete , setMAincomplete] = useState(false);
    const [MAuntaken , setMAuntaken] = useState(false);
    const [MAselectedData, setMAselectedData] = useState(ActiveData);

    // Calls and Chats Items (CC)
    const [CCselectedData, setCCSelectedData] = useState(CallsData);
    const [CCcalls, setCCcalls] = useState(true);
    const [CChats, setCCchats] = useState(false);

    // StatusBar Height
    useEffect(() => {
        setStatusBarHeight(getStatusBarHeight());
    }, []);

    return (
        <AppContext.Provider value={{
            // StatusBar and Emulator Check
            isRunningOnEmulator,
            statusBarHeight, setStatusBarHeight,

            // Quick Search
            pickupValue, setPickupValue,
            dropValue, setDropValue,
            vehicle, setVehicle,
            DropValueIsTyping, setDropValueIsTyping,
            PickupValueIsTyping, setPickupValueIsTyping,
            VehicleIsTyping, setVehicleIsTyping,

            // Home MenuBar Items
            allSelect, setAllSelect,
            nearbySelect, setNearbySelect,
            categorySelect, setCategorySelect,
            category2Select, setCategory2Select,

            // App.js HomeScreen.js and Headers
            scrolled, setScrolled,
            downArrow, setDownArrow,

            // MyRides MenuBar Items (MR)
            MRrequiest, setMRrequiest,
            MRriding, setMRriding,
            MRwaiting, setMRwaiting,
            MRcompleted, setMRcompleted,
            MRincomplete, setMRincomplete,
            MRselectedData, setMRselectedData,

            // MyAds MenuBar Items (MA)
            MAactive, setMAactive,
            MArequest , setMArequest,
            MAgiven , setMAgiven,
            MAreview , setMAreview,
            MAcompleted , setMAcompleted,
            MAincomplete , setMAincomplete,
            MAuntaken , setMAuntaken,
            MAselectedData, setMAselectedData,

            // Calls and Chats Items (CC)
            CCselectedData, setCCSelectedData,
            CCcalls, setCCcalls,
            CChats, setCCchats,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
