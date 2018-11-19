import React, { PureComponent } from 'react';
import {
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { find,  } from 'lodash';


import Tag from 'app/components/Tag';
import TextNumeric from 'app/components/TextNumeric';

import styles from './styles';
import * as routes from "app/config/sceneKeys";

export default class OneTagOfArticles extends PureComponent {

  static propTypes = {
    data: PropTypes.object,
    followList: PropTypes.array,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
 
  }

  constructor(props) {
    super(props);

    this.state = {
      countTags: 2,

    }
  }

  componentWillMount() {
    const { props, state } = this;
  }

  
  render() {
    const { props, state } = this;
    const style = styles(props);

    if (!props.data) {
      return null
    }

    return (
      <View style={[style.wrap, style.globalContainer]}>
        <View style={[style.header, style.container]}>
          <Tag
            tag={props.data.tag}
            convert={true}
            style={{ marginTop: 0 }}
            active={find(props.followList, props.data.tag) ? true : false}
            onPress={() => this.onPressTag({
              type: props.data.type,
              tag: props.data.tag
            })}
          />
        </View>
        <View style={[style.container, style.content]}>
          {props.data.articles.map((article, i) =>

            <TouchableOpacity
              key={article.id}
              onPress={() => this.onPressTitle(article)}
              activeOpacity={.9}
            >

              <TextNumeric
                text={article.title}
                number={i}
                textStyle={style.title}
                disableNumber={true}
              />

            </TouchableOpacity>
          )}
        </View>
      </View>
    )
  }

  onPressTitle = article => {
    const { props } = this;

    Actions.push(routes.ARTICLE_DETAIL.key, { article });
  }

  onPressTag = tag => {
    const { props } = this;

    Actions.push(routes.ARTICLES_DETAIL_LIST.key, { ...tag });

  }
}