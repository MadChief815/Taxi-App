import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Components and Stores
import { TextStyles } from '../../Styles/Styles';
import { Colors } from '../../Styles/Colors';
import DataToStore from '../../../src/PostanAdData/DatatoPost';
import useStore from '../../../src/Store';
import { addNewAdData, updateAdData } from '../../../Firebase/FireStore/firestoreAds';

const Button01 = ({ text }) => {

    // Data from DataToStore
    const {
        pickuptownData,
        pickuplocationData,
        dropofftownData,
        dropofflocationData,
        priceData,
        descriptionData,
        dateData,
        pickuptimeData,
        dropoftimeData,
        vehicletypeData,
        passengercountData,
        recordedaudioData, // The recorded audio data
    } = DataToStore(state => state.DTP);

    // Data from useStore
    const { fullName, userID } = useStore();

    // Check if all required data is present
    const AllValue = pickuptownData && pickuplocationData && dropofftownData && dropofflocationData
        && priceData && descriptionData && dateData && pickuptimeData && dropoftimeData && vehicletypeData
        && passengercountData && recordedaudioData;

    // Navigation hook
    const navigation = useNavigation();

    // Function to upload audio file to Firebase Storage
    async function uploadRecordedAudio(recordedaudioData, customId) {
        try {
            const storage = getStorage();
            const storageRef = ref(storage, `Audio/UserIDs/${userID}/${customId}.m4a`);

            // Convert URI to Blob
            const response = await fetch(recordedaudioData);
            const blob = await response.blob();

            // Start the upload
            const uploadTask = uploadBytesResumable(storageRef, blob);

            // Monitor upload progress
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    console.error('Failed to upload audio:', error);
                },
                async () => {
                    // Get the download URL once upload is complete
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('Audio available at', downloadURL);
                }
            );
        } catch (error) {
            console.error('Error uploading recorded audio:', error);
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

    // Function to add new ad data to Firestore and upload audio
    const handleAddAdData = async () => {
        try {
            const formattedTime = getCurrentTime();

            const newAd = {
                DriverName: fullName,
                PickUpTown: pickuptownData,
                PickUpLocation: pickuplocationData,
                DropOffTown: dropofftownData,
                DropOffLocation: dropofflocationData,
                Price: priceData,
                Description: descriptionData,
                PickUpDate: dateData,
                PickUpTime: pickuptimeData,
                DropOffTime: dropoftimeData,
                VehicleType: vehicletypeData,
                PassengerCount: passengercountData,
                DriverUserID: userID,
                PublishedTime: formattedTime,
                // Do not include customId initially; it will be added later
            };

            // Add new ad to Firestore and get the generated document ID (customId)
            const customId = await addNewAdData(newAd);
            console.log("New ad added by: ", userID);
            console.log("New ad added with: ", customId);

            // Update the document to include the customId
            await updateAdData(customId, { AdID: customId });

            // Upload audio to Firebase Storage with docId as the filename
            if (recordedaudioData) {
                await uploadRecordedAudio(recordedaudioData, customId);
                console.log("Audio uploaded with filename: ", `${customId}.m4a`);
            }
        } catch (error) {
            console.error("Error adding new ad or uploading audio: ", error);
        }
    };


    // Handle the post action
    const handlePost = () => {
        if (AllValue) {
            handleAddAdData(); // Add ad and upload audio
            navigation.goBack(); // After successful post
        }
    };

    return (
        <TouchableOpacity
            onPress={handlePost}
            activeOpacity={0.8}
            style={[Styles.ButtonContainer, AllValue && { backgroundColor: Colors.PrimaryYellow }]}
        >
            <View style={{ width: 54, height: 24 }}>
                <Text style={[TextStyles.SemiBold17grayscale500, AllValue && { color: Colors.AdditionalWhite }]}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

// Styles
const Styles = StyleSheet.create({
    ButtonContainer: {
        height: 58,
        borderRadius: 8,
        backgroundColor: Colors.Grayscale200,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
});

export default Button01;
