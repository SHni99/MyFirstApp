import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider as LocationProvider } from "./components/LocationContext";
import { useState, useEffect, useRef } from 'react';
import { registerForPushNotificationsAsync, handleNotificationListeners, configureNotificationChannels } from './components/notifications';

export default function App(){
  useEffect(() => {
    registerForPushNotificationsAsync();
    
    const cleanUpListeners = handleNotificationListeners();

    configureNotificationChannels();

    // Clean up listeners on unmount
    return () => {
      cleanUpListeners();
    };
  }, []);
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
