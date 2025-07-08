import { create } from 'zustand';

const AdsStore = create((set) => ({
    // My Ads Data
    myAdsData: {
        ActveAds: null,
        setActveAds: (value) => set(state => ({ myAdsData: { ...state.myAdsData, ActveAds: value } })),
        RequestsAds: null,
        setRequestsAds: (value) => set(state => ({ myAdsData: { ...state.myAdsData, RequestsAds: value } })),
        GivenAds: null,
        setGivenAds: (value) => set(state => ({ myAdsData: { ...state.myAdsData, GivenAds: value } })),
        ReviewAds: null,
        setReviewAds: (value) => set(state => ({ myAdsData: { ...state.myAdsData, ReviewAds: value } })),
        CompletedAds: null,
        setCompletedAds: (value) => set(state => ({ myAdsData: { ...state.myAdsData, CompletedAds: value } })),
        IncompleteAds: null,
        setIncompleteAds: (value) => set(state => ({ myAdsData: { ...state.myAdsData, IncompleteAds: value } })),
        UntakenAds: null,
        setUntakenAds: (value) => set(state => ({ myAdsData: { ...state.myAdsData, UntakenAds: value } })),
    },
}));

export default AdsStore;
