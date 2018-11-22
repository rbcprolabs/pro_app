import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Ionicons from "react-native-vector-icons/Ionicons";

import * as configStyles from 'app/config/style';
import styles from './styles';

export default class ButtonIcon extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    type: PropTypes.string,
    circleMode: PropTypes.bool,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    size: configStyles.FONT_SIZE,
    name: 'star',
    type: 'ios'
  }

  render() {
    const { props } = this;
    const iconName = `${props.type == 'ios' ? 'ios-' : 'android-'}${props.name}`
    const style = styles(props);

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={style.btn}
        activeOpacity={.9}
      >
        <Ionicons
          name={iconName}
          size={props.size}
          color={props.color}
          style={style.icon}
        />

      </TouchableOpacity>
    )
  }

  onPress = () => {
    const { props } = this;

    if (props.onPress) {
      props.onPress()
    }
  }
}