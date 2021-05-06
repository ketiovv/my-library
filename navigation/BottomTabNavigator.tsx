/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import LibraryScreen from "../screens/LibraryScreen";
import MyRatesScreen from "../screens/MyRatesScreen";
import {
  BottomTabParamList,
  LibraryParamList,
  MyRatesParamList,
} from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Library"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Library"
        component={LibraryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyRates"
        component={MyRatesNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LibraryStack = createStackNavigator<LibraryParamList>();

function LibraryNavigator() {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{ headerTitle: "Library Title" }}
      />
    </LibraryStack.Navigator>
  );
}

const MyRatesStack = createStackNavigator<MyRatesParamList>();

function MyRatesNavigator() {
  return (
    <MyRatesStack.Navigator>
      <MyRatesStack.Screen
        name="MyRatesScreen"
        component={MyRatesScreen}
        options={{ headerTitle: "My rates Title" }}
      />
    </MyRatesStack.Navigator>
  );
}