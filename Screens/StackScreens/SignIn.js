import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/firebaseConfig';
import { findUserIDByEmail, findFullNameByEmail } from '../../Firebase/FireStore/firestoreQueries';
import useStore from '../../src/Store';

const SignInScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
  
      // Fetch user ID and full name in parallel
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
  
        // Navigate once with both userID and fullName
        navigation.navigate('Tabs', { userID, fullName });
      } else {
        setError('User not found');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
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
      <Button title="Sign In" onPress={handleSignIn} color={"#6E6E6E"} />
      <View style={{ paddingBottom: 16 }} />
      <Button title="Go to Sign Up" onPress={() => navigation.navigate('SignUp')} color={"#6E6E6E"} />
      <View style={{ paddingBottom: 16 }} />
      <Button title="Forgot Password?" onPress={() => navigation.navigate('ForgotPassword')} color={"#6E6E6E"} />
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

export default SignInScreen;
