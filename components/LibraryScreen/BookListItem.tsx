import { Text, View } from "../../components/Themed";
import * as React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Book from "../../types/Book";
import Colors from "../../constants/Colors";

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
          <Title style={styles.text}>{book.name}</Title>
          <Paragraph style={styles.text}>{book.author}</Paragraph>
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
    alignItems: "flex-start",
    height: cardHeight,
    margin: 5,
    backgroundColor: Colors.material.primary,
  },
  text: {
    color: Colors.material.white,
  },
});
