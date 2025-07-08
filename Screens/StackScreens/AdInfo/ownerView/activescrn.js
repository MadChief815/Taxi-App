import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    SafeAreaView
} from 'react-native';

// Components
import { rgbaColors, Colors } from '../../../../Components/Styles/Colors';
import { MainStyles, TextStyles } from '../../../../Components/Styles/Styles';

// Header
import Header from '../../../../Components/Headers/AdsOwner/Active/ActiveAdOwnerHeader';

const ActiveAdScreen = ({ route }) => {

    // Function to calculate the time difference between two dates
    const calculateTimeDifference = (publishedTime) => {
        const currentDate = new Date();

        // Parse the publishedTime (assumes format "YYYY-MM-DD HH:MM:SS")
        const publishedDate = new Date(publishedTime);

        // Get the difference in milliseconds
        const timeDifferenceMs = currentDate - publishedDate;

        // Convert milliseconds to seconds, minutes, hours, days
        const seconds = Math.floor(timeDifferenceMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        // Return the time difference in the most significant unit
        if (days > 0) {
            return `${days} D`;
        } else if (hours > 0) {
            return `${hours} H`;
        } else if (minutes > 0) {
            return `${minutes} Min`;
        } else {
            return `${seconds} Sec`;
        }
    };

    // Function to fetch and compare the time since it was published
    const [timeSincePublished, setTimeSincePublished] = useState("");

    const fetchAdDataAndCompareTime = async () => {
        try {
            const publishedTime = rideData.PublishedTime;
            const timeSincePublished = calculateTimeDifference(publishedTime);
            setTimeSincePublished(timeSincePublished)
        } catch (error) {
            console.error("Error fetching ad data:", error);
        }
    };

    // Call Date Compare
    useEffect(() => {
        fetchAdDataAndCompareTime();

        const intervalId = setInterval(() => {
            fetchAdDataAndCompareTime();
        }, 60000);

        return () => clearInterval(intervalId);
    }, []);

    const { rideData } = route.params;
    const trimmedName = timeSincePublished;

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={Colors.AdditionalWhite} />
            <Header name={trimmedName} />
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
});

export default ActiveAdScreen;