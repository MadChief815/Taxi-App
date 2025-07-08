import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
import { addNewUserData, createUserFolders } from '../../Firebase/FireStore/firestoreService';
import { findUserIDByEmail, findFullNameByEmail } from '../../Firebase/FireStore/firestoreQueries';
import useStore from '../../src/Store';

// Helper function to generate a random string
const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const SignUpScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullName] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      // Create user account with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Call the function to store user data in Firestore with a custom ID
      const customId = await handleNewUser(user.uid);
  
      // Create user folders using the custom ID
      await createUserFolders(customId);
  
      // Fetch userID and fullName in parallel
      const [userID, fullName] = await Promise.all([
        findUserIDByEmail(email),
        findFullNameByEmail(email),
      ]);
  
      if (userID && fullName) {
        console.log('UserID:', userID);
        console.log('FullName:', fullName);
  
        const { setUserID, setFullName } = useStore.getState();
        setUserID(userID);
        setFullName(fullName);
  
        // Navigate to Tabs with both userID and fullName
        navigation.navigate('Tabs', { userID, fullName });
      } else {
        setError('User not found');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNewUser = async (uid) => {
    try {
      // Generate a unique string and create a custom ID
      const uniqueString = generateRandomString(20);
      const customId = `${fullname}_${uniqueString}`;

      // Create the new user object including UserID
      const newUser = {
        UserID: customId,
        UserUID: uid,
        FullName: fullname,
        Email: email,
        Password: password,
      };

      // Add user data to Firestore with the custom ID
      await addNewUserData(newUser, customId);
      console.log("New user added with custom ID: ", customId);
      return customId;
    } catch (error) {
      console.error("Error adding new user: ", error);
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Sign Up" onPress={handleSignUp} color={"#6E6E6E"} />
      <View style={{ paddingBottom: 16 }} />
      <Button title="Go to Sign In" onPress={() => navigation.navigate('SignIn')} color={"#6E6E6E"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
});

export default SignUpScreen;
