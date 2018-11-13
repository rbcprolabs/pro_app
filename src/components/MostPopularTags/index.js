import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import Button from 'app/components/Button';

import * as routes from "app/config/sceneKeys";
import styles from './styles';

export default class MostPopularTags extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tags: PropTypes.array,
    tagsType: PropTypes.string,
    onPress: PropTypes.func,
    title: PropTypes.string,
  }

  static defaultProps = {
    title: 'Сегодня в новостях'
  }

  render() {
    const { props } = this;
    const style = styles(props);

    return (
      <View style={style.container}>

        <View
          style={[
            style.header,
          ]}>
          <View style={style.headerLine} />
          <Text style={style.headerText}>{props.title}</Text>
        </View>

        <View style={style.content}>
          {props.tags.map((tag, i) =>
            <View
              key={uuid()}
              style={style.buttonContainer}
            >
              <Button
                text={tag.term}
                type='2'
                onPress={this.onPress}
                onPress={() => this.onPress({
                  categoryIndex: i,
                  type: props.tagsType,
                  tag
                })}
                tagMode={true}
              />
            </View>
          )}
        </View>
      </View>
    )
  }

  onPress = tag => {
    const { props } = this;

    Actions.push(routes.ARTICLES_DETAIL_LIST.key, { ...tag });

    if (props.onPress) {
      props.onPress(tag)
    }
  }

}