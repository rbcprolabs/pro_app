import React, { Component } from 'react';
import {
  View,
  Text,
  ImageBackground
} from 'react-native';
import PropTypes from 'prop-types';

import Button from 'app/components/Button';

import * as configStyles from 'app/config/style';
import styles from './styles';

export default class Follow extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    followNow: PropTypes.bool,


    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    image: 'http://photo.torba.com/images/kolominov/c128/Jw3AGpn5gAqq8zfU6u3Q.jpg',
    name: 'ios-star',
    followNow: false,

  }

  render() {
    const { props } = this;
    const style = styles(props);
    console.log('followNow ', props.followNow)

    return (

      <View style={style.container}>
        <View style={style.content}>
          <ImageBackground
            source={{ uri: props.image }}
            style={style.image}
          />
          <View style={style.detail}>
            <Text style={style.title}>{props.title}</Text>
            <Text style={style.subtitle}>Много людей следят</Text>
          </View>
        </View>
        <View style={style.buttonContainer}>
          <Button
            text={!props.followNow ? 'Следить +15₽' : 'Отписка'}
            type='2'
            style={style.button}
            onPress={this.onPress}
          />
        </View>
      </View>

    )
  }

  onPress = () => {
    const { props } = this;

    if (props.onPress) {
      props.onPress()
    }
  }
}