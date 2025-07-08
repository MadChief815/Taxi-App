# Taxi App (React Native)

Taxi Booking Application built with **React Native**, designed to provide real-time ride tracking, driver booking, and posting ride requests. The app development is currently on hold but still open for contributions and learning.

---

## Features

- **Real-time Location Tracking**
- **Book a Driver Instantly**
- **Post a Ride Request**
- **User Authentication**
- **(Planned)** Payment Integration
- **(Planned)** Navigation and Route Optimization
- **(Planned)** Driver/Passenger Panel Switch

---

## Status

This project is currently on hold, with several features partially implemented or planned. If you're interested in mobile app development, real-time tracking, or location-based services, this is still a great project to explore and contribute to.

---

## Contributing

Contributions are welcome! If you're looking to:

- Learn more about React Native
- Understand location services, sockets, and real-time tracking
- Help build a production-ready app from scratch

...feel free to fork the repo and submit a pull request. Your help would be **greatly appreciated**!

---

## Tech Stack

- **React Native (CLI)**
- **Zustand** (for state management)
- **React Navigation**
- **Firebase** (for backend, auth, and real-time features)
- **Socket.IO or WebSockets** (for live updates) *(planned)*

---

## Firebase Setup

This app uses Firebase for authentication and real-time features.

To set it up:

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com).
2. Enable **Email/Password Authentication** under **Authentication > Sign-in method**.
3. In **Project Settings**, go to the **General** tab and get your Firebase SDK config.
4. Enable Firebase Storage.
5. Enable Firestore Database.
6. Enable Firebase Realtime Database.
7. Replace the placeholder values in the config file:

### `firebaseConfig.js`

```js
// Firebase/firebaseConfig.js

export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

Make sure this file is correctly imported wherever Firebase is initialized.

---

## Getting Started

```bash
git clone https://github.com/MadChief815/Taxi-App.git
cd Taxi-App
npm install
npm start
```

Make sure you have Android Studio and environment setup ready for React Native CLI.

---

## License

This project is open-source and free to use under the [MIT License](LICENSE).

---

> Feel free to star ⭐ the repo if you find it interesting!
