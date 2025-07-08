import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useStore from '../../../src/Store';
import { Colors } from '../../Styles/Colors';

// Icons
import ReqIcon from "./Req.svg";
import SelectedReqIcon from "./SelectedReq.svg";
import RidingIcon from "./Riding.svg";
import SelectedRidingIcon from "./SelectedRiding.svg";
import WaitingIcon from "./Waiting.svg";
import SelectedWaitingIcon from "./SelectedWaiting.svg";
import CompletedIcon from "./Completed.svg";
import SelectedCompletedIcon from "./SelectedCompleted.svg";
import IncompleteIcon from "./Incomplete.svg";
import SelectedIncompleteIcon from "./SelectedIncomplete.svg";

// MyRides Data
import RequestData from "../../../src/MyRides/Requested";
import CompletedData from '../../../src/MyRides/Completed';
import IncompleteData from '../../../src/MyRides/Incomplete';
import RidingData from '../../../src/MyRides/Riding';
import WaitingToReviewData from '../../../src/MyRides/Waiting';


const Item = () => {

    // Conts
    const {
        MRrequiest, setMRrequiest,
        MRriding, setMRriding,
        MRwaiting, setMRwaiting,
        MRcompleted, setMRcompleted,
        MRincomplete, setMRincomplete,
        setMRselectedData
    } = useStore(state => state.myRides);

    // Data Count
    const ReqLength = RequestData.length;
    const RidingLength = RidingData.length;
    const WaitingLength = WaitingToReviewData.length;
    const CompletedLength = CompletedData.length;
    const IncompleteLength = IncompleteData.length;

    // Handlers
    const MRrequiestHandler = () => {
        setMRrequiest(true);
        setMRriding(false);
        setMRwaiting(false);
        setMRcompleted(false);
        setMRincomplete(false);
        setMRselectedData(RequestData);
    };
    const MRridingHandler = () => {
        setMRrequiest(false);
        setMRriding(true);
        setMRwaiting(false);
        setMRcompleted(false);
        setMRincomplete(false);
        setMRselectedData(RidingData);
    };
    const MRwaitingHandler = () => {
        setMRrequiest(false);
        setMRriding(false);
        setMRwaiting(true);
        setMRcompleted(false);
        setMRincomplete(false);
        setMRselectedData(WaitingToReviewData);
    };
    const MRcompletedHandler = () => {
        setMRrequiest(false);
        setMRriding(false);
        setMRwaiting(false);
        setMRcompleted(true);
        setMRincomplete(false);
        setMRselectedData(CompletedData);
    };
    const MRincompleteHandler = () => {
        setMRrequiest(false);
        setMRriding(false);
        setMRwaiting(false);
        setMRcompleted(false);
        setMRincomplete(true);
        setMRselectedData(IncompleteData);
    };

    return (
        <View style={Styles.Container}>
            {/* Requiest */}
            <TouchableOpacity activeOpacity={0.9} onPress={MRrequiestHandler}>
                <View style={[MRrequiest ? Styles.SelectedItemContainer : Styles.ItemConatiner, { width: 155 }]}>
                    <View style={{ paddingLeft: 16, paddingRight: 8 }}>
                        {MRrequiest ? <SelectedReqIcon width={24} height={24} /> : <ReqIcon width={24} height={24} />}
                    </View>
                    <Text style={MRrequiest ? Styles.SelectedtextStyles : Styles.textStyles}>Requested ({ReqLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Riding */}
            <TouchableOpacity activeOpacity={0.9} onPress={MRridingHandler}>
                <View style={[MRriding ? Styles.SelectedItemContainer : Styles.ItemConatiner, { width: 124 }]}>
                    <View style={{ paddingLeft: 16, paddingRight: 8 }}>
                        {MRriding ? <SelectedRidingIcon width={24} height={24} /> : <RidingIcon width={24} height={24} />}
                    </View>
                    <Text style={MRriding ? Styles.SelectedtextStyles : Styles.textStyles}>Riding ({RidingLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Waiting to review */}
            <TouchableOpacity activeOpacity={0.9} onPress={MRwaitingHandler}>
                <View style={[MRwaiting ? Styles.SelectedItemContainer : Styles.ItemConatiner, { width: 210 }]}>
                    <View style={{ paddingLeft: 16, paddingRight: 8 }}>
                        {MRwaiting ? <SelectedWaitingIcon width={24} height={24} /> : <WaitingIcon width={24} height={24} />}
                    </View>
                    <Text style={MRwaiting ? Styles.SelectedtextStyles : Styles.textStyles}>Waiting for review ({WaitingLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Completed */}
            <TouchableOpacity activeOpacity={0.9} onPress={MRcompletedHandler}>
                <View style={[MRcompleted ? Styles.SelectedItemContainer : Styles.ItemConatiner, { width: 162 }]}>
                    <View style={{ paddingLeft: 16, paddingRight: 8 }}>
                        {MRcompleted ? <SelectedCompletedIcon width={24} height={24} /> : <CompletedIcon width={24} height={24} />}
                    </View>
                    <Text style={MRcompleted ? Styles.SelectedtextStyles : Styles.textStyles}>Completed ({CompletedLength})</Text>
                </View>
            </TouchableOpacity>
            {/* Incompleted */}
            <TouchableOpacity activeOpacity={0.9} onPress={MRincompleteHandler}>
                <View style={[MRincomplete ? Styles.SelectedItemContainer : Styles.ItemConatiner, { width: 160 }]}>
                    <View style={{ paddingLeft: 16, paddingRight: 8 }}>
                        {MRincomplete ? <SelectedIncompleteIcon width={24} height={24} /> : <IncompleteIcon width={24} height={24} />}
                    </View>
                    <Text style={MRincomplete ? Styles.SelectedtextStyles : Styles.textStyles}>Incomplete ({IncompleteLength})</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const Styles = StyleSheet.create({
    ItemConatiner: {
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
    }
});

export default Item;