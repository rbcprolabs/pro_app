import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Button extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    onPress: PropTypes.func,
    // styling
    isWhite: PropTypes.bool,
    isGreen: PropTypes.bool,
    isBlue: PropTypes.bool,
  }

  static defaultProps = {
    type: '1',

  }

  render() {
    const { props } = this;
    const style = styles(props);

    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={style.btn}
        activeOpacity={.6}
      >

        <Text style={style.text}>
          {props.text}
        </Text>

      </TouchableOpacity>
    )
  }

}