import { create } from 'zustand';

const useStore = create((set) => ({

    // Data to Post
    DTP: {
        pickuptownData: "",
        setPickUpTownData: (value) => set(state => ({ DTP: { ...state.DTP, pickuptownData: value } })),

        pickuplocationData: "",
        setPickUpLocationData: (value) => set(state => ({ DTP: { ...state.DTP, pickuplocationData: value } })),
        
        dropofftownData: "",
        setDropOffTownData: (value) => set(state => ({ DTP: { ...state.DTP, dropofftownData: value } })),
        
        dropofflocationData: "",
        setDropOffLocationData: (value) => set(state => ({ DTP: { ...state.DTP, dropofflocationData: value } })),
        
        priceData: "",
        setPriceData: (value) => set(state => ({ DTP: { ...state.DTP, priceData: value } })),
        
        descriptionData: "",
        setDescriptionData: (value) => set(state => ({ DTP: { ...state.DTP, descriptionData: value } })),

        dateData: "",
        setDateData: (value) => set(state => ({ DTP: { ...state.DTP, dateData: value } })),

        pickuptimeData: "",
        setPickUpTimeData: (value) => set(state => ({ DTP: { ...state.DTP, pickuptimeData: value } })),

        dropoftimeData: "",
        setDropOfTimeData: (value) => set(state => ({ DTP: { ...state.DTP, dropoftimeData: value } })),

        vehicletypeData: "",
        setVehicleTypeData: (value) => set(state => ({ DTP: { ...state.DTP, vehicletypeData: value } })),

        passengercountData: "",
        setPassengerCountData: (value) => set(state => ({ DTP: { ...state.DTP, passengercountData: value } })),

        recordedaudioData: null,
        setRecordedAudioData: (value) => set(state => ({ DTP: { ...state.DTP, recordedaudioData: value } })),
    },
}));

export default useStore;
