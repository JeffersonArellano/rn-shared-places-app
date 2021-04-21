import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Card from "../UI/card/Card";
import Colors from "../../constants/Colors";

const SocialCard = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <Card style={{ ...props.style, ...styles.mainContainer }}>
      <View style={styles.touchable}>
        <TouchableComponent onPress={props.onSelect} useForeground>
          <View style={styles.card}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: props.imageUrl,
                }}
              />
            </View>
            <View style={styles.content}>
              <View style={styles.titleContent}>
                <Text style={styles.title}>{props.title}</Text>
              </View>
              <View style={styles.detailsContent}>
                <View style={styles.textDetails}>
                  <Text style={styles.details}>Date</Text>
                  <Text>{props.date}</Text>
                </View>
                <View style={styles.textDetails}>
                  <Text style={styles.details}>Description</Text>
                  <Text>{props.description}</Text>
                </View>
                <View style={styles.textDetails}>
                  <Text style={styles.details}>Owner</Text>
                  <Text>{props.owner}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableComponent>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: "95%",
    height: 200,
    marginTop: 5,
    marginLeft: 10,
  },
  touchable: {
    borderRadius: 5,
    overflow: "hidden",
  },
  card: {
    flexDirection: "row",
    padding: 5,
  },
  imageContainer: {
    width: "50%",
    height: "100%",
    overflow: "hidden",
    borderRadius: 5,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  titleContent: {
    margin: 5,
  },
  detailsContent: {
    margin: 5,
  },
  title: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  textDetails: {
    margin: 5,
  },
  details: {
    color: Colors.primary,
    fontFamily: "open-sans",
    fontSize: 12,
  },
});

export default SocialCard;
