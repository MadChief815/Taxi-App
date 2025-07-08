import { firestore } from '../firebaseConfig'
import { doc, setDoc, collection, addDoc, Timestamp, getDocs } from 'firebase/firestore';
import useStore from '../../src/Store';

export const submitRating = async ( reviewerID, rating, review) => {
    // Validate rating to ensure it's between 0 and 5 (including decimals)
    if (rating < 0 || rating > 5) {
        console.error('Rating must be between 0 and 5');
        return;
    }

    try {
        const { userID } = useStore.getState();
        const ratingRef = collection(firestore, `DB03_Ratings/${userID}/Ratings`);
        await addDoc(ratingRef, {
            reviewerID: reviewerID,
            rating: rating,
            review: review,
            timestamp: Timestamp.now(),
        });
        console.log('Rating submitted successfully!');
    } catch (error) {
        console.error('Error submitting rating: ', error);
    }
};

export const calculateAverageRating = async () => {
    try {
        const { userID } = useStore.getState();
        const ratingsRef = collection(firestore, `DB03_Ratings/${userID}/Ratings`);
        const querySnapshot = await getDocs(ratingsRef);
        let totalRating = 0;
        let ratingCount = 0;

        querySnapshot.forEach((doc) => {
            totalRating += doc.data().rating; // Sum all ratings
            ratingCount++;
        });

        let averageRating = ratingCount > 0 ? totalRating / ratingCount : 0;

        // Ensure the average rating is capped between 0 and 5
        averageRating = Math.min(Math.max(averageRating, 0), 5);

        // Save the average rating to the user's document
        const userRef = doc(firestore, 'Users', ratedUserID);
        await setDoc(userRef, { averageRating }, { merge: true });

        console.log('Average rating updated successfully! Average Rating: ', averageRating);
    } catch (error) {
        console.error('Error calculating average rating: ', error);
    }
};

export const getUserReviews = async (ratedUserID) => {
    try {
        const ratingsRef = collection(firestore, `Users/${ratedUserID}/Ratings`);
        const querySnapshot = await getDocs(ratingsRef);
        const reviews = [];

        querySnapshot.forEach((doc) => {
            reviews.push(doc.data());
        });

        return reviews;
    } catch (error) {
        console.error('Error fetching reviews: ', error);
    }
};