import React from "react";
import { useDispatch } from "react-redux";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from "react-navigation-drawer";
import { Main } from "../screens/index";
import Colors from "../constant/Colors";

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
    Main: {
      screen: Main,
      navigationOptions: {
        headerTitle: "Social",
      },
    },
  },
  { defaultNavigationOptions: defaultOption }
);

export default createAppContainer(InternalNavigator);
