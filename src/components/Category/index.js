import React, { Component } from 'react';
import {
  Animated,
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
      bgColor: new Animated.Value(0),
      bgColors: {
        start: configStyles.COLOR_3,
        finish: configStyles.COLOR_5
      },
      textColor: new Animated.Value(0),
      textColors: {
        start: configStyles.COLOR_1,
        finish: configStyles.COLOR_2
      }
    }
  }

  render() {
    const { props, state } = this;
    const style = styles(props);
    const bgColor = state.bgColor.interpolate({
      inputRange: [0, 1],
      outputRange: [state.bgColors.start, state.bgColors.finish]
    });
    const textColor = state.textColor.interpolate({
      inputRange: [0, 1],
      outputRange: [state.textColors.start, state.textColors.finish]
    });

    return (
      <TouchableOpacity
        onPress={this.onPress}

        activeOpacity={.9}
      >
        <Animated.View
          style={[
            style.container,
            {
              backgroundColor: bgColor
            }
          ]}>
          <Animated.Text
            style={[
              style.title,
              {
                color: textColor
              }
            ]}
          >
            {props.title}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    )
  }

  onPress = () => {
    const { props, state } = this;

    Animated.timing(this.state.bgColor, {
      duration: 500,
      toValue: !state.bgColor._value
    }).start()
    Animated.timing(this.state.textColor, {
      duration: 500,
      toValue: !state.textColor._value
    }).start()

    if (props.onPress) {
      props.onPress()
    }
  }
}