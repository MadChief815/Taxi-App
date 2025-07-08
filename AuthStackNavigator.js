import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './Screens/StackScreens/SignIn';
import SignUpScreen from './Screens/StackScreens/SignUp';
import ForgotPasswordScreen from './Screens/StackScreens/ForgotPass';

const AuthStack = createStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="SignIn">
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
