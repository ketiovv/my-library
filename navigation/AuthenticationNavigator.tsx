import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Button } from "react-native";
import { View } from "../components/Themed";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import BookDetailsScreen from "../screens/BookDetailsScreen";
import LandingScreen from "../screens/LandingScreen";
import LibraryScreen from "../screens/LibraryScreen";
import LoginScreen from "../screens/LoginScreen";
import MyRatesScreen from "../screens/MyRatesScreen";
import NewBookScreen from "../screens/NewBookScreen";
import RegisterScreen from "../screens/RegisterScreen";
import {
  AuthenticationParamList,
  BottomTabParamList,
  LibraryParamList,
  MyRatesParamList,
} from "../types";

const AuthenticationStack = createStackNavigator<AuthenticationParamList>();

const AuthenticationNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <AuthenticationStack.Navigator initialRouteName="LandingScreen">
      <AuthenticationStack.Screen
        name="LandingScreen"
        component={LandingScreen}
        options={{ headerTitle: "Welcome!" }}
      />
      <AuthenticationStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
      <AuthenticationStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
