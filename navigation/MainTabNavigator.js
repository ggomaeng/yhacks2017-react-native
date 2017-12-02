import React from "react";
import { Image, Platform, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TabNavigator, TabBarBottom } from "react-navigation";

import Colors from "../constants/Colors";

import SubTabNavigator from "./SubTabNavigator";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DetailScreen from "../screens/DetailScreen";

const icons = {
  "1": require("../assets/images/icons8-mailbox_closed_flag_up.png"),
  "2": require("../assets/images/icons8-gender_neutral_user.png")
};

export default TabNavigator(
  {
    Home: {
      screen: SubTabNavigator
    },
    Search: {
      screen: SettingsScreen
    },
    Profile: {
      screen: SettingsScreen
    }
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case "Home":
            iconName = `ios-home${focused ? "" : "-outline"}`;
            break;
          case "Search":
            iconName = `ios-search${focused ? "" : "-outline"}`
            break;
          case "Profile":
            iconName = `ios-person${focused ? "" : "-outline"}`;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? 'black' : Colors.tabIconDefault}
          />
        );
      }
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: "#000",
      showLabel: true,
      style: {
        backgroundColor: "white"
      }
    }
  }
);
