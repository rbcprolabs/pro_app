import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';

export default class TextNumeric extends Component {

  static propTypes = {
    text: PropTypes.string,
    number: PropTypes.number,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    text: '',
    number: 0
  }



  render() {
    const { props } = this;
    const style = styles(props);

    return (
      <View
        style={[
          style.item,
          props.number == 0 ? style.itemFirst : {}
        ]}
      >
        <Text style={style.text}>
          {props.text}
        </Text>
        <Text style={style.count}>
          {props.number + 1}
        </Text>

        <View style={style.disableLeftBorder} />
        <View style={style.disableRightBorder} />
        <View style={style.disableBottomBorder} />
      </View>
    )
  }
}