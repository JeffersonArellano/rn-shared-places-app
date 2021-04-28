import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { PROVIDER_DEFAULT, Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import customHeaderButton from "../../components/UI/customHeaderButton/customHeaderButton";

const MapLocationView = (props) => {
  const location = props.navigation.getParam("initialLocation");
  const readonly = props.navigation.getParam("readonly");
  const [selectedLocation, setSelectedLocation] = useState(location);

  const mapRegion = {
    latitude: location ? location.lat : 41.383333,
    longitude: location ? location.lng : 2.183333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event) => {
    if (readonly) {
      return;
    }

    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markerCoordinates;

  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("Add", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ submit: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        showsUserLocation
        region={mapRegion}
        onPress={selectLocationHandler}
      >
        {markerCoordinates && (
          <Marker title="Picked Location" coordinate={markerCoordinates} />
        )}
      </MapView>
    </View>
  );
};

MapLocationView.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam("submit");
  const readonly = navData.navigation.getParam("readonly");

  if (readonly) {
    return {};
  }

  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "save-outline" : "ios-save-outline"
          }
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  mapContainer: {
    width: "100%",
    height: "100%",
  },
});

export default MapLocationView;
