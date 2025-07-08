import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import { fetchAllAdsData, fetchUserAdsData, addNewAdData, updateAdData, deleteAdData } from '../../Firebase/FireStore/firestoreAds';
import useStore from '../../src/Store';
import DataToStore from '../../src/PostanAdData/DatatoPost';
import AudioUp from "../../jest/audiotest";

export default function App() {

  // User Auth
  const logout = useStore(state => state.auth.logout);

  // UserID
  const { userID, loadUserID, fullName, loadFullName } = useStore();
  useEffect(() => {
    loadUserID();
    loadFullName();
  }, [loadUserID, loadFullName]);

  // Consts
  // DataToStore
  const {
    recordedaudioData,
  } = DataToStore(state => state.DTP);

  const [ads, setAds] = useState([]);
  const [selectedAdId, setSelectedAdId] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState('');

  // Fetch User's Active Ads
  const handleFetchUsersAdsData = async () => {
    try {
      const data = await fetchUserAdsData();
      setAds(data);
    } catch (error) {
      console.error("Error fetching ads: ", error);
    }
  };

  // Function to get the current time and date
  const getCurrentTime = () => {
    const currentDate = new Date();

    // Extract date components (year, month, day)
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
    const day = currentDate.getDate().toString().padStart(2, '0');

    // Extract time components (hours, minutes, seconds)
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    // Format date as YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;

    // Format time as HH:MM:SS
    const formattedTime = `${hours}:${minutes}:${seconds}`;

    // Return the combined formatted date and time
    return `${formattedDate} ${formattedTime}`;
  };

  const handleAddAdData = async () => {
    try {
      // Get the current time and date
      const formattedTime = getCurrentTime();

      const newAd = {
        DriverName: "Kevin Clegan",
        Raters: "(128)",
        Ratings: "4.8",
        Seats: 3,
        Time: "50 m",
        PickUpTown: "Colombo",
        PickUpLocation: "maps.app.goo.gl/ig2LU",
        DropOffTown: "Jaffna",
        DropOffLocation: "https://maps.app.goo.gl/TEST",
        Price: "35000",
        Description: "Hello, We need a ride to this location.",
        PickUpDate: "10/12/2025",
        PickUpTime: "09:30",
        DropOffTime: "15:30",
        VehicleType: "Honda Civic",
        PassengerCount: "3",
        DriverUserID: userID,
        PublishedTime: formattedTime
      };

      // Use DriverName + unique ID as the document ID
      const docId = await addNewAdData(newAd);
      console.log("New ad added with ID: ", docId);

      // Optionally log the current time in the console
      console.log('Current time (for log):', formattedTime);

      // Refresh the list after adding a new ad
      handleFetchUsersAdsData();
    } catch (error) {
      console.error("Error adding new ad: ", error);
    }
  };

  const handleUpdateAdData = async () => {
    try {
      if (selectedAdId && updatedPrice !== '') {
        const updatedFields = { Price: updatedPrice };
        await updateAdData(selectedAdId, updatedFields);
        console.log("Ad updated successfully");
        handleFetchUsersAdsData();
        setSelectedAdId(null);
        setUpdatedPrice('');
      }
    } catch (error) {
      console.error("Error updating ad: ", error);
    }
  };

  const handleDeleteAdData = async (id) => {
    try {
      await deleteAdData(id);
      handleFetchUsersAdsData();
    } catch (error) {
      console.error("Error deleting ad: ", error);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      handleFetchUsersAdsData();
    }, 8000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <ScrollView>
      <View style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Button title="logout" onPress={logout} color={"#6E6E6E"} />
      </View>
      <Button title="Fetch Ads Data" onPress={handleFetchUsersAdsData} color={"#6E6E6E"} />
      <View style={{ paddingTop: 16 }} />
      <Text>UserId is: {userID} </Text>
      <Text>FullName is: {fullName} </Text>
      <View style={{ paddingTop: 16 }} />
      <Button title="Add New Ad Data" onPress={handleAddAdData} color={"#6E6E6E"} />
      <AudioUp />
      <Text style={{ marginTop: 20 }}>All Ads Data:</Text>
      {ads.length > 0 ? (
        ads.map((ad) => (
          <View key={ad.id} style={{ marginBottom: 10 }}>
            <Text>{ad.DriverName} - {ad.Price}</Text>
            <Text>{ad.Car}</Text>
            <Text>{ad.Date}</Text>
            <Button title="Update" onPress={() => setSelectedAdId(ad.id)} />
            <Button title="Delete" onPress={() => handleDeleteAdData(ad.id)} />
          </View>
        ))
      ) : (
        <Text>No ads available</Text>
      )}
      {selectedAdId && (
        <View style={{ marginTop: 20 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
            placeholder="Enter new price"
            value={updatedPrice}
            onChangeText={setUpdatedPrice}
          />
          <Button title="Save Update" onPress={handleUpdateAdData} />
        </View>
      )}
    </ScrollView>
  );
}
