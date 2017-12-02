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

export default class Home extends Component {
  state = {
    refreshing: false,
    projects: [
      {
        name: "iPhoneX",
        description: "a very cool description about iPhoneX",
        image: "https://cdn.macrumors.com/article-new/2017/09/iphonexdesign.jpg"
      },
      {
        name: "BlockChain",
        description: "a very cool description about BlockChain",
        image: "https://blockgeeks-assets2.scdn5.secure.raxcdn.com/wp-content/uploads/2016/09/image-4-276x300.png"
      },
      {
        name: "Bitcoin",
        description: "a very cool description about Bitcoin",
        image: "https://bitcoin.org/img/icons/opengraph.png"
      },
      {
        name: "iPhoneX",
        description: "a very cool description about iPhoneX",
        image: "https://cdn.macrumors.com/article-new/2017/09/iphonexdesign.jpg"
      },
      {
        name: "BlockChain",
        description: "a very cool description about BlockChain",
        image: "https://blockgeeks-assets2.scdn5.secure.raxcdn.com/wp-content/uploads/2016/09/image-4-276x300.png"
      },
      {
        name: "Bitcoin",
        description: "a very cool description about Bitcoin",
        image: "https://bitcoin.org/img/icons/opengraph.png"
      }
    ]
  };

  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 3000);
  }

  _onPress(data) {
    this.props.navigation.navigate("Detail", { data });
  }

  renderRows() {
    const { projects } = this.state;
    return projects.map((item, i) => {
      return <RowItem key={i} data={item} onPress={d => this._onPress(d)} />;
    });
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
    const { id, image, name, description } = this.props.data;
    const { upvote, voted, comments } = this.state;
    const data = {
      id,
      image,
      name,
      description,
      upvote,
      voted,
      comments
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
                marginTop: 2,
                marginRight: 32,
                color: "gray"
              }}
            >
              {description}
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
