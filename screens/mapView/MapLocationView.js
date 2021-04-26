import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const MapLocationView = (props) => {
  const mapRegion = {
    latitude: 41.383333,
    longitude: 2.183333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_DEFAULT}
        showsUserLocation
        region={mapRegion}
      />
    </View>
  );
};

// MapView.navigationOptions = (navOptions) => {
//   return {};
// };

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
