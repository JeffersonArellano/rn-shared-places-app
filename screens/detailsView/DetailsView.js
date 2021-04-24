import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../components/UI/customButtom/CustomButton";

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import Colors from "../../constants/Colors";
import moment from "moment";
import Hyperlink from "react-native-hyperlink";

const DetailsView = (props) => {
  const placeId = props.navigation.getParam("placeId");

  const place = useSelector((state) =>
    state.places.places.find((place) => place.id === placeId)
  );

  const formatedDate = moment(place.date).format("L");

  return (
    <ScrollView>
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
        <View style={styles.buttonContainer}>
          <CustomButton
            iconName="map"
            text="Maps"
            onPress={() => props.navigation.navigate("Map")}
          />
        </View>
      </View>
    </ScrollView>
  );
};

DetailsView.navigationOptions = (navOptions) => {
  return {
    headerTitle: navOptions.navigation.getParam("placeTitle"),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 5,
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
    width: "98%",
    height: "15%",
    marginTop: 10,
    marginBottom: 30,
  },
});

export default DetailsView;
