import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

const CustomButtom = (props) => {
  let TouchableComponent = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableComponent = TouchableNativeFeedback;
  }

  return (
    <TouchableComponent onPress={props.onPress} useForeground>
      <View style={{ ...props.style, ...styles.container }}>
        <View style={styles.touchable}>
          <Ionicons name={props.iconName} size={23} color={Colors.accent} />
          <Text style={styles.text}>{props.text}</Text>
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 3,
    margin: 5,
  },
  touchable: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 16,
    marginLeft: 3,
  },
});

export default CustomButtom;
