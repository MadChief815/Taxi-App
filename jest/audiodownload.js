import { getStorage, ref, getDownloadURL } from 'firebase/storage';

// Function to download audio using customId
export const downloadAudioFromFirebase = async (customId) => {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `Audio/${customId}.m4a`); 

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Audio file download URL:', downloadURL);
    return downloadURL;
  } catch (error) {
    console.error('Error downloading audio:', error);
    throw error;
  }
};
