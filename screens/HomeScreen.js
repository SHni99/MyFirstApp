//import { getAuth } from "firebase/auth";
import { onValue, ref } from "firebase/database";
//import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState, useRef } from "react";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Button
} from "react-native";
import { db, db2 } from "../firebase/firebase";

const MedicationItem = ({ iconColor, medicationName, dosage }) => {
  // Determine icon based on the color/type
  const getIconName = (color) => {
    switch(color) {
      case 'red':
        return 'triangle';
      case 'yellow':
        return 'ellipse'; 
      case 'green':
        return 'star'; 
      default:
        return 'alert-circle'; 
    }
  };

  return (
    <View style={styles.medicationItem}>
      <Ionicons name={getIconName(iconColor)} size={30} color={iconColor} />
      <View style={styles.medInfo}>
        <Text style={styles.medName}>{medicationName}</Text>
        <Text>{dosage}</Text>
      </View>
      <Ionicons name="checkmark-circle" size={30} color="green" />
    </View>
  );
};



const HomeScreen = ({ navigation }) => {

  const navigateToSettings = () => {
    navigation.navigate('settings');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="medical" size={28} color="red" />
        <Text style={styles.title}>Medimate</Text>
        <TouchableOpacity onPress={navigateToSettings}>
          <Ionicons name="settings" size={28} color="black" />
        </TouchableOpacity> 
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Morning</Text>
          <MedicationItem
            iconColor="red"
            medicationName="Furosemide"
            dosage="1 Tablet"
          />
          <MedicationItem
            iconColor="yellow"
            medicationName="Acebutolol"
            dosage="2 Tablets"
          />
          <MedicationItem
            iconColor="green"
            medicationName="Captopril"
            dosage="1 Tablet"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>After lunch</Text>
          <MedicationItem
            iconColor="green"
            medicationName="Captopril"
            dosage="1 Tablet"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>After Dinner</Text>
          <MedicationItem
            iconColor="yellow"
            medicationName="Acebutolol"
            dosage="2 Tablets"
          />
          <MedicationItem
            iconColor="red"
            medicationName="Furosemide"
            dosage="1 Tablet"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#000'
  },
  scrollView: {
    marginHorizontal: 10,
  },
  section: {
    backgroundColor: '#fff',
    marginVertical: 8,
    padding: 10,
    borderRadius: 10
  },
  sectionTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10
  },
  medicationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10
  },
  medInfo: {
    flex: 1,
    paddingHorizontal: 10
  },
  medName: {
    fontSize: 18,
    color: '#000'
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc'
  }
});

export default HomeScreen;