import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import * as React from "react";
import { StyleSheet } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators } from "redux";
import { Text, View } from "../../components/Themed";
import { AppDispatch, RootState } from "../../navigation";
import Book from "../../types/Book";
import UserBooks from "../../types/UserBooks";
import { fetchUser } from "../../redux/actions";
import {
  ActivityIndicator,
  Button,
  RadioButton,
  TextInput,
} from "react-native-paper";
import Rate from "../../types/Rate";
import { useIsFocused } from "@react-navigation/native";

interface BookDetailsScreenRouteParams {
  book: Book;
}

interface OwnProps {
  route: any;
  navigation: any;
}

const BookDetailsScreen = (props: OwnProps) => {
  const isFocused = useIsFocused();
  const [bookIsRated, setBookIsRated] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const userUid = firebase.auth().currentUser?.uid;
  const { book }: BookDetailsScreenRouteParams = props.route.params;
  const [checkedRate, setCheckedRate] = React.useState<string>("3");
  const [myRate, setMyRate] = React.useState<number>(0);
  const [myRateUid, setMyRateUid] = React.useState<string>("");

  const checkIfBookIsRated = async () => {
    let bookIsRated = false;
    await firebase
      .firestore()
      .collection("userbooks")
      .orderBy("rate", "desc")
      .get()
      .then(async (snapshot) => {
        const allRates = snapshot.docs.map((doc) => doc.data() as Rate);
        const ids = snapshot.docs.map((doc) => doc.id);
        for (var i = 0; i < allRates.length; i++) {
          allRates[i].uid = ids[i];
        }

        await Promise.all(
          allRates.map(async (rate) => {
            if (rate.book === book.uid) {
              bookIsRated = true;
              setMyRate(rate.rate);
              setMyRateUid(rate.uid);
            }
          })
        );
      });
    return bookIsRated;
  };

  const rateBook = () => {
    firebase
      .firestore()
      .collection("userbooks")
      .add({
        book: book.uid,
        rate: +checkedRate,
        user: userUid,
      });

    props.navigation.navigate("LibraryScreen");
  };

  const deleteBook = () => {
    firebase.firestore().collection("books").doc(book.uid).delete();
    if (bookIsRated) {
      firebase.firestore().collection("userbooks").doc(myRateUid).delete();
    }
    props.navigation.navigate("LibraryScreen");
  };

  React.useEffect(() => {
    setIsLoading(true);
    checkIfBookIsRated().then((data) => {
      setBookIsRated(data);
      setIsLoading(false);
    });
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faTrash} onClick={deleteBook} />
      <Text style={styles.title}>{book.name}</Text>
      {isLoading ? (
        <ActivityIndicator animating={true} color="Black" size="large" />
      ) : !bookIsRated ? (
        <>
          <View style={styles.rateContainer}>
            <RadioButton
              value="1"
              status={checkedRate === "1" ? "checked" : "unchecked"}
              onPress={() => setCheckedRate("1")}
            />
            <Text>1</Text>
          </View>
          <View style={styles.rateContainer}>
            <RadioButton
              value="2"
              status={checkedRate === "2" ? "checked" : "unchecked"}
              onPress={() => setCheckedRate("2")}
            />
            <Text>2</Text>
          </View>
          <View style={styles.rateContainer}>
            <RadioButton
              value="3"
              status={checkedRate === "3" ? "checked" : "unchecked"}
              onPress={() => setCheckedRate("3")}
            />
            <Text>3</Text>
          </View>
          <View style={styles.rateContainer}>
            <RadioButton
              value="4"
              status={checkedRate === "4" ? "checked" : "unchecked"}
              onPress={() => setCheckedRate("4")}
            />
            <Text>4</Text>
          </View>
          <View style={styles.rateContainer}>
            <RadioButton
              value="5"
              status={checkedRate === "5" ? "checked" : "unchecked"}
              onPress={() => setCheckedRate("5")}
            />
            <Text>5</Text>
          </View>
          <Button onPress={rateBook}>Rate</Button>
        </>
      ) : (
        <Text>My rate: {myRate}</Text>
      )}
    </View>
  );
};

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
  rateContainer: {
    flexDirection: "row",
  },
});

export default BookDetailsScreen;
