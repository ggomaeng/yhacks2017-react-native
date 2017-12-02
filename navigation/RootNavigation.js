import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import DetailScreen from "../screens/DetailScreen";
import { Login } from "../screens";

import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

const RootStackNavigator = StackNavigator(
  {
    Login: {
      screen: Login
    },
    Main: {
      screen: MainTabNavigator
    },
    Detail: {
      screen: DetailScreen
    }
  },
  {
    initialRouteName: "Login",
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal"
      }
    })
  }
);

export default class RootNavigator extends React.Component {
  render() {
    return <RootStackNavigator />;
  }
}
