import { db } from '../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import useStore from '../../src/Store';

// This Components are used to fetch data to MyAdsMenuBar (MyAdsScreen)

// Fetch User Active Ads Data from "DB01/Users/DATA/UserID/Ads/ActiveAds/placeholder/"
export const fetchActiveAds = async () => {
    try {
        const { userID } = useStore.getState();
        const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "ActiveAds", "placeholder"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ads;
    } catch (error) {
        console.error("Error fetching ACTIVE ads: ", error);
        throw error;
    }
};

// Fetch User Requested Ads Data from "DB01/Users/DATA/UserID/Ads/RequestedAds/placeholder/"
export const fetchRequestedAds = async () => {
    try {
        const { userID } = useStore.getState();
        const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "RequestedAds", "placeholder"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ads;
    } catch (error) {
        console.error("Error fetching REQUESTED ads: ", error);
        throw error;
    }
};

// Fetch User Given Ads Data from "DB01/Users/DATA/UserID/Ads/GivenAds/placeholder/"
export const fetchGivenAds = async () => {
    try {
        const { userID } = useStore.getState();
        const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "GivenAds", "placeholder"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ads;
    } catch (error) {
        console.error("Error fetching Given ads: ", error);
        throw error;
    }
};

// Fetch User WaitingForReview Ads Data from "DB01/Users/DATA/UserID/Ads/WaitingForReviewAds/placeholder/"
export const fetchReviewAds = async () => {
    try {
        const { userID } = useStore.getState();
        const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "WaitingForReviewAds", "placeholder"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ads;
    } catch (error) {
        console.error("Error fetching WaitingForReview ads: ", error);
        throw error;
    }
};

// Fetch User Completed Ads Data from "DB01/Users/DATA/UserID/Ads/CompletedAds/placeholder/"
export const fetchCompletedAds = async () => {
    try {
        const { userID } = useStore.getState();
        const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "CompletedAds", "placeholder"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ads;
    } catch (error) {
        console.error("Error fetching COMPLETED ads: ", error);
        throw error;
    }
};

// Fetch User Incomplete Ads Data from "DB01/Users/DATA/UserID/Ads/IncompleteAds/placeholder/"
export const fetchIncompleteAds = async () => {
    try {
        const { userID } = useStore.getState();
        const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "IncompleteAds", "placeholder"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ads;
    } catch (error) {
        console.error("Error fetching INCOMPLETE ads: ", error);
        throw error;
    }
};

// Fetch User Untaken Ads Data from "DB01/Users/DATA/UserID/Ads/UntakenAds/placeholder/"
export const fetchUntakenAds = async () => {
    try {
        const { userID } = useStore.getState();
        const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "UntakenAds", "placeholder"));
        const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return ads;
    } catch (error) {
        console.error("Error fetching UNTAKEN ads: ", error);
        throw error;
    }
};