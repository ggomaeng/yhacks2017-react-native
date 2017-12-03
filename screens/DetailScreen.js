import React, { Component } from "react";
import {
  Image,
  Platform,
  Dimensions,
  ScrollView,
  StyleSheet,
  Linking,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import { Constants, GLView, MapView, WebBrowser, LinearGradient } from "expo";
import { MonoText } from "../components/StyledText";
import ActionButton from "react-native-action-button";
import Icon from "@expo/vector-icons/Ionicons";
import Colors from "../constants/Colors";
import Carousel from "react-native-snap-carousel";
import * as Animatable from "react-native-animatable";
import ParallaxScrollView from "react-native-parallax-scroll-view";
import env from "../env";
const { width, height } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.data,
      news: [],
      tweets: [],
      loading: true,
      loadingTwitter: true
    };
  }

  componentDidMount() {
    const { name } = this.state.data;
    console.log(name);
    fetch(
      `https://newsapi.org/v2/everything?q=${name}&apiKey=${env.NEWS}&body=en`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        // console.log(responseJson);
        this.setState({ loading: false, news: responseJson.articles });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderLogo() {
    const { name, score, image } = this.state.data;
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
          hitSlop={{ top: slop, left: slop, bottom: slop, right: slop }}
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
    const {
      name,
      voted,
      upvote,
      vote,
      wiki
    } = this.props.navigation.state.params.data;
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
          {name}
        </Animatable.Text>
        <View style={{ flexDirection: "row" }}>
          <Animatable.View animation="slideInUp" delay={2000}>
            <TouchableOpacity
              style={[
                styles.buttonBox,
                { backgroundColor: voted ? "#eee" : "white" }
              ]}
            >
              <Image
                style={styles.icon}
                source={require("../assets/images/icons8-sort_up_filled.png")}
              />
              <Text style={styles.text}>{upvote}</Text>
            </TouchableOpacity>
          </Animatable.View>
          <Animatable.View animation="slideInUp" delay={2500}>
            {wiki ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.canOpenURL(wiki)
                    .then(supported => {
                      if (!supported) {
                        console.log("Can't handle url: " + wiki);
                      } else {
                        return Linking.openURL(wiki);
                      }
                    })
                    .catch(err => console.error("An error occurred", err));
                }}
                style={[styles.buttonBox, { backgroundColor: "#CA5D3C" }]}
              >
                <Text style={[styles.text, { color: "white" }]}>
                  CHECK IT OUT
                </Text>
              </TouchableOpacity>
            ) : null}
          </Animatable.View>
        </View>
      </View>
    );
  }

  renderNewsItem() {
    const { loading, news } = this.state;
    if (loading) {
      return <ActivityIndicator style={{ marginTop: 16 }} color="black" />;
    }
    return news.splice(10).map((n, i) => {
      return <NewsItem key={i} data={n} />;
    });
  }

  renderCompanies() {
    const { projects } = this.props.navigation.state.params;
    return projects && projects.ORGANIZATION && projects.ORGANIZATION.map((item, i) => {
      if (this.getRandomIntInclusive(0, 1) == 0) {
        return (
          <View key={i} style={{ marginVertical: 4 }}>
            <Text>{item.name}</Text>
          </View>
        );
      }
    });
  }
  renderLocations() {
    const { projects } = this.props.navigation.state.params;
    return projects && projects.LOCATION && projects.LOCATION.map((item, i) => {
      if (this.getRandomIntInclusive(0, 1) == 0) {
        return (
          <View key={i} style={{ marginVertical: 4 }}>
            <Text>{item.name}</Text>
          </View>
        );
      }
    });
  }
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
  }
  renderBottom() {
    return (
      <ScrollView
        contentContainerStyle={{ paddingTop: 24 }}
        alwaysBounceVertical={false}
      >
        {/* <RowItem
          image={require("../assets/images/icons8-cheap_2.png")}
          name="Technology Value in 2020"
        /> */}

        <RowItem
          image={require("../assets/images/icons8-marker.png")}
          name="Locations"
        />

        <View style={{ marginVertical: 8, paddingLeft: 16 }}>
          {this.renderLocations()}
        </View>
        <RowItem
          image={require("../assets/images/icons8-graph_clique.png")}
          name="Interested Companies"
        />

        <View style={{ marginVertical: 8, paddingLeft: 16 }}>
          {this.renderCompanies()}
        </View>

        <RowItem
          image={require("../assets/images/icons8-google_news.png")}
          name="Related News"
        />
        {this.renderNewsItem()}
      </ScrollView>
    );
  }
  render() {
    const { image, wiki } = this.state.data;
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ParallaxScrollView
          backgroundColor="transparent"
          renderBackground={() => (
            <Animatable.Image
              animation="fadeIn"
              duration={5000}
              source={{ uri: image }}
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

class RowItem extends Component {
  render() {
    const { name, image } = this.props;
    return (
      <View>
        <View
          style={{ marginLeft: 16, flexDirection: "row", alignItems: "center" }}
        >
          <Image style={{ width: 32, height: 32 }} source={image} />
          <Text
            style={{
              marginLeft: 4,
              color: "gray",
              backgroundColor: "transparent"
            }}
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
  }
}

class NewsItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      source,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      onPress
    } = this.props.data;

    console.log(this.props.data);

    const img =
      urlToImage && urlToImage !== null && urlToImage !== undefined ? (
        <Image
          source={{
            uri: urlToImage
          }}
          style={{
            width: 64,
            height: 64,
            backgroundColor: "#eee",
            marginTop: 4
          }}
        />
      ) : (
        <View
          style={{
            width: 64,
            height: 64,
            backgroundColor: "#eee",
            marginTop: 4
          }}
        />
      );

    return (
      <TouchableOpacity
        onPress={() => {
          Linking.canOpenURL(url)
            .then(supported => {
              if (!supported) {
                console.log("Can't handle url: " + url);
              } else {
                return Linking.openURL(url);
              }
            })
            .catch(err => console.error("An error occurred", err));
        }}
        style={{
          padding: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderColor: "#ddd"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          {img}
          <View style={{ marginLeft: 8, paddingRight: 32 }}>
            <Text style={{ fontSize: 20, paddingRight: 32 }}>{title}</Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                marginTop: 4,
                marginRight: 32,
                color: "gray"
              }}
            >
              {description}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 14,
                marginTop: 2,
                marginRight: 32,
                color: "blue"
              }}
            >
              {source.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                fontSize: 12,
                marginTop: 4,
                marginRight: 32,
                color: "gray"
              }}
            >
              {publishedAt}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
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
