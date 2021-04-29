import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import Colors from "../../constants/Colors";
import CustomButton from "../UI/customButtom/CustomButton";
import MapPreview from "../mapPreview/MapPreview";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";

const LocationPicker = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [userLocation, setUserLocation] = useState();

  const pickedLocation = props.navigation.getParam("pickedLocation");
  const { onLocationPicked } = props;

  let mapRegion = {
    latitude: 41.4447528,
    longitude: 2.1818295,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    if (pickedLocation) {
      setUserLocation(pickedLocation);
      onLocationPicked(pickedLocation);
    }
  }, [pickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Location.requestForegroundPermissionsAsync();

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

      props.onLocationPicked({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location!",
        `Please try again later or pick a location on the map,  [Error details] :  ${error.message}`,
        [{ text: "ok" }]
      );
    }

    setIsFetching(false);
  };

  const pickOnMapHandler = () => {
    props.navigation.navigate("Map");
  };

  useEffect(() => {
    if (!userLocation) {
      return;
    }

    mapRegion = {
      latitude: userLocation.lat,
      longitude: userLocation.lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }, [userLocation, mapRegion]);

  console.log("userLocation", userLocation);
  console.log("mapRegion", mapRegion);

  return (
    <View style={styles.locationPicker}>
      <TouchableOpacity onPress={props.onPress} style={styles.mapPreview}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <MapView
            style={styles.mapView}
            onPress={pickOnMapHandler}
            region={mapRegion}
          >
            {userLocation ? (
              <Marker
                coordinate={{
                  latitude: userLocation.lat,
                  longitude: userLocation.lng,
                }}
              />
            ) : null}
          </MapView>
        )}
      </TouchableOpacity>

      {/* <MapPreview
        onPress={pickOnMapHandler}
        style={styles.mapPreview}
        location={userLocation}
      >
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text style={styles.label}>No location chosen yet</Text>
        )}
      </MapPreview> */}

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
              text="Pick on Map"
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
    justifyContent: "center",
    alignContent: "center",
  },
  mapView: { width: "100%", height: "100%" },
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
