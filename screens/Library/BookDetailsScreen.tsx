import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import firebase from "firebase";
import * as React from "react";
import { StyleSheet, Image } from "react-native";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators } from "redux";
import { Text, View } from "../../components/Themed";
import { AppDispatch, RootState } from "../../navigation";
import Book from "../../types/Book";
import { fetchUser } from "../../redux/actions";
import {
  ActivityIndicator,
  Button,
  RadioButton,
  TextInput,
} from "react-native-paper";
import Rate from "../../types/Rate";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../constants/Colors";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

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
            if (rate.book === book.uid && userUid == rate.user) {
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

    props.navigation.navigate("MyRatesScreen");
  };

  const deleteBook = () => {
    firebase.firestore().collection("books").doc(book.uid).delete();
    if (bookIsRated) {
      firebase.firestore().collection("userbooks").doc(myRateUid).delete();
    }
    props.navigation.navigate("LibraryScreen");
  };

  React.useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      checkIfBookIsRated().then((data) => {
        setBookIsRated(data);
        setIsLoading(false);
      });
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.titlePart1}>
          <Text style={styles.title}>{book.name}</Text>
        </View>
        <View style={styles.titlePart2}>
          <FontAwesome5
            name="trash"
            size={24}
            color="black"
            onPress={deleteBook}
          />
        </View>
      </View>

      <View style={styles.rateWrapper}>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color={Colors.material.dark}
            size="large"
          />
        ) : !bookIsRated ? (
          <View style={styles.allRatesContainer}>
            <View style={styles.rateContainer}>
              <RadioButton
                value="1"
                status={checkedRate === "1" ? "checked" : "unchecked"}
                onPress={() => setCheckedRate("1")}
                color={Colors.material.dark}
              />
              <Text>1</Text>
            </View>
            <View style={styles.rateContainer}>
              <RadioButton
                value="2"
                status={checkedRate === "2" ? "checked" : "unchecked"}
                onPress={() => setCheckedRate("2")}
                color={Colors.material.dark}
              />
              <Text>2</Text>
            </View>
            <View style={styles.rateContainer}>
              <RadioButton
                value="3"
                status={checkedRate === "3" ? "checked" : "unchecked"}
                onPress={() => setCheckedRate("3")}
                color={Colors.material.dark}
              />
              <Text>3</Text>
            </View>
            <View style={styles.rateContainer}>
              <RadioButton
                value="4"
                status={checkedRate === "4" ? "checked" : "unchecked"}
                onPress={() => setCheckedRate("4")}
                color={Colors.material.dark}
              />
              <Text>4</Text>
            </View>
            <View style={styles.rateContainer}>
              <RadioButton
                value="5"
                status={checkedRate === "5" ? "checked" : "unchecked"}
                onPress={() => setCheckedRate("5")}
                color={Colors.material.dark}
              />
              <Text>5</Text>
            </View>
            <Button
              style={styles.rateButton}
              onPress={rateBook}
              mode="contained"
              theme={{ colors: { primary: Colors.material.dark } }}
            >
              Rate
            </Button>
          </View>
        ) : (
          <View style={styles.rateContainer}>
            {[...Array(myRate)].map((x, i) => (
              <AntDesign
                name="star"
                size={25}
                color={Colors.material.dark}
                key={i}
              />
            ))}
          </View>
        )}
      </View>
      <View style={styles.doubleColumnWrapper}>
        <View style={styles.leftColumn}>
          <Text style={styles.fieldLabel}>Author</Text>
          <Text style={styles.fieldValue}>{book.author}</Text>
          <Text style={styles.fieldLabel}>Category</Text>
          <Text style={styles.fieldValue}>{book.category}</Text>
        </View>
        <View style={styles.rightColumn}>
          <Image
            style={styles.image}
            source={{
              uri: book.imgUrl,
            }}
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.fieldLabel}>Description</Text>
        <Text style={styles.fieldValue}>{book.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    textAlign: "center",
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    flexDirection: "row",
  },
  titlePart1: {
    width: "80%",
    alignItems: "center",
    padding: 8,
    justifyContent: "center",
  },
  titlePart2: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  rateWrapper: {
    alignItems: "center",
  },
  allRatesContainer: {
    flexDirection: "row",
  },
  rateButton: {
    marginLeft: 15,
  },
  doubleColumnWrapper: {
    flexDirection: "row",
    marginTop: 15,
  },
  leftColumn: {
    width: "50%",
    alignItems: "flex-start",
    paddingLeft: 10,
  },
  rightColumn: {
    width: "50%",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: undefined,
    aspectRatio: 1,
  },
  fieldLabel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fieldValue: {
    fontSize: 23,
    marginBottom: 30,
  },
  descriptionContainer: {
    paddingLeft: 10,
  },
});

export default BookDetailsScreen;
