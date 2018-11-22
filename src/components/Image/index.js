import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import PropTypes from 'prop-types';
import AutoHeightImage from 'react-native-auto-height-image';

import ButtonIcon from 'app/components/ButtonIcon';
import ImagePreview from 'app/components/Modals/ImagePreview';

import * as configStyles from 'app/config/style';
import styles from './styles';

export default class Image extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageWidth: 0,
      showModal: false
    }
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    activeZoom: PropTypes.bool,

    // styling
    style: PropTypes.object,
  }

  static defaultProps = {
    activeZoom: false
  }

  componentWillMount() {
    const imageWidth = Dimensions.get('window').width - configStyles.MARGIN * 2;

    this.setState({
      imageWidth
    })
    // this.getTagsIndexes(props.data.tags, state.countTags)
  }

  render() {
    const { props, state } = this;
    const style = styles(props);

    return (
      <View>
        <TouchableOpacity
          onPress={this.onPress}
          style={style.container}
          activeOpacity={.9}
        >
          <AutoHeightImage
            width={state.imageWidth}
            source={{ uri: `https:${props.url}` }}
          />
          {props.activeZoom &&
            <ButtonIcon
              name='eye'
              color={configStyles.COLOR_2}
              size={28}
              style={style.button}
              circleMode={true}
              onPress={this.onPressZoom}
            />
          }
        </TouchableOpacity>

        <ImagePreview
          show={state.showModal}
          url={`https:${props.url}`}
          afterClose={this.afterCloseZoom}
        />
      </View>
    )
  }

  onPressZoom = () => {
    this.setState({
      showModal: true
    })
  }

  afterCloseZoom = () => {
    this.setState({
      showModal: false
    })
  }

}