import { Text, View } from "../../components/Themed";
import * as React from "react";
import { Button, Dimensions, StyleSheet } from "react-native";
import { Card, Paragraph, Title } from "react-native-paper";
import Rate from "../../types/Rate";

interface MyRatesItemProps {
  rate: Rate;
}

const MyRatesItem = ({ rate }: MyRatesItemProps) => {
  return (
    <View>
      <Card style={styles.container}>
        <Card.Content>
          <Title>
            rate:{rate.rate} {rate.xd}
          </Title>
          <Paragraph>{rate.bookName}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
};

export default MyRatesItem;

const styles = StyleSheet.create({
  container: {},
});
