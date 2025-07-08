import { db } from '../firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";

// Add new users data to DB02
export const addNewUserData = async (newUser, customId) => {
  try {
    const docRef = doc(db, "DB02", "Credentials", "Users", customId);

    // Set the document with the user data
    await setDoc(docRef, newUser);

    return customId;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Create new Document for new user account (DB01)
// Create new folders for the new user account (DB01)
export const createUserFolders = async (userId) => {
  try {
    // Create a placeholder document in the (Ads) collection
    const adsDocRef = doc(db, "DB01", "Users", "DATA", userId, "Ads", "placeholderDoc");
    await setDoc(adsDocRef, {});

    // Create subcollections within (Ads)
    const activeAdsRef = collection(db, "DB01", "Users", "DATA", userId, "Ads", "ActiveAds", "placeholder");
    const requestedAdsRef = collection(db, "DB01", "Users", "DATA", userId, "Ads", "RequestedAds", "placeholder");
    const givenAdsRef = collection(db, "DB01", "Users", "DATA", userId, "Ads", "GivenAds", "placeholder");
    const reviewAdsRef = collection(db, "DB01", "Users", "DATA", userId, "Ads", "WaitingForReviewAds", "placeholder");
    const completedAdsRef = collection(db, "DB01", "Users", "DATA", userId, "Ads", "CompletedAds", "placeholder");
    const incompleteAdsRef = collection(db, "DB01", "Users", "DATA", userId, "Ads", "IncompleteAds", "placeholder");
    const untakenAdsRef = collection(db, "DB01", "Users", "DATA", userId, "Ads", "UntakenAds", "placeholder");

    // Add an empty document in each subcollection (Ads)
    await setDoc(doc(activeAdsRef, "placeholder"), {});
    await setDoc(doc(requestedAdsRef, "placeholder"), {});
    await setDoc(doc(givenAdsRef, "placeholder"), {});
    await setDoc(doc(reviewAdsRef, "placeholder"), {});
    await setDoc(doc(completedAdsRef, "placeholder"), {});
    await setDoc(doc(incompleteAdsRef, "placeholder"), {});
    await setDoc(doc(untakenAdsRef, "placeholder"), {});

    // Create a placeholder document in the (Rides) collection
    const ridesDocRef = doc(db, "DB01", "Users", "DATA", userId, "Rides", "placeholderDoc");
    await setDoc(ridesDocRef, {});

    // Create subcollections within (Rides)
    const requestedRidesRef = collection(db, "DB01", "Users", "DATA", userId, "Rides", "RequestedRides", "placeholder");
    const ridingRidesRef = collection(db, "DB01", "Users", "DATA", userId, "Rides", "RidingRides", "placeholder");
    const reviewRidesRef = collection(db, "DB01", "Users", "DATA", userId, "Rides", "WaitingForReviewAds", "placeholder");
    const completedRidesRef = collection(db, "DB01", "Users", "DATA", userId, "Rides", "CompletedAds", "placeholder");
    const incompleteRidesRef = collection(db, "DB01", "Users", "DATA", userId, "Rides", "IncompleteAds", "placeholder");

    // Add an empty document in each subcollection (Rides)
    await setDoc(doc(requestedRidesRef, "placeholder"), {});
    await setDoc(doc(ridingRidesRef, "placeholder"), {});
    await setDoc(doc(reviewRidesRef, "placeholder"), {});
    await setDoc(doc(completedRidesRef, "placeholder"), {});
    await setDoc(doc(incompleteRidesRef, "placeholder"), {});

    console.log(`Folders created for user: ${userId}`);
  } catch (error) {
    console.error("Error creating user folders: ", error);
    throw error;
  }
};