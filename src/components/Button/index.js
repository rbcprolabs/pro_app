import React, { PureComponent } from 'react';
import {
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

export default class Button extends PureComponent {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    onPress: PropTypes.func,
    // styling
    tagMode: PropTypes.bool,
    convert: PropTypes.bool,
  }

  static defaultProps = {
    type: '1',
    tagMode: false
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