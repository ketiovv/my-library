import { StackScreenProps } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import { AuthenticationParamList } from "../../types";
import firebase from "firebase";
import "firebase/firestore";
import { Button, TextInput, Text, Title } from "react-native-paper";
import Colors from "../../constants/Colors";

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
        const user = firebase.auth().currentUser;
        if (user !== null) {
          firebase.firestore().collection("users").doc(user.uid).set({
            email,
          });
        }
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Register page</Title>
      <TextInput
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        label="Login"
        placeholder="Not required"
        theme={{ colors: { primary: Colors.material.dark } }}
      />
      <TextInput
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        mode="outlined"
        label="Password"
        placeholder="Not required"
        theme={{ colors: { primary: Colors.material.dark } }}
      />

      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          onPress={handleRegister}
          mode="contained"
          theme={{ colors: { primary: Colors.material.dark } }}
        >
          Sign Up
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            navigation.navigate("LandingScreen");
          }}
          mode="contained"
          theme={{ colors: { primary: Colors.material.dark } }}
        >
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: "40%",
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 35,
  },
  button: {
    marginTop: 15,
    width: "50%",
    alignSelf: "center",
  },
});
