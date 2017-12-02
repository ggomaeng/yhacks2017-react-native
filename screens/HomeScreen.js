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
    refreshing: false
  };


  _onRefresh() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 3000);
  }

  _onPress(id) {
    this.props.navigation.navigate("Detail");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <StatusBar barStyle='default'/>
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
            TODAY, DECEMBER 2ND
          </Text>
          <RowItem onPress={id => this._onPress(id)} />
          <RowItem onPress={id => this._onPress(id)} />
          <RowItem onPress={id => this._onPress(id)} />
          <RowItem onPress={id => this._onPress(id)} />
        </ScrollView>
      </View>
    );
  }
}

const RowItem = ({
  id,
  image,
  name,
  description,
  upvote,
  comments,
  onPress
}) => (
  <TouchableOpacity
    onPress={() => onPress(id)}
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
          uri: "https://cdn.macrumors.com/article-new/2017/09/iphonexdesign.jpg"
        }}
        style={{ width: 64, height: 64, backgroundColor: "gray" }}
      />
      <View style={{ marginLeft: 8, paddingRight: 32 }}>
        <Text style={{ fontSize: 20 }}>Awesome Title</Text>
        <Text
          numberOfLines={2}
          style={{ fontSize: 18, marginTop: 2, marginRight: 32, color: "gray" }}
        >
          Some cool description saying how cooool sungwoo is
        </Text>
      </View>
    </View>
    <View style={{ flexDirection: "row" }}>
      <TouchableOpacity style={styles.buttonBox}>
        <Image
          style={styles.icon}
          source={require("../assets/images/icons8-sort_up_filled.png")}
        />
        <Text style={styles.text}>6</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonBox}>
        <Image
          style={[styles.icon, { width: 16, height: 16 }]}
          source={require("../assets/images/icons8-topic_filled.png")}
        />
        <Text style={styles.text}>6</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonBox: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
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
    fontWeight: '600'
  }
});
