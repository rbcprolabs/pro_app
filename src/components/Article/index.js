import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

// import NumberBadge from 'app/components/NumberBadge';
// import Icon from 'app/components/Icon';
import styles from './styles';
import * as configStyles from 'app/config/style';

export default class Category extends Component {

  static propTypes = {
    title: PropTypes.string,
    onPress: PropTypes.func,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    const { props, state } = this;
    const style = styles(props);

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={style.wrap}
        activeOpacity={.9}
      >
        <View
          style={[
            style.container,
          ]}>



        </View>
      </TouchableOpacity>
    )
  }

  onPress = () => {
    const { props, state } = this;



    if (props.onPress) {
      props.onPress()
    }
  }
}