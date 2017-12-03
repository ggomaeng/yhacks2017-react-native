import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TabNavigator, TabBarBottom, TabBarTop } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import DetailScreen from "../screens/DetailScreen";

export default TabNavigator(
  {
    Trending: {
      screen: HomeScreen
    },
    ML: {
      screen: HomeScreen
    },
    AI: {
      screen: HomeScreen
    },
    BlockChain: {
      screen: HomeScreen
    },
    HealthCare: {
      screen: HomeScreen
    },
    Education: {
      screen: HomeScreen
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      header: null
    }),
    tabBarComponent: TabBarTop,
    tabBarPosition: "top",
    animationEnabled: true,
    swipeEnabled: true,
    tabBarOptions: {
      scrollEnabled: true,
      labelStyle: {
        fontSize: 14,
      },
      activeTintColor: "black",
      inactiveTintColor: "gray",
      showLabel: true,
      tabStyle: {
        borderWidth: 0,
      },
      style: {
        paddingTop: 20,
        backgroundColor: "white"
      }
    }
  }
);
