import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider as LocationProvider } from "./components/LocationContext";
import { useState, useEffect, useRef } from 'react';

export default function App(){

  return (
    <LocationProvider>
        <RootSiblingParent>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </RootSiblingParent>
      </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
