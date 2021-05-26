import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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
  NewBookParamList,
} from "../types";
import { fetchUser } from "../redux/actions";
import { AnyAction, bindActionCreators } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { AppDispatch, RootState } from ".";
import { Button, View } from "react-native";
import firebase from "firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faPlus,
  faSignOutAlt,
  faStar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Icon } from "react-native-eva-icons";

export const BottomTabNavigator = (props: PropsFromRedux) => {
  const colorScheme = useColorScheme();
  const { currentUser } = props;

  React.useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <BottomTab.Navigator
      initialRouteName="Library"
      activeColor={Colors.material.white}
      inactiveColor={Colors.material.black}
      barStyle={{ backgroundColor: Colors.material.light }}
    >
      <BottomTab.Screen
        name="Library"
        component={LibraryNavigator}
        options={{
          tabBarIcon: () => <Ionicons name="library" size={20} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="NewBook"
        component={NewBookNavigator}
        options={{
          tabBarIcon: () => <Entypo name="plus" size={20} color="black" />,
        }}
      />
      <BottomTab.Screen
        name="MyRates"
        component={MyRatesNavigator}
        options={{
          tabBarIcon: () => <AntDesign name="star" size={20} color="black" />,
        }}
      />
    </BottomTab.Navigator>
  );
};

// const BottomTab = createBottomTabNavigator<BottomTabParamList>();
const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

const LibraryStack = createStackNavigator<LibraryParamList>();
const LibraryNavigator = () => {
  return (
    <LibraryStack.Navigator initialRouteName="LibraryScreen">
      <LibraryStack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          headerTitle: "Library",
          headerTitleStyle: {
            color: Colors.material.black,
          },
          headerStyle: {
            backgroundColor: Colors.material.primary,
          },
        }}
      />

      <LibraryStack.Screen
        name="BookDetailsScreen"
        component={BookDetailsScreen}
        options={{
          headerTitle: "Book Details",
          headerTitleStyle: {
            color: Colors.material.black,
          },
          headerStyle: {
            backgroundColor: Colors.material.primary,
          },
        }}
      />
    </LibraryStack.Navigator>
  );
};

const NewBookStack = createStackNavigator<NewBookParamList>();
const NewBookNavigator = () => {
  return (
    <NewBookStack.Navigator>
      <NewBookStack.Screen
        name="NewBookScreen"
        component={NewBookScreen}
        options={{
          headerTitle: "New book",
          headerTitleStyle: {
            color: Colors.material.black,
          },
          headerStyle: {
            backgroundColor: Colors.material.primary,
          },
        }}
      />
    </NewBookStack.Navigator>
  );
};

const MyRatesStack = createStackNavigator<MyRatesParamList>();
const MyRatesNavigator = () => {
  return (
    <MyRatesStack.Navigator>
      <MyRatesStack.Screen
        name="MyRatesScreen"
        component={MyRatesScreen}
        options={{
          headerTitle: "My rates",
          headerTitleStyle: {
            color: Colors.material.black,
          },
          headerStyle: {
            backgroundColor: Colors.material.primary,
          },
          headerRight: () => (
            <Entypo
              name="log-out"
              size={24}
              color="black"
              onPress={() => firebase.auth().signOut()}
            />
          ),
        }}
      />
    </MyRatesStack.Navigator>
  );
};

const mapStateToProps = (store: RootState) => ({
  currentUser: store.userState.currentUser,
});
const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(BottomTabNavigator);
