import React, { Component } from 'react';

import YouTube from 'react-native-youtube';
import PropTypes from 'prop-types';
import { youtubeKey } from 'app/config/api';

import styles from './styles';

export default class Youtube extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullscreen: false
    }
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
    onChangeFullscreen: PropTypes.func,
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
    const { props, state } = this;
    const style = styles(props);

    return (
      <YouTube
        videoId={props.id}
        play={props.autoplay}
        apiKey={youtubeKey}
        fullscreen={state.fullscreen}
        loop={props.loop}
        showinfo={props.showinfo}
        rel={props.rel}
        ref={component => this._youTubeRef = component}
        onReady={this.onReady}
        onChangeState={this.onChangeState}
        onChangeQuality={this.onChangeQuality}
        onChangeFullscreen={this.onChangeFullscreen}
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
    const { props, state } = this;
    console.log('onChangeState ', e)

    switch (e.state) {
      case 'playing': {
        if (!state.fullscreen) {
          this.setState({
            fullscreen: true
          }, () => {


            // Это смена параметра на фулскрин, долго искал решение, нашел только как тот метод вызвать для фулскрина
            // после вызова ничего не поменяется, просто видео перезагрузит, есть много инфы об ините с вызовом фулскрина,
            // может я что-то не так понял, посмотри, пожалуйста,
            // самые полезные ссыдки, которые мне помогли:
            // https://www.npmjs.com/package/react-native-youtube
            // https://github.com/inProgress-team/react-native-youtube/issues/264
            // https://github.com/inProgress-team/react-native-youtube/issues/252
            // для активации кода открой код ниже

            //this._youTubeRef.reloadIframe()


            
          })
        }
      }
    }



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

  onChangeFullscreen = e => {
    const { props } = this;
    console.log('onChangeFullscreen ', e)

    if (typeof props.onChangeFullscreen == 'function') {
      props.onChangeFullscreen()
    }
  }

  onError = e => {
    const { props } = this;

    if (typeof props.onError == 'function') {
      props.onError()
    }
  }


}