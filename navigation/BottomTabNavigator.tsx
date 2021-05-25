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

export const BottomTabNavigator = (props: PropsFromRedux) => {
  const colorScheme = useColorScheme();
  const { currentUser } = props;

  React.useEffect(() => {
    props.fetchUser();
  }, []);

  return (
    <BottomTab.Navigator initialRouteName="Library">
      <BottomTab.Screen
        name="Library"
        component={LibraryNavigator}
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faBook} />,
        }}
      />

      <BottomTab.Screen
        name="MyRates"
        component={MyRatesNavigator}
        options={{
          tabBarIcon: () => <FontAwesomeIcon icon={faStar} />,
        }}
      />
    </BottomTab.Navigator>
  );
};

const BottomTab = createBottomTabNavigator<BottomTabParamList>();
// const BottomTab = createMaterialBottomTabNavigator<BottomTabParamList>();

const LibraryStack = createStackNavigator<LibraryParamList>();
const LibraryNavigator = ({ navigation }: any) => {
  return (
    <LibraryStack.Navigator>
      <LibraryStack.Screen
        name="LibraryScreen"
        component={LibraryScreen}
        options={{
          headerTitle: "Library",
          headerRight: () => (
            <View>
              <FontAwesomeIcon
                icon={faPlus}
                onClick={() => navigation.navigate("NewBookScreen")}
              />
            </View>
          ),
        }}
      />
      <LibraryStack.Screen
        name="NewBookScreen"
        component={NewBookScreen}
        options={{
          headerTitle: "New book",
        }}
      />
      <LibraryStack.Screen
        name="BookDetailsScreen"
        component={BookDetailsScreen}
        options={{
          headerTitle: "Book Details",
        }}
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
        options={{
          headerTitle: "My rates",
          headerRight: () => (
            <FontAwesomeIcon
              icon={faSignOutAlt}
              onClick={() => firebase.auth().signOut()}
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
