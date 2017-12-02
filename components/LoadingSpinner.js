import React from "react";
import { Dimensions, StyleSheet, Modal, View, Text } from "react-native";
import { DangerZone } from "expo";
const { Lottie } = DangerZone;
const { width, height } = Dimensions.get("window");

export default class App extends React.Component {
  state = {
    animation: null
  };

  componentWillMount() {
    // this._playAnimation();
  }

  render() {
    const { visible } = this.props;

    return (
      <Modal
        onShow={() => {
          this._playAnimation();
        }}
        animationType='fade'
        visible={visible}
        transparent={true}
        style={styles.container}
      >
        {this.state.animation && (
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,.8)'}}>
            <Lottie
              loop
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width,
                height: 200,
                marginTop: height / 6
              }}
              source={this.state.animation}
            />
            <Text
              style={{
                textAlign: "center",
                backgroundColor: "transparent",
                color: "white",
                fontSize: 14,
                fontWeight: "700"
              }}
            >
              Waiting for Nature's Call
            </Text>
          </View>
        )}
      </Modal>
    );
  }

  _playAnimation = () => {
    if (!this.state.animation) {
      this._loadAnimationAsync();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  _loadAnimationAsync = () => {
    this.setState(
      { animation: require("../assets/lottie/flowing.json") },
      this._playAnimation
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
