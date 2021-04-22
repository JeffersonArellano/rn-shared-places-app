import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import customHeaderButton from "../../components/UI/customHeaderButton/customHeaderButton";
import CustomButton from "../../components/UI/customButtom/CustomButton";
import Colors from "../../constants/Colors";
import { addPlace } from "../../store/actions/places";

const AddView = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const dispatch = useDispatch();

  const formDataHandler = (itemData) => {
    setFormData({ ...formData, ...itemData });
  };

  const savePlaceHandler = useCallback(() => {
    dispatch(addPlace(formData));
    props.navigation.goBack();
  }, [dispatch, formData]);

  useEffect(() => {
    props.navigation.setParams({ submit: savePlaceHandler });
  }, [savePlaceHandler]);

  return (
    <ScrollView>
      <View style={{ ...props.style, ...styles.container }}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={formData.title}
              onChangeText={(text) => formDataHandler({ title: text })}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              value={formData.description}
              onChangeText={(text) => formDataHandler({ description: text })}
            ></TextInput>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              iconName="camera"
              text="Camera"
              onPress={() => console.log("Opening camera... ")}
            />
            <CustomButton
              iconName="map"
              text="Maps"
              onPress={() => console.log("Opening maps... ")}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

AddView.navigationOptions = (navData) => {
  const submitHandler = navData.navigation.getParam("submit");

  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={customHeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === "android" ? "save-outline" : "ios-save-outline"
          }
          onPress={submitHandler}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    width: "95%",
    margin: 10,
  },
  form: {
    width: "100%",
  },
  inputContainer: { marginTop: 10 },
  label: { fontFamily: "open-sans" },

  input: {
    fontFamily: "open-sans",
    borderRadius: 1,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    padding: 10,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "100%",
  },
  button: {
    fontFamily: "open-sans-bold",
    margin: 5,
  },
});

export default AddView;
