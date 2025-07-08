import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Function to find a user by email and return UserID
export const findUserIDByEmail = async (email) => {
  try {
    console.log("Searching for email:", email);

    const q = query(collection(db, "DB02", "Credentials", "Users"), where("Email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents found.");
      throw new Error("User not found");
    }

    let userID = null;

    querySnapshot.forEach((doc) => {
      console.log("Document found:", doc.id, doc.data());
      userID = doc.data().UserID;
      userName = doc.data().FullName;
    });

    if (userID) {
      console.log("UserID found:", userID);
      return userID;
    } else {
      throw new Error("UserID not found in the document");
    }
  } catch (error) {
    console.error("Error finding UserID by email:", error);
    throw error;
  }
};

// Function to find a user by email and return FullName
export const findFullNameByEmail = async (email) => {
  try {
    console.log("Searching for email:", email);

    const q = query(collection(db, "DB02", "Credentials", "Users"), where("Email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching documents found.");
      throw new Error("User not found");
    }

    let userName = null;

    querySnapshot.forEach((doc) => {
      console.log("Document found:", doc.id, doc.data());
      userName = doc.data().FullName;
    });

    if (userName) {
      console.log("FullName found:", userName);
      return userName;
    } else {
      throw new Error("FullName not found in the document");
    }
  } catch (error) {
    console.error("Error finding FullName by email:", error);
    throw error;
  }
};