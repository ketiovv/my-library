import * as React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import firebase from "firebase";
import BookListItem from "../../components/LibraryScreen/BookListItem";
import { ActivityIndicator, Searchbar } from "react-native-paper";
import Book from "../../types/Book";
import { ScrollView } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import Colors from "../../constants/Colors";

const LibraryScreen = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
    loadBooks(query);
  };

  const [books, setBooks] = React.useState<Book[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const loadBooks = (sq: string) => {
    firebase
      .firestore()
      .collection("books")
      .orderBy("name", "asc")
      .get()
      .then((snapshot) => {
        const books = snapshot.docs.map((doc) => doc.data() as Book);
        const ids = snapshot.docs.map((doc) => doc.id);

        for (var i = 0; i < books.length; i++) {
          books[i].uid = ids[i];
        }

        if (sq !== "") {
          setBooks(
            books.filter((book) =>
              book.name.toLowerCase().includes(sq.toLowerCase())
            )
          );
        } else {
          setBooks(books);
        }

        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      loadBooks(searchQuery);
    }
    if (!isFocused) {
      setBooks([]);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchBar}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      {isLoading ? (
        <ActivityIndicator
          animating={true}
          color={Colors.material.dark}
          size="large"
        />
      ) : (
        <ScrollView contentContainerStyle={styles.booksContainer}>
          {books.map((book, index) => {
            return (
              <BookListItem key={index} book={book} navigation={navigation} />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  searchBar: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  booksContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
