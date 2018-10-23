import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import Ionicons from "react-native-vector-icons/Ionicons";

import styles from './styles';
import * as configStyles from 'app/config/style';


export default class ButtonIcon extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    iconName: PropTypes.string,
    type: PropTypes.string,
    text: PropTypes.string,
    description: PropTypes.string,
    active: PropTypes.bool,
    iconSize: PropTypes.number,
    convert: PropTypes.bool,


    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    active: false,
    convert: false,
    iconSize: configStyles.FONT_SIZE,
    iconName: 'ios-star',

  }

  render() {
    const { props } = this;
    const style = styles(props);
    let colorIcon = configStyles.COLOR_4;

    if (props.type == 'ellipse') {
      colorIcon = configStyles.COLOR_1
    }

    if (props.active) {
      colorIcon = configStyles.COLOR_3
    }

    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={style.container}
        activeOpacity={.8}
      >
        <Ionicons
          name={props.iconName}
          size={props.iconSize}
          color={colorIcon}
          style={style.icon}
        />
        <View style={style.textContainer}>
          <Text style={style.text}>{props.text}</Text>
          {props.description &&
            <Text style={style.description}>{props.description}</Text>
          }
        </View>
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