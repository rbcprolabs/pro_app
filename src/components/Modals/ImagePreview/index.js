import React, { Component } from 'react';
import {
  Modal,
  View,
  Dimensions,
  Text,
  StatusBar
} from 'react-native';
import PropTypes from "prop-types";
import PhotoView from 'react-native-photo-view';

import ButtonIcon from 'app/components/ButtonIcon';

import * as configStyles from 'app/config/style';
import styles from './styles';

export default class ImagePreview extends Component {

  static propTypes = {
    show: PropTypes.bool,
    afterClose: PropTypes.func,
  };

  static defaultProps = {
    show: false
  };

  render() {
    const { props, state } = this;
    const size = {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }
    const style = styles({ ...props, ...size });

    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.show}
      >


        <View
          style={[
            style.container
          ]}
        >
          <View style={style.overlay} />

          <View style={style.content}>
            <ButtonIcon
              name='close'
              color={configStyles.COLOR_2}
              size={35}
              style={style.button}
              circleMode={true}
              onPress={this.close}
            />
            <PhotoView
              source={{ uri: props.url }}
              minimumZoomScale={1}
              maximumZoomScale={6}
              androidScaleType="center"
              style={style.image}
            />
          </View>

        </View>
      </Modal>
    )
  }

  close = () => {
    const { props } = this;

    if (typeof props.afterClose == 'function') {
      props.afterClose()
    }
  }
}