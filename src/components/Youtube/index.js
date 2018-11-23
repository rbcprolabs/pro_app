import React, { Component } from 'react';

import YouTube from 'react-native-youtube';
import PropTypes from 'prop-types';
import { youtubeKey } from 'app/config/api';

import styles from './styles';

export default class Youtube extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    id: PropTypes.string.isRequired,
    autoplay: PropTypes.bool,
    fullscreen: PropTypes.bool,
    loop: PropTypes.bool,
    showinfo: PropTypes.bool,
    rel: PropTypes.bool,
    onReady: PropTypes.func,
    onChangeState: PropTypes.func,
    onChangeQuality: PropTypes.func,
    onError: PropTypes.func,

    // styling
    style: PropTypes.object,
  }

  static defaultProps = {
    autoplay: false,
    fullscreen: false,
    loop: false,
    showinfo: false,
    rel: false,
  }

  render() {
    const { props } = this;
    const style = styles(props);

    return (
      <YouTube
        videoId={props.id}
        // play={props.autoplay}
        apiKey={youtubeKey}
        // fullscreen={props.fullscreen}
        // loop={props.loop}
        // showinfo={props.showinfo}
        // rel={props.rel}
        onReady={this.onReady}
        onChangeState={this.onChangeState}
        onChangeQuality={this.onChangeQuality}
        onError={this.onChangeQuality}
        style={style.player}
      />

    )
  }

  onReady = () => {
    const { props } = this;

    if (typeof props.onReady == 'function') {
      props.onReady()
    }
  }

  onChangeState = e => {
    const { props } = this;

    if (typeof props.onChangeState == 'function') {
      props.onChangeState()
    }
  }

  onChangeQuality = e => {
    const { props } = this;

    if (typeof props.onChangeQuality == 'function') {
      props.onChangeQuality()
    }
  }

  onError = e => {
    const { props } = this;

    if (typeof props.onError == 'function') {
      props.onError()
    }
  }


}