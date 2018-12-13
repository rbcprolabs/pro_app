import React, { PureComponent } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import Mixpanel from 'react-native-mixpanel';
import {
  Actions
} from 'react-native-router-flux';
import PropTypes from 'prop-types';
import moment from 'moment';
import { find } from 'lodash';


import Tag from 'app/components/Tag';
import TagsList from 'app/components/TagsList';
import TextNumeric from 'app/components/TextNumeric';
import BookmarkIcon from 'app/components/BookmarkIcon';
import Youtube from 'app/components/Youtube';
import Image from 'app/components/Image';

import styles from './styles';
import * as routes from "app/config/sceneKeys";
import * as configStyles from 'app/config/style';

export default class Article extends PureComponent {

  static propTypes = {
    article: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      lead: PropTypes.string,
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
      bookmarkColor: configStyles.COLOR_6,
      tagsIndexes: [0, 1, 2],
      types: {
        default: {
          tags: 'bottom',
          date: 'bottom',
          lead: false
        },
        selected: {
          tags: 'top',
          date: 'bottom',
          lead: false
        },
        withLead: {
          tags: 'bottom',
          date: 'bottom',
          lead: true
        },
        media: {
          tags: 'bottom',
          date: 'bottom',
          lead: true
        },
        youtube: {
          video: true,
          tags: 'bottom',
          date: 'bottom',
          lead: true
        }
      }
    }
  }

  render() {
    const { props, state } = this;
    const { article } = props;
    const view = state.types[props.type] || state.types['default'];
    const published = `${moment(article.published).format('DD.MM.YY, h:mm')} | ${article.sources.fields.name}`;
    const tagsPreview = props.type === 'selected' || props.type == 'youtube' ? ['tags'] : (props.previewModeTag ? ['industries', 'companies'] : false);
    const style = styles(props);

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
              <BookmarkIcon
                article={article}
                favorites={props.favorites}
                onPress={this.onPressFavorite}
                style={style.bookmark}
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

              {article.idYoutube &&
                <Youtube
                  id={article.idYoutube}
                  style={style.video}
                />
              }

              {view.lead && article.lead &&
                <Text style={[
                  style.lead,
                  style.leadСontainer
                ]}>
                  {article.lead}
                </Text>
              }

              {article.media
                && article.media.fields &&
                <Image
                  url={article.media.fields.file.url}
                // activeZoom={true}
                />
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
    Mixpanel.track(`Pressing to title, opening detail page`)
  }

  onPressFavorite = () => {
    const { props, state } = this;

    props.setFavorite(props.article)
  }
}