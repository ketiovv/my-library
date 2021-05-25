import firebase from "firebase";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";

const MyRatesScreen = () => {
  const [myRates, setMyRates] = React.useState([]);
  const loadMyRates = React.useCallback(() => {
    firebase
      .firestore()
      .collection("userbooks")
      .get()
      .then((snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
      });
  }, []);

  React.useEffect(() => {
    loadMyRates();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My rates</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
    </View>
  );
};

export default MyRatesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
