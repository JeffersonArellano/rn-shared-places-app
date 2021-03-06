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
import ImagePicker from "../../components/imagePicker/ImagePicker";
import LocationPicker from "../../components/locationPicker/LocationPicker";
import { addPlace } from "../../store/actions/places";

const AddView = (props) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    location: {
      latitude: 0.0,
      longitude: 0.0,
    },
  });

  const dispatch = useDispatch();

  const formDataHandler = useCallback(
    (itemData) => {
      setFormData({ ...formData, ...itemData });
    },
    [formData]
  );

  const savePlaceHandler = useCallback(() => {
    dispatch(addPlace(formData));
    props.navigation.goBack();
  }, [dispatch, formData]);

  useEffect(() => {
    props.navigation.setParams({ submit: savePlaceHandler });
  }, [savePlaceHandler]);

  const imageTakenHandler = useCallback(
    (imagePath) => {
      formDataHandler({ imageUrl: imagePath });
    },
    [formDataHandler]
  );

  const locationHandler = useCallback((location) => {
    formDataHandler({
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
    });
  }, []);

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
          <ImagePicker onImageTaken={imageTakenHandler} />
          <LocationPicker
            navigation={props.navigation}
            onLocationPicked={locationHandler}
          />
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
    width: "95%",
    margin: 10,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    width: "100%",
    height: "100%",
  },
  inputContainer: { marginTop: 5 },
  label: { fontFamily: "open-sans" },
  input: {
    fontFamily: "open-sans",
    borderRadius: 1,
    borderBottomWidth: 0.5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  button: {
    width: "50%",
    height: "50%",
  },
});

export default AddView;
