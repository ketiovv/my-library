import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import firebase from "firebase";
import * as React from "react";
import { Button, ColorSchemeName, View, Text } from "react-native";

import NotFoundScreen from "../screens/NotFoundScreen";
import { RootStackParamList } from "../types";
import AuthenticationNavigator from "./AuthenticationNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import LinkingConfiguration from "./LinkingConfiguration";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../redux/reducers";
import thunk from "redux-thunk";
import CustomNavigationBar from "../components/CustomNavigationBar";

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);
  const [loaded, setIsLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoggedIn(false);
        setIsLoaded(true);
      } else {
        setLoggedIn(true);
        setIsLoaded(true);
      }
    });
  });

  if (!loaded) {
    return <Text>Loading..</Text>;
  } else {
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        {loggedIn && (
          <Provider store={store}>
            <RootNavigator />
          </Provider>
        )}
        {!loggedIn && <AuthenticationNavigator />}
      </NavigationContainer>
    );
  }
};

export default Navigation;

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
    </Stack.Navigator>
  );
};
