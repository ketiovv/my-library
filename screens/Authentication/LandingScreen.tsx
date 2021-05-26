import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import Colors from "../../constants/Colors";
import { AuthenticationParamList } from "../../types";

const LandingScreen = ({
  navigation,
}: StackScreenProps<AuthenticationParamList, "LandingScreen">) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Landing page</Text>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("LoginScreen")}
        mode="contained"
        theme={{ colors: { primary: Colors.material.dark } }}
      >
        Login
      </Button>
      <Button
        style={styles.button}
        onPress={() => navigation.navigate("RegisterScreen")}
        mode="contained"
        theme={{ colors: { primary: Colors.material.dark } }}
      >
        Register
      </Button>
    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  button: {
    marginTop: 25,
    width: "50%",
    alignSelf: "center",
  },
});
