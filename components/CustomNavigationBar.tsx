import { Appbar } from "react-native-paper";
import { Button, StyleSheet } from "react-native";
import * as React from "react";

const CustomNavigationBar = ({ navigation, previous }: any) => {
  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title="My awesome app" />
    </Appbar.Header>
  );
};
export default CustomNavigationBar;
