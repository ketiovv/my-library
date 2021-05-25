import firebase from "firebase";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Text, View } from "../../components/Themed";

interface IFormInputs {
  name: string;
  author: string;
  category: string;
  imgUrl: string;
  description: string;
}

const NewBookScreen = ({ navigation }: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>();

  const onSubmit = (data: IFormInputs) => {
    firebase.firestore().collection("books").add({
      name: data.name,
      author: data.author,
      category: data.category,
      imgUrl: data.imgUrl,
      description: data.description,
    });

    navigation.navigate("LibraryScreen");
  };

  return (
    <View style={styles.container}>
      <Text>Name</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="name"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.name && <Text>Name is required.</Text>}

      <Text>Author</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="author"
        defaultValue=""
      />

      <Text>Category</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="category"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text>Image URL</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="imgUrl"
        rules={{ required: true }}
        defaultValue=""
      />

      <Text>Description</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name="description"
        rules={{ required: true }}
        defaultValue=""
      />
      <Button onPress={handleSubmit(onSubmit)}>Create</Button>
    </View>
  );
};

export default NewBookScreen;

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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
