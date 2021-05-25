import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import * as firebase from "firebase";
import firebaseConfigJson from "./firebaseConfig.json";
import {
  ActivityIndicator,
  Provider as PaperProvider,
} from "react-native-paper";

if (firebase.default.apps.length === 0) {
  firebase.default.initializeApp(firebaseConfigJson);
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return <ActivityIndicator animating={true} color="Black" size="large" />;
  } else {
    return (
      <PaperProvider>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </PaperProvider>
    );
  }
}
