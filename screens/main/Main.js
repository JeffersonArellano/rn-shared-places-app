import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const Main = (props) => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Text>Main View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF2E",
    width: "80%",
  },
});

export default Main;
