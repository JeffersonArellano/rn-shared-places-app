import React, { useState } from "react";
import { View, Text, ActivityIndicator, Alert, StyleSheet } from "react-native";
import * as Location from "expo-location";
import Colors from "../../constants/Colors";
import CustomButton from "../UI/customButtom/CustomButton";
import MapPreview from "../mapPreview/MapPreview";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [userLocation, setUserLocation] = useState();

  const verifyPermissions = async () => {
    const result = await Location.getForegroundPermissionsAsync();

    if (result.status !== "granted") {
      Alert.alert("Alert", "No permissions granted", [{ text: "ok" }]);
      return false;
    }
    return true;
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });

      setUserLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        `Please  try again later or pick a location on the map,  [Error details] :  ${error.message}`,
        [{ text: "ok" }]
      );
    }

    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
        location={userLocation}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text style={styles.label}>No location chosen yet</Text>
        )}
      </MapPreview>
      <View style={styles.actions}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <CustomButton
              iconName="location-outline"
              text="Get User Location"
              onPress={getLocationHandler}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <CustomButton
              iconName="map"
              text="Maps"
              onPress={pickOnMapHandler}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginTop: 15,
  },
  mapPreview: {
    width: "100%",
    height: 150,
    borderWidth: 0.5,
    borderRadius: 5,
    backgroundColor: "#e4e5e8",
    marginBottom: 10,
  },
  label: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
    width: "70%",
    height: 50,
    marginLeft: 2,
  },
  button: {
    width: "100%",
    height: "100%",
  },
});

export default LocationPicker;
