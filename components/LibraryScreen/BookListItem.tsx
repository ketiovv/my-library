import { Text, View } from "../../components/Themed";
import * as React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Book from "../../types/Book";

interface BookListItemProps {
  book: Book;
  navigation: any;
}

const BookListItem = ({ book, navigation }: BookListItemProps) => {
  return (
    <View>
      <Card
        style={styles.container}
        onPress={() => navigation.navigate("BookDetailsScreen", { book: book })}
      >
        <Card.Content>
          <Title>{book.name}</Title>
          <Paragraph>{book.author}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
export default BookListItem;

const window = Dimensions.get("window");
const cardHeight = window.width / 3;

const styles = StyleSheet.create({
  container: {
    width: window.width / 2 - 15,
    alignItems: "center",
    height: cardHeight,
    margin: 5,
  },
});
