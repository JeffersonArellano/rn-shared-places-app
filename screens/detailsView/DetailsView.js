import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

const DetailsView = (props) => {
  return (
    <View style={{ ...props.style, ...styles.container }}>
      <Text>DetailsView</Text>
    </View>
  );
};

// DetailsView.navigationOptions = (navOptions) => {
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

export default DetailsView;
