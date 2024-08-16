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
import { scheduleTimeBasedNotification, registerForPushNotificationsAsync, handleNotificationListeners, configureNotificationChannels } from './components/notifications';

export default function App(){
  useEffect(() => {
    registerForPushNotificationsAsync();
    triggerImmediateNotification();
    configureNotificationChannels();
    const cleanUpListeners = handleNotificationListeners();

    // Clean up listeners on unmount
    return () => {
      cleanUpListeners();
    };
  }, []);

  const triggerImmediateNotification = () => {
    console.log('Scheduling notification...');
    Notifications.scheduleNotificationAsync({
        content: {
          title: "Welcome!",
          body: "This notification was triggered as soon as you opened the app.",
          sound: true,
        },
        trigger: null, // Trigger immediately
      });then(() => console.log('Notification scheduled.'));
    };
    };
  return (
    <LocationProvider>
        <RootSiblingParent>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </RootSiblingParent>
      </LocationProvider>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
