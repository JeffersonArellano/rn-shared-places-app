import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const SocialView = (props) => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Text>Main View</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default SocialView;
