import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import useColorScheme from "../hooks/useColorScheme";
import LandingScreen from "../screens/Authentication/LandingScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import { AuthenticationParamList } from "../types";

const AuthenticationStack = createStackNavigator<AuthenticationParamList>();

const AuthenticationNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <AuthenticationStack.Navigator initialRouteName="LandingScreen">
      <AuthenticationStack.Screen
        name="LandingScreen"
        component={LandingScreen}
        // options={{ headerTitle: "Welcome!" }}
      />
      <AuthenticationStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        // options={{ headerTitle: "Login" }}
      />
      <AuthenticationStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        // options={{ headerTitle: "Register" }}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
