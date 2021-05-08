import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthenticationParamList } from "../../types";
import firebase from "firebase";

const RegisterScreen = ({
  navigation,
}: StackScreenProps<AuthenticationParamList, "RegisterScreen">) => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleRegister = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register page</Text>
      <TextInput placeholder="email" onChangeText={(text) => setEmail(text)} />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      <Button onPress={handleRegister} title="Sign Up" />
    </View>
  );
};

export default RegisterScreen;

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
