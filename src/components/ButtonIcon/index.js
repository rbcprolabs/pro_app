import React, { Component } from 'react';
import {
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

// import NumberBadge from 'app/components/NumberBadge';
// import Icon from 'app/components/Icon';
import styles from './styles';

export default class ButtonIcon extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    name: PropTypes.string,

    newCount: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  render() {
    const { props } = this;
    const style = styles(props);


    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={style.btn}
        activeOpacity={.8}
      >

        {/* <Icon
          name={props.name}
          style={props.style}
        /> */}

        {/* {props.newCount &&
          <NumberBadge
            number={props.newCount}
            style={style.badge}
          />
        } */}

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