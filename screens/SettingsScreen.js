import React from 'react';
import {View, Text, Image} from 'react-native'

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../assets/images/icons8-kiss.png')}/>
      <Text style={{color: 'gray', fontWeight: '700', marginTop: 4}}>Sorry. Nothing to see here!</Text>

    </View>;
  }
}
