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
import { fetchUser } from "../../redux/actions";
import { Button, RadioButton, TextInput } from "react-native-paper";

interface BookDetailsScreenRouteParams {
  book: Book;
}

interface OwnProps {
  route: any;
  navigation: any;
}

const BookDetailsScreen = (props: OwnProps) => {
  const userUid = firebase.auth().currentUser?.uid;
  const { book }: BookDetailsScreenRouteParams = props.route.params;
  const [checkedRate, setCheckedRate] = React.useState("third");

  const rateBook = () => {
    console.log(userUid);
    console.log(checkedRate);
    props.navigation.navigate("LibraryScreen");
  };

  const deleteBook = () => {
    firebase.firestore().collection("books").doc(book.uid).delete();
    props.navigation.navigate("LibraryScreen");
  };

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={faTrash} onClick={deleteBook} />
      <Text style={styles.title}>{book.name}</Text>
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
