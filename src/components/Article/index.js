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
import moment from 'moment';
import { find, isEmpty } from 'lodash';


import Tag from 'app/components/Tag';
import TagsList from 'app/components/TagsList';
import TextNumeric from 'app/components/TextNumeric';
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
    }),
    followList: PropTypes.array,
    favorites: PropTypes.array,
    previewModeTag: PropTypes.bool,
    bookmark: PropTypes.bool,
    disableTags: PropTypes.bool,
    type: PropTypes.string,
    tagOnes: PropTypes.array,
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
    previewModeTag: true,
    tagOnes: [],
    disableTags: false
  }

  constructor(props) {
    super(props);

    this.state = {
      countTags: 2,
      tagsIndexes: [0, 1, 2],
      types: {
        default: {
          tags: 'bottom',
          date: 'bottom',
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

  // componentWillReceiveProps(np) {
  //   console.log('np ', np)
  // }


  render() {
    const { props, state } = this;
    const { article } = props;
    const view = state.types[props.type];
    const published = `${moment(article.published).format('DD.MM.YY, h:mm')} | ${article.sources.fields.name}`;
    const tagsPreview = props.type === 'selected' ? ['tags'] : (props.previewModeTag ? ['industries', 'companies'] : false);

    let tags = props.previewModeTag
      ?
      props.article.parsingDataFiltered.filter(tagList =>
        tagsPreview.find(preview =>
          tagList.type == preview
        )
      )
      :
      props.article.parsingDataFiltered;

    if (props.disableTags) {
      tags = []
    }

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
                color={find(props.favorites, {
                  title: article.title,
                  origin: article.origin,
                  origin: article.origin,
                  lead: article.lead,
                  format: article.format,
                }) ? configStyles.COLOR_3 : configStyles.COLOR_6}
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

            {tags.length > 0
              && view.tags == 'top' &&
              <View style={style.topViewContainer}>
                <TagsList
                  tags={tags}
                  followList={props.followList}
                  randomMode={true}
                  convert={true}
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

              {view.description && article.lead &&
                <Text style={[
                  style.description,
                  style.descriptionСontainer
                ]}>
                  {article.lead}
                </Text>
              }

              {/* 1,2,3 */}
              {article.descriptions &&
                article.descriptions.map((item, index) =>
                  <TextNumeric
                    text={item.text}
                    number={index}
                  />
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
                  tags={tags}
                  followList={props.followList}
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


  onPressTitle = () => {
    const { props } = this;

    Actions.push(routes.ARTICLE_DETAIL.key, {
      article: props.article,
      previewModeTag: props.previewModeTag
    });
  }

  onPressFavorite = () => {
    const { props } = this;

    props.setFavorite(props.article)
  }
}