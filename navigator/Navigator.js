import React from "react";
import { useDispatch } from "react-redux";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { AddView, DetailsView, MapView, SocialView } from "../screens/index";
import Colors from "../constants/Colors";

const defaultOption = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {},
  headerBackTitleStyle: { fontFamily: "open-sans-bold" },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const InternalNavigator = createStackNavigator(
  {
    Social: {
      screen: SocialView,
      navigationOptions: {
        headerTitle: "Social",
      },
    },
    Details: {
      screen: DetailsView,
      navigationOptions: {
        headerTitle: "Place Details",
      },
    },
    Add: {
      screen: AddView,
      navigationOptions: {
        headerTitle: "New Place",
      },
    },
    Map: {
      screen: SocialView,
      navigationOptions: {
        headerTitle: "Place Location",
      },
    },
  },
  { defaultNavigationOptions: defaultOption }
);

export default createAppContainer(InternalNavigator);
