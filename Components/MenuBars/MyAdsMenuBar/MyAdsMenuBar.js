import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

// Components
import useStore from '../../../src/Store';
import AdsStore from "../../../src/AdsData/AdsStore";
import { Colors } from '../../Styles/Colors';

// Icons
import ActiveIcon from "./active.svg";
import SActiveIcon from "./Sactive.svg";
import RequestIcon from "./req.svg";
import SRequestIcon from "./Sreq.svg";
import GivenIcon from "./given.svg";
import SGivenIcon from "./Sgiven.svg";
import ReviewIcon from "./waiting.svg";
import SReviewIcon from "./Swaiting.svg";
import CompletedIcon from "./completed.svg";
import SCompletedIcon from "./Scompleted.svg";
import IncompleteIcon from "./incomplete.svg";
import SIncompleteIcon from "./Sincomplete.svg";
import UntakenIcon from "./untaken.svg";
import SUntakenIcon from "./Suntaken.svg";

// Firebase Imports
import {
    fetchActiveAds,
    fetchCompletedAds,
    fetchGivenAds,
    fetchIncompleteAds,
    fetchRequestedAds,
    fetchReviewAds,
    fetchUntakenAds
} from '../../../Firebase/FireStore/firestoreFetchAllAds';

const Item = () => {
    // Main Store (Store.js)
    const {
        MAactive, setMAactive,
        MArequest, setMArequest,
        MAgiven, setMAgiven,
        MAreview, setMAreview,
        MAcompleted, setMAcompleted,
        MAincomplete, setMAincomplete,
        MAuntaken, setMAuntaken,
        MAselectedData, setMAselectedData,
        setMAselectedAd,
    } = useStore(state => state.myAds);

    // Ads Store
    const {
        ActveAds, setActveAds,
        RequestsAds, setRequestsAds,
        GivenAds, setGivenAds,
        ReviewAds, setReviewAds,
        CompletedAds, setCompletedAds,
        IncompleteAds, setIncompleteAds,
        UntakenAds, setUntakenAds
    } = AdsStore(state => state.myAdsData);

    // Data Length
    const lengths = {
        ActiveLength: ActveAds ? ActveAds.length : 0,
        ReqLength: RequestsAds ? RequestsAds.length : 0,
        GivenLength: GivenAds ? GivenAds.length : 0,
        ReviewLength: ReviewAds ? ReviewAds.length : 0,
        CompletedLength: CompletedAds ? CompletedAds.length : 0,
        IncompleteLength: IncompleteAds ? IncompleteAds.length : 0,
        UntakenLength: UntakenAds ? UntakenAds.length : 0,
    };

    // Handler for Setting Active Ads
    const handleSetAds = async (fetchFunction, setAdsFunction, adType) => {
        setMAactive(adType === "Active");
        setMArequest(adType === "Requested");
        setMAgiven(adType === "Given");
        setMAreview(adType === "Review");
        setMAcompleted(adType === "Completed");
        setMAincomplete(adType === "Incomplete");
        setMAuntaken(adType === "Untaken");

        try {
            const data = await fetchFunction();
            setMAselectedData(data);
            setAdsFunction(data);
            setMAselectedAd(adType);
        } catch (error) {
            console.error(`Error fetching ${adType} ads:`, error);
        }
    };

    // Load all ads when the component is first mounted
    useEffect(() => {
        const loadAllAds = async () => {
            try {
                const activeData = await fetchActiveAds();
                setActveAds(activeData);
    
                const requestData = await fetchRequestedAds();
                setRequestsAds(requestData);
    
                const givenData = await fetchGivenAds();
                setGivenAds(givenData);
    
                const reviewData = await fetchReviewAds();
                setReviewAds(reviewData);
    
                const completedData = await fetchCompletedAds();
                setCompletedAds(completedData);
    
                const incompleteData = await fetchIncompleteAds();
                setIncompleteAds(incompleteData);
    
                const untakenData = await fetchUntakenAds();
                setUntakenAds(untakenData);
    
            } catch (error) {
                console.error("Error fetching ads:", error);
            }
        };
    
        // Delay the execution of loadAllAds by 5 seconds (5000 milliseconds)
        const timer = setTimeout(() => {
            loadAllAds();
        }, 1000);
    
        // Cleanup to clear the timeout if the component unmounts before the delay
        return () => clearTimeout(timer);
    
    }, []);

    // Fetch the currently active ad type when the screen is focused
    useFocusEffect(
        useCallback(() => {
            if (MAactive) {
                handleSetAds(fetchActiveAds, setActveAds, "Active");
            } else if (MArequest) {
                handleSetAds(fetchRequestedAds, setRequestsAds, "Requested");
            } else if (MAgiven) {
                handleSetAds(fetchGivenAds, setGivenAds, "Given");
            } else if (MAreview) {
                handleSetAds(fetchReviewAds, setReviewAds, "Review");
            } else if (MAcompleted) {
                handleSetAds(fetchCompletedAds, setCompletedAds, "Completed");
            } else if (MAincomplete) {
                handleSetAds(fetchIncompleteAds, setIncompleteAds, "Incomplete");
            } else if (MAuntaken) {
                handleSetAds(fetchUntakenAds, setUntakenAds, "Untaken");
            }
        }, [
            MAactive,
            MArequest,
            MAgiven,
            MAreview,
            MAcompleted,
            MAincomplete,
            MAuntaken,
        ])
    );

    return (
        <View style={Styles.Container}>
            {/* Active */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSetAds(fetchActiveAds, setActveAds, "Active")}>
                <View style={[MAactive ? Styles.SelectedItemContainer : Styles.ItemContainer, { width: 125 }]}>
                    <View style={Styles.iconContainer}>
                        {MAactive ? <SActiveIcon width={24} height={24} /> : <ActiveIcon width={24} height={24} />}
                    </View>
                    <Text style={MAactive ? Styles.SelectedtextStyles : Styles.textStyles}>Active ({lengths.ActiveLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Requests */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSetAds(fetchRequestedAds, setRequestsAds, "Requested")}>
                <View style={[MArequest ? Styles.SelectedItemContainer : Styles.ItemContainer, { width: 143 }]}>
                    <View style={Styles.iconContainer}>
                        {MArequest ? <SRequestIcon width={24} height={24} /> : <RequestIcon width={24} height={24} />}
                    </View>
                    <Text style={MArequest ? Styles.SelectedtextStyles : Styles.textStyles}>Requests ({lengths.ReqLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Given */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSetAds(fetchGivenAds, setGivenAds, "Given")}>
                <View style={[MAgiven ? Styles.SelectedItemContainer : Styles.ItemContainer, { width: 120 }]}>
                    <View style={Styles.iconContainer}>
                        {MAgiven ? <SGivenIcon width={24} height={24} /> : <GivenIcon width={24} height={24} />}
                    </View>
                    <Text style={MAgiven ? Styles.SelectedtextStyles : Styles.textStyles}>Given ({lengths.GivenLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Waiting for Review */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSetAds(fetchReviewAds, setReviewAds, "Review")}>
                <View style={[MAreview ? Styles.SelectedItemContainer : Styles.ItemContainer, { width: 213 }]}>
                    <View style={Styles.iconContainer}>
                        {MAreview ? <SReviewIcon width={24} height={24} /> : <ReviewIcon width={24} height={24} />}
                    </View>
                    <Text style={MAreview ? Styles.SelectedtextStyles : Styles.textStyles}>Waiting for Review ({lengths.ReviewLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Completed */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSetAds(fetchCompletedAds, setCompletedAds, "Completed")}>
                <View style={[MAcompleted ? Styles.SelectedItemContainer : Styles.ItemContainer, { width: 160 }]}>
                    <View style={Styles.iconContainer}>
                        {MAcompleted ? <SCompletedIcon width={24} height={24} /> : <CompletedIcon width={24} height={24} />}
                    </View>
                    <Text style={MAcompleted ? Styles.SelectedtextStyles : Styles.textStyles}>Completed ({lengths.CompletedLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Incomplete */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSetAds(fetchIncompleteAds, setIncompleteAds, "Incomplete")}>
                <View style={[MAincomplete ? Styles.SelectedItemContainer : Styles.ItemContainer, { width: 160 }]}>
                    <View style={Styles.iconContainer}>
                        {MAincomplete ? <SIncompleteIcon width={24} height={24} /> : <IncompleteIcon width={24} height={24} />}
                    </View>
                    <Text style={MAincomplete ? Styles.SelectedtextStyles : Styles.textStyles}>Incomplete ({lengths.IncompleteLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Untaken */}
            <TouchableOpacity activeOpacity={0.9} onPress={() => handleSetAds(fetchUntakenAds, setUntakenAds, "Untaken")}>
                <View style={[MAuntaken ? Styles.SelectedItemContainer : Styles.ItemContainer, { width: 140 }]}>
                    <View style={Styles.iconContainer}>
                        {MAuntaken ? <SUntakenIcon width={24} height={24} /> : <UntakenIcon width={24} height={24} />}
                    </View>
                    <Text style={MAuntaken ? Styles.SelectedtextStyles : Styles.textStyles}>Untaken ({lengths.UntakenLength})</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    ItemContainer: {
        alignItems: 'center',
        height: 48,
        flexDirection: "row",
        backgroundColor: Colors.AdditionalWhite
    },
    SelectedItemContainer: {
        alignItems: 'center',
        height: 48,
        flexDirection: "row",
        backgroundColor: Colors.AdditionalWhite,
        borderBottomWidth: 2,
        borderColor: Colors.PrimaryYellow
    },
    textStyles: {
        fontFamily: "CMedium",
        fontSize: 16,
        color: Colors.Grayscale500,
        backgroundColor: "transparent"
    },
    SelectedtextStyles: {
        fontFamily: "CSemiBold",
        fontSize: 16,
        color: Colors.PrimaryYellow,
    },
    Container: {
        flexDirection: "row",
        height: 48,
        backgroundColor: Colors.Grayscale50,
        alignItems: "center"
    },
    iconContainer: {
        paddingLeft: 16,
        paddingRight: 8
    }
});

export default Item;
