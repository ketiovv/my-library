import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthenticationParamList } from "../../types";
import firebase from "firebase";

const LoginScreen = ({
  navigation,
}: StackScreenProps<AuthenticationParamList, "LoginScreen">) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login page</Text>
      <TextInput placeholder="email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={handleLogin} title="Sign In" />
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
