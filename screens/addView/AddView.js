import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const AddView = (props) => {
  return <View style={{ ...props.style, ...styles.container }}>AddView</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFF2E",
    width: "80%",
  },
});

export default AddView;
