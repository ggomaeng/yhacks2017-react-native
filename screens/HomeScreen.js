import React, { Component } from "react";
import {
  View,
  ScrollView,
  RefreshControl,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet
} from "react-native";

const d = {
  Trending: require("../data/trending technologies in the future-analysis-0.json"),
  ML: require("../data/machine learning technology-analysis-0.json"),
  AI: require("../data/artifical intelligence trending-analysis-0.json"),
  BlockChain: require("../data/blockchain technology trending-analysis-0.json"),
  HealthCare: require('../data/trending healthcare technologies-analysis-0.json'),
  Education: require('../data/trending education technologies-analysis-0.json')
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      projects: d[props.navigation.state.key]
    };
  }
  componentWillReceiveProps(props) {
    console.log(props);
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 3000);
  }


  _onPress(data) {
    const {projects} = this.state;
    this.props.navigation.navigate("Detail", { data , projects});
  }

  renderRows() {
    const { projects } = this.state;
    return projects.OTHER.sort((a, b) => b.salience - a.salience).map(
      (item, i) => {
        return <RowItem key={i} data={item} onPress={d => this._onPress(d)} />;
      }
    );
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="default" />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        >
          <Text
            style={{
              padding: 8,
              textAlign: "center",
              color: "gray",
              fontWeight: "600"
            }}
          >
            TODAY, DECEMBER 3RD
          </Text>
          {this.renderRows()}
        </ScrollView>
      </View>
    );
  }
}

class RowItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voted: false,
      upvote: 0,
      comments: 0
    };
  }
  render() {
    const { onPress } = this.props;
    const { id, image, name, description, salience, wiki } = this.props.data;
    const { upvote, voted, comments } = this.state;
    const data = {
      id,
      image,
      name,
      description,
      upvote,
      voted,
      comments,
      wiki
    };
    return (
      <TouchableOpacity
        onPress={() => onPress(data)}
        style={{
          padding: 16,
          backgroundColor: "white",
          borderBottomWidth: 1,
          borderColor: "#ddd"
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
          <Image
            source={{
              uri: image
            }}
            style={{ width: 64, height: 64, backgroundColor: "#eee" }}
          />
          <View style={{ marginLeft: 8, paddingRight: 32 }}>
            <Text style={{ fontSize: 20 }}>{name}</Text>
            <Text
              numberOfLines={2}
              style={{
                fontSize: 18,
                marginTop: 4,
                marginRight: 32,
                color: "gray"
              }}
            >
              Salience Score {(salience * 100).toFixed(3)}%
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                upvote: voted ? upvote - 1 : upvote + 1,
                voted: !voted
              })
            }
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
          <TouchableOpacity style={styles.buttonBox}>
            <Image
              style={[styles.icon, { width: 16, height: 16 }]}
              source={require("../assets/images/icons8-topic_filled.png")}
            />
            <Text style={styles.text}>{comments}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonBox: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
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
