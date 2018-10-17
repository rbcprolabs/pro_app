import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text,
  Platform,
  StatusBar
} from 'react-native';

import ButtonIcon from 'app/components/ButtonIcon';

import {Actions} from 'react-native-router-flux';
import * as routes from "app/config/sceneKeys";

import * as stylesConfig from 'app/config/style';
import styles from './styles';

// console.warn('statusBarHeight: ', StatusBar.currentHeight);

class NavBar extends Component {
  static propTypes = {
    title: PropTypes.string,
    leftContentShow: PropTypes.bool,
    rightContentShow: PropTypes.bool,
    leftContent: PropTypes.element,
    rightContent: PropTypes.element,
    style: PropTypes.object,
  }

  static defaultProps = {
    title: '',
    leftContentShow: true,
    rightContentShow: true,
    statusBarHeight: Platform.OS === 'ios' ? 20 : 0
  };

  render() {
    const {props} = this;
    const style = styles(props);
    return (
      <View
        style={style.container}
      >

        <View style={style.side}>
          {props.leftContentShow
          && props.leftContent &&
          props.leftContent
          }
          {props.leftContentShow
          && !props.leftContent &&
          <ButtonIcon
            name='arrow_left'
            onPress={this.actionLeft}
          />
          }
        </View>


        <View style={style.center}>
          <Text
            style={style.title}
            numberOfLines={1}
          >
            {props.title}
          </Text>
        </View>

        <View style={style.side}>
          {props.rightContentShow
          && props.rightContent &&
          props.rightContent
          }
          {props.rightContentShow
          && !props.rightContent &&
          <ButtonIcon
            name='arrow_left'
            onPress={this.actionRight}
          />
          }
        </View>

      </View>
    )
  }


  actionLeft = () => {
    const {props} = this;
    // Actions.drawerOpen()

    if (props.actionLeft) {
      props.actionLeft()
    }
  }

  actionRight = () => {
    const {props} = this;
    // Actions[routes.BASKET.key]()
    if (props.actionRight) {
      props.actionRight()
    }
  }
}


export default NavBar;