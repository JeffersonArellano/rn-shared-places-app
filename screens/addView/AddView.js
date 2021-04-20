import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { HeaderTitle } from "react-navigation-stack";

const AddView = (props) => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Text>AddView</Text>
    </View>
  );
};

// AddView.navigationOptions = (navOptions) => {
//   return {};
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default AddView;
