import { useIsFocused } from "@react-navigation/native";
import firebase from "firebase";
import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import MyRatesItem from "../../components/MyRates/MyRatesItem";
import { Text, View } from "../../components/Themed";
import Book from "../../types/Book";
import Rate from "../../types/Rate";

const MyRatesScreen = () => {
  const isFocused = useIsFocused();
  const userUid = firebase.auth().currentUser?.uid;
  const [myRates, setMyRates] = React.useState<Rate[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const loadMyRates = async () => {
    setIsLoading(true);
    const thisUserRate: Rate[] = [];

    await firebase
      .firestore()
      .collection("userbooks")
      .orderBy("rate", "desc")
      .get()
      .then(async (snapshot) => {
        const allRates = snapshot.docs.map((doc) => doc.data() as Rate);

        await Promise.all(
          allRates.map(async (rate) => {
            if (rate.user === userUid) {
              thisUserRate.push(rate);
            }
          })
        );
      });
    return thisUserRate;
  };

  const loadRateBookNames = async (data: Rate[]) => {
    const test = data;
    await Promise.all(
      test.map(async (rate) => {
        await firebase
          .firestore()
          .collection("books")
          .doc(rate?.book)
          .get()
          .then((snapshot) => {
            const book = snapshot.data() as Book;
            rate.bookName = book.name;
          });
      })
    ).then(() => {
      setIsLoading(false);
    });
    setMyRates(test);
  };

  React.useEffect(() => {
    loadMyRates().then((data) => {
      loadRateBookNames(data);
    });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} color="Black" size="large" />
      ) : (
        <ScrollView>
          {myRates.map((rate, index) => {
            return <MyRatesItem key={index} rate={rate} />;
          })}
        </ScrollView>
      )}
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
