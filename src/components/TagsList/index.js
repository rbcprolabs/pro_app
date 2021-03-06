import React, { PureComponent } from 'react';
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

// import * as configStyles from 'app/config/style';
import * as routes from "app/config/sceneKeys";
import styles from './styles';



export default class TagsList extends PureComponent {
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

  componentWillMount() {
    const { props } = this;

    if (props.randomMode) {
      const tagSelected = props.tags[Math.floor(Math.random() * props.tags.length)];

      this.setState({
        tagSelected
      })
    }
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

  tags = style => this.props.tags.map(data => {
    let title = '';

    if (!data.items) {
      return this.tagItem(data)
    }

    switch (data.type) {
      case 'companies':
        title = 'Компании'
        break
      case 'people':
        title = 'Люди'
        break
      case 'indicators':
        title = 'Показатели'
        break
      case 'industries':
        title = 'Отрасли'
        break
      case 'tags':
        title = 'Тэги'
        break
      case 'geography':
        title = 'География'
        break
      case 'format':
        title = 'Формат'
        break
      case 'functions':
        title = 'Функции'
        break

      default:
        title = 'Заголовок'
    }
    return (
      <View key={uuid()}>
        {this.props.typeVisible &&
          <Text style={style.title}>{title}</Text>
        }
        {data.items.map(tag => this.tagItem(tag))}
      </View>
    )
  })

  tagItem = tag => {
    const { props } = this;

    return (
      <Tag
        key={uuid()}
        tag={tag}
        active={find(props.followList, tag) ? true : false}
        onPress={() => this.onPress({
          type: tag.type,
          tag
        })}
      />
    )
  }


  randomMode = () => {
    const { props, state } = this;

    return (
      <Tag
        key={uuid()}
        tag={state.tagSelected}
        convert={props.convert}
        style={{ marginTop: 0 }}
        active={find(props.followList, state.tagSelected) ? true : false}
        onPress={() => this.onPress({
          type: state.tagSelected.type,
          tag: state.tagSelected
        })}
      />
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