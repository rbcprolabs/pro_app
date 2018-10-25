import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import moment from 'moment';


import Tag from 'app/components/Tag';
// import Icon from 'app/components/Icon';
import styles from './styles';
import * as configStyles from 'app/config/style';

export default class Category extends Component {

  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
      descriptions: PropTypes.array,
      date: PropTypes.string,
      tags: PropTypes.array,
    }),
    bookmark: PropTypes.bool,
    type: PropTypes.string,
    onPressTag: PropTypes.func,
    onPress: PropTypes.func,

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
    const { data } = props;
    const view = state.types[props.type];
    const published = `${moment(data.published).format('DD.MM.YY, h:mm')} | ${data.source}`;
    const style = styles(props);

    return (
      <View style={style.globalContainer}>
        {/* Image part */}
        {data.image &&
          <ImageBackground
            source={{ uri: data.image }}
            style={{ width: '100%', height: 232 }}
          />
        }
        {data.tagTop &&
          <Tag
            type='ellipse'
            active={data.tagTop.active}
            text={data.tagTop.text}
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
              // TODO: заменить на ButtonIcon
              <TouchableOpacity
                style={style.bookmark}
                activeOpacity={.9}
                onPress={this.onPress}
              >
                <Ionicons
                  name={"ios-bookmark"}
                  size={34}
                  color={configStyles.COLOR_6}
                  style={style.bookmarkIcon}
                />
              </TouchableOpacity>
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
              && data.tags.length > 0 &&
              <View style={style.topViewContainer}>
                {/* {data.tags.map(tag => */}
                <Tag
                  // active={data.tags[0].active}
                  text={data.tags[0].text}
                  description={data.tags[0].description}
                  convert={true}
                  style={{ marginTop: 0 }}
                  onPress={() => this.onPressTag({
                    title: data.tags[0].text,
                    image: data.origin
                  })}
                />
                {/* )} */}
              </View>
            }

            {/* Content part */}
            <View
              style={[
                style.content,
              ]}>

              {data.title &&
                <Text style={style.title}>{data.title}</Text>
              }
              {view.date == 'bottom' &&
                <Text style={style.subTitle}>{published}</Text>
              }

              {view.description && data.indicators &&
                <Text style={[
                  style.description,
                  style.descriptionСontainer
                ]}>
                  {data.indicators}
                </Text>
              }

              {/* 1,2,3 */}
              {data.descriptions &&
                data.descriptions.map((item, index) =>
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
              {view.tags == 'bottom'
                && data.tags.length > 0 &&
                // state.tagsIndexes.map(i =>
                //   data.tags[i]
                //     ?
                //     <Tag
                //       key={uuid()}
                //       // active={tag.active}
                //       description={data.tags[i].description}
                //       text={data.tags[i].text}
                //     />
                //     :
                //     false
                // )
                data.tags.map(tag =>

                  <Tag
                    key={uuid()}
                    // active={tag.active}
                    description={tag.description}
                    text={tag.text}
                    onPress={() => this.onPressTag({
                      title: tag.text,
                      image: data.origin
                    })}
                  />

                )
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

  onPressTag = (data) => {
    const { props, state } = this;



    if (props.onPressTag) {
      props.onPressTag(data)
    }
  }
}