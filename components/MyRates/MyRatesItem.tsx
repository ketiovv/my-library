import { Text, View } from "../../components/Themed";
import * as React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Rate from "../../types/Rate";
import Colors from "../../constants/Colors";
import { AntDesign } from "@expo/vector-icons";

interface MyRatesItemProps {
  rate: Rate;
}

const MyRatesItem = ({ rate }: MyRatesItemProps) => {
  return (
    <View>
      <Card style={styles.container}>
        <Card.Content>
          <Title>
            {[...Array(rate.rate)].map((x, i) => (
              <AntDesign name="star" size={20} color="black" key={i} />
            ))}
          </Title>
          <Paragraph>{rate.bookName}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default MyRatesItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.material.primary,
    margin: 5,
  },
});
