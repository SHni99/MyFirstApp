import React, { useState, useContext } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheetProvider, useActionSheet } from '@expo/react-native-action-sheet';
import { useNavigation } from '@react-navigation/native';

export default function ImageUploadButton() {
  const [image, setImage] = useState(null);
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();

  const requestPermissions = async () => {
    const { status: cameraPerm } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryPerm } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (cameraPerm !== 'granted' || libraryPerm !== 'granted') {
      alert('Sorry, we need camera and gallery permissions to make this work!');
      return false;
    }
    return true;
  };

  const onOpenActionSheet = () => {
    const options = ['Take Photo', 'Upload Image', 'Cancel'];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          handleTakePhoto();
        } else if (buttonIndex === 1) {
          handlePickImage();
        }
      },
    );
  };

  const handleTakePhoto = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
      navigation.navigate('NextScreen', { image: result.uri });
    }
  };

  const handlePickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImage(result.uri);
      navigation.navigate('NextScreen', { image: result.uri });
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={onOpenActionSheet}>
        <MaterialCommunityIcons name="plus-box" size={28} color="black" />
      </TouchableOpacity>
      {/* {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
