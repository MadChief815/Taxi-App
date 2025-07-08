import { create } from 'zustand';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Data
import RequestData from "./MyRides/Requested";
import ActiveData from './MyAds/Active';
import CallsData from './Calls&Chats/Calls';

const useStore = create((set) => ({

    // Authentication
    auth: {
        user: null,
        initializeAuth: () => {
            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                set((state) => ({ auth: { ...state.auth, user: currentUser } }));
            });

            // Return cleanup function
            return unsubscribe;
        },
        logout: async () => {
            try {
                await signOut(auth);
                set((state) => ({ auth: { ...state.auth, user: null } }));
            } catch (error) {
                console.error('Error signing out: ', error);
            }
        },
    },

    // UserID of Logged User
    userID: null,
    setUserID: async (userID) => {
        await AsyncStorage.setItem('userID', userID); // Save to AsyncStorage
        set({ userID }); // Update Zustand state
    },
    loadUserID: async () => {
        const userID = await AsyncStorage.getItem('userID'); // Load from AsyncStorage
        set({ userID });
    },
    // FullName of Logged User
    fullName: null,
    setFullName: async (fullName) => {
        await AsyncStorage.setItem('FullName', fullName); // Save to AsyncStorage
        set({ fullName }); // Update Zustand state
    },
    loadFullName: async () => {
        const fullName = await AsyncStorage.getItem('FullName'); // Load from AsyncStorage
        set({ fullName });
    },
    // Quick Search
    search: {
        pickupValue: "",
        setPickupValue: (value) => set(state => ({ search: { ...state.search, pickupValue: value } })),
        dropValue: "",
        setDropValue: (value) => set(state => ({ search: { ...state.search, dropValue: value } })),
        vehicle: "",
        setVehicle: (value) => set(state => ({ search: { ...state.search, vehicle: value } })),
        DropValueIsTyping: false,
        setDropValueIsTyping: (value) => set(state => ({ search: { ...state.search, DropValueIsTyping: value } })),
        PickupValueIsTyping: false,
        setPickupValueIsTyping: (value) => set(state => ({ search: { ...state.search, PickupValueIsTyping: value } })),
        VehicleIsTyping: false,
        setVehicleIsTyping: (value) => set(state => ({ search: { ...state.search, VehicleIsTyping: value } })),
    },

    // Home MenuBar Items
    menuBar: {
        allSelect: true,
        setAllSelect: (value) => set(state => ({ menuBar: { ...state.menuBar, allSelect: value } })),
        nearbySelect: false,
        setNearbySelect: (value) => set(state => ({ menuBar: { ...state.menuBar, nearbySelect: value } })),
        categorySelect: false,
        setCategorySelect: (value) => set(state => ({ menuBar: { ...state.menuBar, categorySelect: value } })),
        category2Select: false,
        setCategory2Select: (value) => set(state => ({ menuBar: { ...state.menuBar, category2Select: value } })),
    },

    // App.js HomeScreen.js and Headers
    app: {
        downArrow: false,
        setDownArrow: (value) => set(state => ({ app: { ...state.app, downArrow: value } })),
    },

    // MyRides MenuBar Items (MR)
    myRides: {
        MRrequiest: true,
        setMRrequiest: (value) => set(state => ({ myRides: { ...state.myRides, MRrequiest: value } })),
        MRriding: false,
        setMRriding: (value) => set(state => ({ myRides: { ...state.myRides, MRriding: value } })),
        MRwaiting: false,
        setMRwaiting: (value) => set(state => ({ myRides: { ...state.myRides, MRwaiting: value } })),
        MRcompleted: false,
        setMRcompleted: (value) => set(state => ({ myRides: { ...state.myRides, MRcompleted: value } })),
        MRincomplete: false,
        setMRincomplete: (value) => set(state => ({ myRides: { ...state.myRides, MRincomplete: value } })),
        MRselectedData: RequestData,
        setMRselectedData: (value) => set(state => ({ myRides: { ...state.myRides, MRselectedData: value } })),
    },

    // MyAds MenuBar Items (MA)
    myAds: {
        MAactive: true,
        setMAactive: (value) => set(state => ({ myAds: { ...state.myAds, MAactive: value } })),
        MArequest: false,
        setMArequest: (value) => set(state => ({ myAds: { ...state.myAds, MArequest: value } })),
        MAgiven: false,
        setMAgiven: (value) => set(state => ({ myAds: { ...state.myAds, MAgiven: value } })),
        MAreview: false,
        setMAreview: (value) => set(state => ({ myAds: { ...state.myAds, MAreview: value } })),
        MAcompleted: false,
        setMAcompleted: (value) => set(state => ({ myAds: { ...state.myAds, MAcompleted: value } })),
        MAincomplete: false,
        setMAincomplete: (value) => set(state => ({ myAds: { ...state.myAds, MAincomplete: value } })),
        MAuntaken: false,
        setMAuntaken: (value) => set(state => ({ myAds: { ...state.myAds, MAuntaken: value } })),
        MAselectedData: ActiveData,
        setMAselectedData: (value) => set(state => ({ myAds: { ...state.myAds, MAselectedData: value } })),
        MAselectedAd: "Active",
        setMAselectedAd: (value) => set(state => ({ myAds: { ...state.myAds, MAselectedAd: value } })),
    },

    // Calls and Chats Items (CC)
    callsAndChats: {
        CCselectedData: CallsData,
        setCCSelectedData: (value) => set(state => ({ callsAndChats: { ...state.callsAndChats, CCselectedData: value } })),
        CCcalls: true,
        setCCcalls: (value) => set(state => ({ callsAndChats: { ...state.callsAndChats, CCcalls: value } })),
        CChats: false,
        setCCchats: (value) => set(state => ({ callsAndChats: { ...state.callsAndChats, CChats: value } })),
    },

    // Post an Ad
    PostAnAdd: {
        PAAvoiceDelete: true,
        setPAAvoiceDelete: (value) => set(state => ({ PostAnAdd: { ...state.PostAnAdd, PAAvoiceDelete: value } })),
    },

    // Post an Ad (VoiceClip)
    PAAVoiceClip: {
        PAAVCrecordingUri: null,
        setPAAVCrecordingUri: (value) => set(state => ({ PAAVoiceClip: { ...state.PAAVoiceClip, PAAVCrecordingUri: value } })),
        PAAVCsound: null,
        setPAAVCsound: (value) => set(state => ({ PAAVoiceClip: { ...state.PAAVoiceClip, PAAVCsound: value } })),
        PAAVCisPlaying: false,
        setPAAVCisPlaying: (value) => set(state => ({ PAAVoiceClip: { ...state.PAAVoiceClip, PAAVCisPlaying: value } })),
    }
}));

export default useStore;
