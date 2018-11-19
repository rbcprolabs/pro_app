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


export default class Tag extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tag: PropTypes.shape({
      term: PropTypes.string,
      description: PropTypes.string,
    }),
    iconName: PropTypes.string,
    type: PropTypes.string,
    active: PropTypes.bool,
    convert: PropTypes.bool,
    iconSize: PropTypes.number,

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
    const { props, state } = this;
    const { tag } = props;
    const style = styles(props);
    let colorIcon = !props.convert ? configStyles.COLOR_4 : configStyles.COLOR_1;

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
          <Text style={style.text}>{tag.term}</Text>
          {tag.description &&
            <Text style={style.description}>{tag.description}</Text>
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