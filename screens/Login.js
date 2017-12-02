import React, { Component } from "react";
import {
  View,
  Dimensions,
  Text,
  Modal,
  Image,
  NativeModules,
  Platform,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Video } from "expo";
import * as Animatable from "react-native-animatable";
import Colors from "../constants/Colors";

import { LoadingSpinner } from "../components";
import { NavigationActions } from "react-navigation";

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: "Main" })]
});

const { width, height } = Dimensions.get("window");
export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    success: false,
    loading: false
  };

  render() {
    const { loading } = this.state;
    if (Platform.OS === "android") {
      authFunction = async () => {
        try {
          let result = await NativeModules.ExponentFingerprint.authenticateAsync();
          if (result.success) {
            this.setState({ success: true });
            // alert('Authenticated!');
          } else {
            this.setState({ success: false });
            // alert('Failed to authenticate');
          }
        } finally {
        }
      };
    } else if (Platform.OS === "ios") {
      authFunction = async () => {
        let result = await NativeModules.ExponentFingerprint.authenticateAsync(
          "Please verify your identity"
        );
        if (result.success) {
          this.setState({ success: true });
          // this.props.navigation.dispatch(resetAction);
          this.props.navigation.navigate('Main');
          // alert('Success!');
        } else {
          this.setState({ success: false });
          // alert('Cancel!');
        }
      };
    }
    return (
      <View style={{ flex: 1, backgroundColor: "#000" }}>
        <StatusBar barStyle="light-content" />
        <Video
          source={require("../assets/videos/busycity.mp4")}
          rate={1.0}
          volume={0}
          muted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={styles.video}
        />
        <View style={[styles.video, { backgroundColor: "rgba(0,0,0,.6)" }]} />
        <View
          style={{ flex: 3, justifyContent: "center", alignItems: "center" }}
        >
          <Animatable.Image
            animation="fadeInUp"
            delay={1200}
            duration={3000}
            source={require("../assets/images/icons8-line_chart.png")}
          />
          <Animatable.Text
            animation="fadeInUp"
            delay={2000}
            duration={2000}
            style={{
              backgroundColor: "transparent",
              fontWeight: "700",
              color: Colors.white,
              marginTop: 16,
              fontSize: 24
            }}
          >
            Informa App
          </Animatable.Text>
          <Animatable.Text
            animation="fadeInUp"
            delay={2500}
            duration={2000}
            style={{
              textAlign: "center",
              backgroundColor: "transparent",
              fontWeight: "400",
              color: Colors.white,
              marginTop: 8,
              fontSize: 14
            }}
          >
            Explore Trending Technologies
          </Animatable.Text>
        </View>
        <LoadingSpinner visible={loading} />
        <View
          style={{ flex: 1, justifyContent: "flex-end", alignItems: "center" }}
        >
          <TouchableOpacity onPress={() => authFunction()}>
            <Animatable.View
              animation="fadeIn"
              delay={3700}
              style={{ alignItems: "center" }}
            >
              <Image
                style={{
                  resizeMode: "contain",
                  height: 48
                }}
                source={require("../assets/images/icons8-fingerprint.png")}
              />
              <Text
                style={{
                  backgroundColor: "transparent",
                  marginBottom: 16,
                  color: "#596D79",
                  fontWeight: "600"
                }}
              >
                Tap here for secure login
              </Text>
            </Animatable.View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  video: {
    position: "absolute",
    left: 0,
    top: 0,
    width,
    height
  }
});
