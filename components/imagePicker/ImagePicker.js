import React, { useState } from "react";
import { View, Text, Button, Alert, StyleSheet, Image } from "react-native";
import * as ImgPicker from "expo-image-picker";
import Colors from "../../constants/Colors";
import * as CameraPermmissions from "expo-camera";
import CustomButton from "../UI/customButtom/CustomButton";

const ImagePicker = (props) => {
  const [pickedImage, setPicketImage] = useState();

  const verifyPermissions = async () => {
    const result = await CameraPermmissions.requestPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert("Alert", "No permissions granted", [{ text: "ok" }]);
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await ImgPicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPicketImage(image.uri);
  };

  return (
    <View style={{ ...props.style, ...styles.imagePicker }}>
      <View style={styles.imagePreview}>
        {!pickedImage ? (
          <Text style={styles.label}>No image picked yet.</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          iconName="camera"
          text="Take Image"
          onPress={takeImageHandler}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 30,
  },
  imagePreview: {
    width: "100%",
    height: 300,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e4e5e8",
    borderWidth: 0.5,
    borderRadius: 5,
  },
  label: { fontFamily: "open-sans-bold", color: Colors.primary },
  image: { width: "100%", height: "100%", borderRadius: 5 },
  buttonContainer: {
    width: "50%",
    height: "15%",
  },
});

export default ImagePicker;
