import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RootStackParamList } from "../types";

const LoginScreen = ({
  navigation,
}: StackScreenProps<RootStackParamList, "NotFound">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login page</Text>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
});
