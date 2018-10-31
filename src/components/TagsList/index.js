import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import PropTypes from 'prop-types';


import uuid from 'uuid/v1';
import { find, size, isEmpty, mapValues } from 'lodash';
import Tag from 'app/components/Tag';


import styles from './styles';
import * as configStyles from 'app/config/style';
import * as routes from "app/config/sceneKeys";



export default class TagsList extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tags: PropTypes.array,
    convert: PropTypes.bool,
    typeVisible: PropTypes.bool,
    randomMode: PropTypes.bool,
    bgMode: PropTypes.bool,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    convert: false,
    typeVisible: false,
    randomMode: false,
    bgMode: false,
    tags: []
  }

  componentDidMount() {

  }


  render() {
    const { props, state } = this;
    const style = styles(props);
    return (
      <View style={style.container}>
        {props.tags.length > 0 &&
          <View>
            {!props.randomMode && this.tags(style)}
            {props.randomMode && this.randomMode(style)}
          </View>
        }
      </View>
    )
  }

  tags = (style) => this.props.tags.map((data, i) => {
    let title = '';

    switch (data.type) {
      case 'companies':
        title = 'Компании'
        break
      case 'persons':
        title = 'Люди'
        break
      case 'indicators':
        title = 'Отрасли'
        break
      case 'industries':
        title = 'Промышленности'
        break
      case 'tags':
        title = 'Тэги'
        break

      default:
        title = 'Заголовок'
    }

    return (
      <View key={uuid()}>
        {this.props.typeVisible &&
          <Text style={style.title}>{title}</Text>
        }
        {data.items.map(tag =>
          <Tag
            key={uuid()}
            tag={tag}
            active={find(this.props.followList, tag) ? true : false}
            onPress={() => this.onPress({
              categoryIndex: i,
              type: data.type,
              tag
            })}
          />
        )}
      </View>
    )
  })


  randomMode = () => {
    const { props } = this;
    const categoryIndex = Math.floor(Math.random() * props.tags.length);
    const tagIndex = Math.floor(Math.random() * props.tags[categoryIndex].items.length);
    const tagSelected = props.tags[categoryIndex].items[tagIndex];

    return (
      <Tag
        key={uuid()}
        tag={tagSelected}
        convert={props.convert}
        style={{ marginTop: 0 }}
        active={find(props.followList, tagSelected) ? true : false}
        onPress={() => this.onPress({
          categoryIndex,
          type: props.tags[categoryIndex].type,
          tag: tagSelected
        })}
      />
    )
  }

  onPress = (tag) => {
    const { props } = this;

    Actions.push(routes.ARTICLES_DETAIL_LIST.key, {...tag});

    if (props.onPress) {
      props.onPress(tag)
    }
  }
}