import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./navigation/AppNavigator";
import { RootSiblingParent } from "react-native-root-siblings";
import { Provider as LocationProvider } from "./components/LocationContext";
import { triggerImmediateNotification, registerForPushNotificationsAsync, handleNotificationListeners, configureNotificationChannels } from './components/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  useEffect(() => {
      registerForPushNotificationsAsync();
      triggerImmediateNotification();
      configureNotificationChannels();
      const cleanUpListeners = handleNotificationListeners();

      // Clean up listeners on unmount
      return () => {
        cleanUpListeners();
      };
    },
   []);

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
