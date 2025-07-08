import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(persist(
  (set) => ({
    userID: null,
    setUserID: (userID) => set({ userID }),
  }),
  {
    name: 'user-store', // Unique name for local storage
  }
));

export default useStore;
