import { useIsFocused } from "@react-navigation/native";
import firebase from "firebase";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

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
    setValue,
  } = useForm<IFormInputs>();

  const resetForm = () => {
    setValue("name", "");
    setValue("author", "");
    setValue("category", "");
    setValue("imgUrl", "");
    setValue("description", "");
  };

  const onSubmit = (data: IFormInputs) => {
    firebase.firestore().collection("books").add({
      name: data.name,
      author: data.author,
      category: data.category,
      imgUrl: data.imgUrl,
      description: data.description,
    });
    navigation.navigate("LibraryScreen");
    resetForm();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Title"
            placeholder="Required"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            theme={{ colors: { primary: Colors.material.dark } }}
          />
        )}
        name="name"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.name && <Text>Name is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Author"
            placeholder="Required"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            theme={{ colors: { primary: Colors.material.dark } }}
          />
        )}
        name="author"
        rules={{ required: true }}
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Category"
            placeholder="Not required"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            theme={{ colors: { primary: Colors.material.dark } }}
          />
        )}
        name="category"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Image url"
            placeholder="Not required"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            theme={{ colors: { primary: Colors.material.dark } }}
          />
        )}
        name="imgUrl"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            label="Description"
            placeholder="Not required"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.input}
            theme={{ colors: { primary: Colors.material.dark } }}
          />
        )}
        name="description"
        defaultValue=""
      />
      <Button
        style={styles.button}
        onPress={handleSubmit(onSubmit)}
        mode="contained"
        theme={{ colors: { primary: Colors.material.dark } }}
      >
        Create
      </Button>
    </View>
  );
};

export default NewBookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    paddingTop: 50,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 25,
    width: "50%",
    alignSelf: "center",
  },
});
