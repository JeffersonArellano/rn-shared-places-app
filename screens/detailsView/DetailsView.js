import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/UI/customButtom/CustomButton";
import { View, Text, StyleSheet, Image, ScrollView, Alert } from "react-native";
import Colors from "../../constants/Colors";
import moment from "moment";
import Hyperlink from "react-native-hyperlink";
import MapView, { Marker } from "react-native-maps";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import customHeaderButton from "../../components/UI/customHeaderButton/customHeaderButton";
import { deletePlaces } from "../../store/actions/places";

const DetailsView = (props) => {
  const placeId = props.navigation.getParam("placeId");
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const place = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const location = { lat: place.latitude, lng: place.longitude };
  const formatedDate = moment(place.date).format("L");

  const showMapHandler = () => {
    props.navigation.navigate("Map", {
      readonly: true,
      initialLocation: location,
    });
  };

  const mapRegion = {
    latitude: location.lat,
    longitude: location.lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const markerCoordinates = {
    latitude: location.lat,
    longitude: location.lng,
  };

  const deletePlace = useCallback(async () => {
    try {
      await dispatch(deletePlaces({ id: place.id }));
      props.navigation.navigate("Social");
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ deletePlace: deletePlace });
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    Alert.alert("Alert", `Something went wrong, [details]: ${error}`, [
      { text: "Ok" },
    ]);
  }, [error]);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={{ ...props.style, ...styles.container }}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: place.imageUrl }} />
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.placeHolder}>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.text}>{place.description}</Text>
          </View>
          <View style={styles.placeHolder}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.text}>{formatedDate}</Text>
          </View>
          <View style={styles.placeHolder}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.text}>{place.address}</Text>
          </View>
          <View style={styles.placeHolder}>
            <Text style={styles.label}>Owner</Text>
            <Hyperlink
              linkDefault={true}
              onPress={(url, text) => alert(url + ", " + text)}
              linkText={(url) =>
                url === place.ownerLink ? place.ownerId : url
              }
            >
              <Text style={styles.ownerStyle}>{place.ownerLink}</Text>
            </Hyperlink>
          </View>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapView}
            onPress={showMapHandler}
            region={mapRegion}
          >
            <Marker coordinate={markerCoordinates} />
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          <CustomButton iconName="map" text="Maps" onPress={showMapHandler} />
        </View>
      </View>
    </ScrollView>
  );
};

DetailsView.navigationOptions = (navOptions) => {
  const deletePlace = navOptions.navigation.getParam("deletePlace");

  return {
    headerTitle: navOptions.navigation.getParam("placeTitle"),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item
          title="Delete"
          iconName={
            Platform.OS === "android" ? "trash-outline" : "ios-trash-outline"
          }
          onPress={deletePlace}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    padding: 5,
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: "center",
    width: "100%",
    height: 300,
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 5,
  },
  detailsContainer: {
    marginTop: 5,
  },
  placeHolder: { marginTop: 10 },
  label: {
    fontSize: 15,
    color: Colors.primary,
    fontFamily: "open-sans",
    width: "100%",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 16,
    width: "100%",
  },
  ownerStyle: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#2e8bc0",
  },
  buttonContainer: {
    flex: 1,
    width: "95%",
    height: "70%",
  },
  mapContainer: {
    flex: 1,
    height: "100%",
    height: 200,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  mapView: {
    height: "100%",
    width: "100%",
  },
});

export default DetailsView;
