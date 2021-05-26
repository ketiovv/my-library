import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import useColorScheme from "../hooks/useColorScheme";
import LandingScreen from "../screens/Authentication/LandingScreen";
import LoginScreen from "../screens/Authentication/LoginScreen";
import RegisterScreen from "../screens/Authentication/RegisterScreen";
import { AuthenticationParamList } from "../types";

const AuthenticationStack = createStackNavigator<AuthenticationParamList>();

const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="LandingScreen"
      headerMode={"none"}
    >
      <AuthenticationStack.Screen
        name="LandingScreen"
        component={LandingScreen}
      />
      <AuthenticationStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthenticationStack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </AuthenticationStack.Navigator>
  );
};

export default AuthenticationNavigator;
