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
import BookDetailsScreen from "../screens/Library/BookDetailsScreen";
import LibraryScreen from "../screens/Library/LibraryScreen";
import MyRatesScreen from "../screens/MyRates/MyRatesScreen";
import NewBookScreen from "../screens/Library/NewBookScreen";
import {
  BottomTabParamList,
  LibraryParamList,
  MyRatesParamList,
} from "../types";
import { fetchUser } from "../redux/actions";
import { AnyAction, bindActionCreators } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from ".";

export const BottomTabNavigator = (props: PropsFromRedux) => {
  const colorScheme = useColorScheme();
  const { currentUser } = props;
  console.log(currentUser);

  React.useEffect(() => {
    //@ts-ignore
    props.fetchUser();
  }, []);

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
};

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
const TabBarIcon = (props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) => {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
};

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const LibraryStack = createStackNavigator<LibraryParamList>();
const LibraryNavigator = () => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{ headerTitle: "Library Title" }}
      />
      <LibraryStack.Screen
        name="NewBookScreen"
        component={NewBookScreen}
        options={{ headerTitle: "New book" }}
      />
      <LibraryStack.Screen
        name="BookDetailsScreen"
        component={BookDetailsScreen}
        options={{ headerTitle: "Book Details" }}
      />
    </LibraryStack.Navigator>
  );
};

const MyRatesStack = createStackNavigator<MyRatesParamList>();
const MyRatesNavigator = () => {
  return (
    <MyRatesStack.Navigator>
      <MyRatesStack.Screen
        name="MyRatesScreen"
        component={MyRatesScreen}
        options={{ headerTitle: "My rates Title" }}
      />
    </MyRatesStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const mapStateToProps = (store: RootState) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BottomTabNavigator);

type PropsFromRedux = ConnectedProps<typeof connect>;
