import { db } from '../firebaseConfig';
import { collection, doc, getDocs, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { uploadBytes, getDownloadURL, ref as storageRef } from 'firebase/storage';
import { firestore, database, storage } from '../firebaseConfig';
import { ref, set } from 'firebase/database';
import useStore from '../../src/Store';

// Function to generate a random alphanumeric string
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Fetch all ads from "ActiveAdsData"
export const fetchAllAdsData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "DB01", "ActiveAds", "ActiveAdsData"));
    const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return ads;
  } catch (error) {
    console.error("Error fetching ads: ", error);
    throw error;
  }
};

// Fetch User Ads Data from "DB01/Users/DATA/UserID/Ads/ActiveAds/placeholder/"
export const fetchUserAdsData = async () => {
  try {
    const { userID } = useStore.getState();
    const querySnapshot = await getDocs(collection(db, "DB01", "Users", "DATA", userID, "Ads", "ActiveAds", "placeholder"));
    const ads = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return ads;
  } catch (error) {
    console.error("Error fetching ads: ", error);
    throw error;
  }
};

// Add a new ad to both "ActiveAdsData" and "DB01/Users/DATA/UserID/Ads/ActiveAds/placeholder/"
export const addNewAdData = async (newAd) => {
  try {
    const { userID } = useStore.getState();
    const uniqueString = generateRandomString(20);
    // Combine DriverName with the unique alphanumeric string
    const { fullName } = useStore.getState();
    const customId = `${fullName}_${uniqueString}`;
    // Create a document reference with the custom ID
    const docRef = doc(db, "DB01", "ActiveAds", "ActiveAdsData", customId);
    // Use the same custom ID for the other collection
    await setDoc(docRef, newAd);
    await setDoc(doc(db, "DB01", "Users", "DATA", userID, "Ads", "ActiveAds", "placeholder", customId), newAd);

    return customId;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Update an existing ad in "ActiveAdsData" and "UAData"
export const updateAdData = async (customId, updatedFields) => {
  try {
    const { userID } = useStore.getState();
    const adRef = doc(db, "DB01", "ActiveAds", "ActiveAdsData", customId);
    const userAdRef = doc(db, "DB01", "Users", "DATA", userID, "Ads", "ActiveAds", "placeholder", customId);

    // Run the updates in parallel for better performance
    await Promise.all([
      updateDoc(adRef, updatedFields),
      updateDoc(userAdRef, updatedFields),
    ]);
    
    console.log(`Document with ID: ${customId} updated successfully in both collections.`);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};


// Delete an ad from "ActiveAdsData" and "UAData"
export const deleteAdData = async (documentId) => {
  try {
    const { userID } = useStore.getState();
    await deleteDoc(doc(db, "DB01", "ActiveAds", "ActiveAdsData", documentId));
    await deleteDoc(doc(db, "DB01", "Users", "DATA", userID, "Ads", "ActiveAds", "placeholder", documentId));
    console.log("Ad deleted successfully");
  } catch (error) {
    console.error("Error deleting ad: ", error);
    throw error;
  }
};