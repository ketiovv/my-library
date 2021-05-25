import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { Text, View } from "../../components/Themed";
import firebase from "firebase";
import BookListItem from "../../components/LibraryScreen/BookListItem";
import { Searchbar } from "react-native-paper";
import Book from "../../types/Book";

const LibraryScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const onChangeSearch = (query: string) => setSearchQuery(query);
  const [books, setBooks] = React.useState<Book[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const loadBooks = React.useCallback(() => {
    firebase
      .firestore()
      .collection("books")
      .get()
      .then((snapshot) => {
        const books = snapshot.docs.map((doc) => doc.data());
        setBooks(books as Book[]);
        setIsLoading(false);
      });
  }, []);

  React.useEffect(() => {
    loadBooks();
    console.log(books);
  }, []);

  if (isLoading || books.length === 0) {
    return <Text>Loading..</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        {books.map((book, index) => {
          return (
            <BookListItem key={index} book={book} navigation={navigation} />
          );
        })}
      </View>
    );
  }
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    marginBottom: 10,
  },
});
