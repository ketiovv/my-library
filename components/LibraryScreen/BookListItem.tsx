import { Text, View } from "../../components/Themed";
import * as React from "react";
import { Button, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Book from "../../types/Book";

interface BookListItemProps {
  book: Book;
  navigation: any;
}

const BookListItem = ({ book, navigation }: BookListItemProps) => {
  return (
    <View style={styles.container}>
      <Card onPress={() => navigation.navigate("BookDetailsScreen")}>
        <Card.Content>
          <Title>{book.name}</Title>
          <Paragraph>{book.author}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};
export default BookListItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
});
