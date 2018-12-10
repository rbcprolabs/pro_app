import React, { PureComponent } from 'react';
import {
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import Button from 'app/components/Button';

import * as configStyles from 'app/config/style';
import styles from './styles';

export default class Follow extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      bottom: configStyles.SPACE_BOTTOM + configStyles.PADDING,
      followStatus: false
    }
  }

  static propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    followList: PropTypes.array,
    tag: PropTypes.object,
    getSizes: PropTypes.func,
    onPress: PropTypes.func,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    image: 'http://photo.torba.com/images/kolominov/c128/Jw3AGpn5gAqq8zfU6u3Q.jpg',
    name: 'star',

  }

  componentWillMount() {
    this.checkFallowStatus()
  }

  render() {
    const { props, state } = this;
    const style = styles({ ...props, ...state });

    return (

      <View
        style={style.container}
        onLayout={this.getHeight}
      >
        <View style={style.content}>
          {/* <ImageBackground
            source={{ uri: props.image }}
            style={style.image}
          /> */}
          <View style={style.detail}>
            <Text style={style.title}>{props.title}</Text>
            <Text style={style.subtitle}>Много людей следят</Text>
          </View>
        </View>
        <View style={style.buttonContainer}>
          <Button
            text={!state.followStatus ? 'Следить +15₽' : 'Отписка'}
            type='2'
            style={style.button}
            onPress={this.onPress}
          />
        </View>
      </View>

    )
  }

  onPress = () => {
    const { props, state } = this;

    this.setState({
      followStatus: !state.followStatus
    }, () => {
      setTimeout(() => {
        if (typeof props.onPress == 'function') {
          props.onPress();
        }
      }, 0)
    });
  }

  checkFallowStatus = () => {
    const { followList, tag } = this.props;
    const followStatus = find(followList, tag) ? true : false;
  
    this.setState({
      followStatus
    })
  }

  getHeight = (e) => {
    const height = e.nativeEvent.layout.height;

    this.setState({
      height
    }, () => {
      this.getSizes();
    })
  }

  getSizes = () => {
    const { props, state } = this;
    const paddingBottom = state.height + state.bottom

    if (props.getSizes) {
      props.getSizes({ paddingBottom })
    }
  }
}