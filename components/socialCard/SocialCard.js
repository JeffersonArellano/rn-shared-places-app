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
import moment from "moment";

const SocialCard = (props) => {
  const dateFormat = moment(props.date).format("L");
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
                  <Text>{dateFormat}</Text>
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
    marginBottom: 5,
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
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: 5,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  titleContent: {
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContent: {
    marginLeft: 5,
  },
  title: {
    color: Colors.primary,
    fontFamily: "open-sans-bold",
  },
  textDetails: {
    marginTop: 5,
  },
  details: {
    color: Colors.primary,
    fontFamily: "open-sans",
    fontSize: 14,
  },
});

export default SocialCard;
