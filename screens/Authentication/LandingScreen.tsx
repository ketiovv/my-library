import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { AuthenticationParamList } from "../../types";

const LandingScreen = ({
  navigation,
}: StackScreenProps<AuthenticationParamList, "LandingScreen">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Landing page</Text>
      <Button
        title={"Login"}
        onPress={() => navigation.navigate("LoginScreen")}
      />
      <Button
        title={"Register"}
        onPress={() => navigation.navigate("RegisterScreen")}
      />
    </View>
  );
};

export default LandingScreen;

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
