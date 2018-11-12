import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

import Button from 'app/components/Button';

import styles from './styles';

export default class MostPopularTags extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tags: PropTypes.array,
    title: PropTypes.string
  }

  static defaultProps = {
    type: '1',
    title: 'Сегодня в новостях',
    tags: [
      {
        id: 'q1',
        text: 'lala'
      },
      {
        id: 'q2',
        text: 'sdfssdfds dfgsdgfdsg'
      },
      {
        id: 'q3',
        text: 'sdfgsdfgdfgdf gdfg dfgfdgsgsdfg'
      },
      {
        id: 'q4',
        text: 'dsfgdg dsfgdg dsg'
      },
    ]
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
          {props.tags.map(tag =>
            <View
              style={style.buttonContainer}
              key={tag.id}
            >
              <Button
                text={tag.text}
                type='2'
                tagMode={true}
              />
            </View>
          )}
        </View>
      </View>
    )
  }

}