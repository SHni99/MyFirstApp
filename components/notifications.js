import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    
    const notificationListener = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification Received:', notification);
    });

    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Response:', response);
    });

    // Clean up listeners on unmount
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Platform.OS === 'android') {
      await Notifications.requestPermissionsAsync();
    } else if (Platform.OS === 'ios') {
      await Notifications.requestPermissionsAsync({
        alert: true,
        badge: true,
        sound: true,
      });
    }
    
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);
    // You can send this token to your server if needed fire base
  }

  async function configureChannels() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  }

  useEffect(() => {
    configureChannels();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Notification App!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
