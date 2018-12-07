import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Text
} from 'react-native';

import ButtonIcon from 'app/components/ButtonIcon';
import BookmarkIcon from 'app/components/BookmarkIcon';

import { Actions } from 'react-native-router-flux';
// import * as routes from "app/config/sceneKeys";

import * as configStyles from 'app/config/style';
import styles from './styles';

// console.warn('statusBarHeight: ', StatusBar.currentHeight);

export default class NavBar extends PureComponent {
  static propTypes = {
    title: PropTypes.string,
    leftContentShow: PropTypes.bool,
    rightContentShow: PropTypes.bool,
    leftContent: PropTypes.element,
    rightContent: PropTypes.element,
    favorites: PropTypes.array,
    article: PropTypes.object,
    style: PropTypes.object,
  }

  static defaultProps = {
    title: '',
    leftContentShow: true,
    rightContentShow: true,
    favorites: [],
    article: {},
  };

  render() {
    const { props } = this;
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
              name='arrow-back'
              color={configStyles.COLOR_2}
              size={34}
              style={style.icon}
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
            <BookmarkIcon
              article={props.article}
              favorites={props.favorites}
              onPress={this.actionRight}
              style={style.icon}
            />
          }
        </View>

      </View>
    )
  }


  actionLeft = () => {
    const { props } = this;
    // Actions.drawerOpen()

    if (props.actionLeft) {
      props.actionLeft()
    } else {
      Actions.pop()
    }
  }

  actionRight = () => {
    const { props } = this;
    // Actions[routes.BASKET.key]()
    if (props.actionRight) {
      props.actionRight()
    }
  }
}