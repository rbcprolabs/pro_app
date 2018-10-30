import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import moment from 'moment';
import { find, isEmpty } from 'lodash';


import Tag from 'app/components/Tag';
import TagsList from 'app/components/TagsList';
import ButtonIcon from 'app/components/ButtonIcon';

import styles from './styles';
import * as routes from "app/config/sceneKeys";
import * as configStyles from 'app/config/style';

export default class Article extends Component {

  static propTypes = {
    article: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      descriptions: PropTypes.array,
      date: PropTypes.string,
      tags: PropTypes.array,
    }),
    followList: PropTypes.array,
    favorites: PropTypes.array,
    bookmark: PropTypes.bool,
    type: PropTypes.string,
    setFavorite: PropTypes.func,
    onPressTag: PropTypes.func,
    onPress: PropTypes.func,

    // styling
    style: PropTypes.object,
    iconStyle: PropTypes.object
  }

  static defaultProps = {
    favorites: [],
    followList: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      countTags: 2,
      tagsIndexes: [0, 1, 2],
      types: {
        default: {
          tags: 'bottom',
          date: 'top',
          description: false
        },
        selected: {
          tags: 'top',
          date: 'bottom',
          description: false
        },
        withDescription: {
          tags: 'bottom',
          date: 'bottom',
          description: true
        }
      }
    }
  }

  componentWillMount() {
    const { props, state } = this;
    // this.getTagsIndexes(props.data.tags, state.countTags)
  }

  render() {
    const { props, state } = this;
    const { article } = props;
    const view = state.types[props.type];
    const published = `${moment(article.published).format('DD.MM.YY, h:mm')} | ${article.source}`;
    const style = styles(props);

    return (
      <View style={style.globalContainer}>
        {/* Image part */}
        {article.image &&
          <ImageBackground
            source={{ uri: article.image }}
            style={{ width: '100%', height: 232 }}
          />
        }
        {article.tagTop &&
          <Tag
            type='ellipse'
            tag={article.tagTop}
            active={find(props.followList, article.tagTop) ? true : false}
            style={style.tagTop}
          />
        }
        {/* END Image part */}

        <View style={style.wrap}>
          <View
            style={[
              style.container,
            ]}>
            {props.bookmark &&
              <ButtonIcon
                name={"ios-bookmark"}
                color={find(props.favorites, article) ? configStyles.COLOR_3 : configStyles.COLOR_6}
                size={34}
                style={style.bookmark}
                onPress={this.onPressFavorite}
              />
            }

            {view.date == 'top' &&

              <View
                style={[
                  style.header,
                ]}>
                <View style={style.headerLine} />
                <Text style={style.headerText}>{published}</Text>
              </View>
            }

            {view.tags == 'top'
              && article.tags.length > 0 &&
              <View style={style.topViewContainer}>
                <TagsList
                  tags={article.tags}
                  followList={props.followList}
                  randomMode={true}
                  convert={true}
                  onPress={this.onPressTag}
                />
              </View>
            }

            {/* Content part */}
            <View
              style={[
                style.content,
              ]}>

              {article.title &&
                <TouchableOpacity
                  onPress={this.onPressTitle}
                  activeOpacity={.9}
                >
                  <Text style={style.title}>{article.title}</Text>
                </TouchableOpacity>
              }
              {view.date == 'bottom' &&
                <Text style={style.subTitle}>{published}</Text>
              }

              {view.description && article.indicators &&
                <Text style={[
                  style.description,
                  style.descriptionСontainer
                ]}>
                  {article.indicators}
                </Text>
              }

              {/* 1,2,3 */}
              {article.descriptions &&
                article.descriptions.map((item, index) =>
                  <View
                    key={item.id}
                    style={[
                      style.descriptionList,
                      index == 0 ? style.firstDescriptionItem : {}
                    ]}
                  >
                    <Text style={[
                      style.description,
                      style.descriptionItem,
                    ]}>
                      {item.text}
                    </Text>
                    <Text style={style.descriptionCount}>
                      {index + 1}
                    </Text>

                    <View style={style.disableLeftBorder} />
                    <View style={style.disableRightBorder} />
                    <View style={style.disableBottomBorder} />
                  </View>
                )
              }
              {/* 1,2,3 */}


            </View>
            {/* END Content part */}

            <View
              style={[
                style.footer,
              ]}>
              {view.tags == 'bottom' &&
                <TagsList
                  tags={article.tags}
                  followList={props.followList}
                  onPress={this.onPressTag}
                />
              }
            </View>
          </View>
        </View>
      </View>
    )
  }

  getTagsIndexes = (array, count) => {
    const indexes = [];
    const getIndexes = () => {
      const index = Math.floor(Math.random() * array.length);

      if (indexes.length < count) {
        indexes.find(tag => tag == index) ? getIndexes() : indexes.push(index);
        getIndexes();
      }
    }


    getIndexes();

    this.setState({
      tagsIndexes: indexes
    })
  }

  onPressTag = tag => {
    const { props, state } = this;

    if (props.onPressTag) {
      props.onPressTag(tag)
    }
  }

  onPressTitle = () => {
    const { props } = this;

    Actions.push(routes.ARTICLE_DETAIL.key, props.article);
  }

  onPressFavorite = () => {
    const { props } = this;

    props.setFavorite(props.article)
  }
}