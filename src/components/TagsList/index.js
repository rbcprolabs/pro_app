import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import PropTypes from 'prop-types';


import uuid from 'uuid/v1';
import { find, size, isEmpty, mapValues } from 'lodash';
import Tag from 'app/components/Tag';


import styles from './styles';
import * as configStyles from 'app/config/style';


export default class TagsList extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tags: PropTypes.array,
    convert: PropTypes.bool,
    typeVisible: PropTypes.bool,
    randomMode: PropTypes.bool,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    convert: false,
    typeVisible: false,
    randomMode: false,

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
            {!props.randomMode && this.tags()}
            {props.randomMode && this.randomMode()}
          </View>
        }
      </View>
    )
  }

  tags = () =>
    this.props.tags.map((data, i) =>
      <View key={uuid()}>
        {this.props.typeVisible &&
          <Text>{data.type}</Text>
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

    if (props.onPress) {
      props.onPress(tag)
    }
  }
}