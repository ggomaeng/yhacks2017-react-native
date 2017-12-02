import React from "react";
import {
  Image,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Constants, GLView, MapView, WebBrowser, LinearGradient } from "expo";
import { MonoText } from "../components/StyledText";
import ActionButton from "react-native-action-button";
import Icon from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import Carousel from "react-native-snap-carousel";
import * as Animatable from "react-native-animatable";
import ParallaxScrollView from "react-native-parallax-scroll-view";
const { width, height } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    data: {
      name: "Google",
      score: 98.5,
      uri:
        "https://pbs.twimg.com/profile_images/839721704163155970/LI_TRk1z_400x400.jpg"
    }
  };
  renderLogo() {
    const { name, score, uri } = this.state.data;
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          width,
          justifyContent: "flex-end",
          alignItems: "flex-start"
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,.5)", "rgba(0,0,0,.7)"]}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width,
            height: height / 3
          }}
        />
        {this.renderTitle()}
      </View>
    );
  }

  renderTop() {
    //show top icon
    const slop = 8;
    return (
      <View style={{ height: height / 3, backgroundColor: "transparent" }}>
        <View style={{ flex: 1 }}>{this.renderLogo()}</View>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          hitSlop={{top: slop, left: slop, bottom: slop, right: slop}}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            margin: 8,
            marginTop: 28
          }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../assets/images/icons8-left_4.png")}
          />
        </TouchableOpacity>
      </View>
    );
  }

  renderTitle() {
    return (
      <View style={{ padding: 16 }}>
        <Animatable.Text
          animation="fadeInUp"
          delay={1500}
          style={{
            fontSize: 32,
            color: "white",
            backgroundColor: "transparent",
            fontWeight: "700"
          }}
        >
          Google
        </Animatable.Text>
        <View style={{ flexDirection: "row" }}>
          <Animatable.View animation="slideInUp" delay={2000}>
            <TouchableOpacity style={styles.buttonBox}>
              <Image
                style={styles.icon}
                source={require("../assets/images/icons8-sort_up_filled.png")}
              />
              <Text style={styles.text}>6</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="slideInUp" delay={2500}>
            <TouchableOpacity
              style={[styles.buttonBox, { backgroundColor: "#CA5D3C" }]}
            >
              <Text style={[styles.text, { color: "white" }]}>
                CHECK IT OUT
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </View>
      </View>
    );
  }

  renderBottom() {
    return (
      <ScrollView
        contentContainerStyle={{ paddingTop: 24 }}
        alwaysBounceVertical={false}
      >
        <RowItem
          image={require("../assets/images/icons8-cheap_2.png")}
          name="Technology Value in 2020"
        />

        <RowItem
          image={require("../assets/images/icons8-low_price.png")}
          name="Cash Flow"
        />

        <RowItem
          image={require("../assets/images/icons8-graph_clique.png")}
          name="Interested Companies"
        />
      </ScrollView>
    );
  }
  render() {
    const { uri } = this.state.data;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ParallaxScrollView
          backgroundColor="transparent"
          renderBackground={() => (
            <Animatable.Image
              animation="fadeIn"
              duration={5000}
              source={{ uri }}
              style={{
                resizeMode: "cover",
                width,
                height: height / 1.7
              }}
            />
          )}
          contentBackgroundColor="white"
          parallaxHeaderHeight={height / 3}
          renderForeground={() => this.renderTop()}
        >
          {this.renderBottom()}
        </ParallaxScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonBox: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 8,
    marginRight: 8
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 4
  },
  text: {
    fontWeight: "600"
  }
});

const RowItem = ({ image, name }) => (
  <View style={{ marginBottom: 24 }}>
    <View
      style={{ marginLeft: 16, flexDirection: "row", alignItems: "center" }}
    >
      <Image style={{ width: 32, height: 32 }} source={image} />
      <Text
        style={{ marginLeft: 4, color: "gray", backgroundColor: "transparent" }}
      >
        {name}
      </Text>
    </View>
    <View
      style={{
        marginTop: 8,
        borderBottomWidth: 3,
        borderColor: "#ddd"
      }}
    />
  </View>
);
