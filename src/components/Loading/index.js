import React, { Component } from 'react';
import {
  Modal,
  View,
  Text
} from 'react-native';

import PropTypes from "prop-types";

import styles from './styles';

export default class Loading extends Component {

  static propTypes = {
    show: PropTypes.bool,
    afterClose: PropTypes.func,
  };

  static defaultProps = {
    show: false
  };

  state = {
    words: [
      'новости',
      'аналитика',
      'компании',
      'кейсы',
      'персоны',
      'отрасли',
      'события',
      'показатели'
    ],
    selectedWord: ''
  }

  componentDidMount() {
    this.animation();
  }

  render() {
    const { props, state } = this;
    const style = styles(props);

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
        onRequestClose={() => {
          this.afterClose();
        }}
      >
        <View
          style={[
            style.container
          ]}
        >
          <View style={style.overlay} />

          <View style={style.logoContainer}>
            <View
              style={style.newLine}
            >
              <Text style={style.logo}>
                РБК{' '}|{' '}
              </Text>
              <Text style={[style.logo, style.logoHighlight]}>
                ПРО
              </Text>
            </View>
            <View
              style={style.newLine}
            >
              <Text style={[style.logo, style.colorGray]}>
                {state.selectedWord}
              </Text>
            </View>
          </View>

          <Text style={style.text}>
            Загрузка...
          </Text>

        </View>
      </Modal>
    )
  }

  animation = () => {
    const { state } = this;
    let i = 0;

    this.changeWords = setInterval(() => {
      i++
      this.setState({
        selectedWord: state.words[i] ? state.words[i] : state.words[0]
      })

      if (!state.words[i]) {
        i = 0
      }
    }, 1000)
  }


  show = () => {
    const { props, state } = this;

    // Animated.timing(state.opacity, {
    //   duration: 150,
    //   toValue: 1
    // }).start()

  }

  close = () => {
    const { props } = this;
    clearInterval(this.changeWords);

    if (props.afterClose == 'function') {
      props.afterClose()
    }
  }
}