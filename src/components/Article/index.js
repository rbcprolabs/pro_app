import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import PropTypes from 'prop-types';

import Tag from 'app/components/Tag';
// import Icon from 'app/components/Icon';
import styles from './styles';
import * as configStyles from 'app/config/style';

export default class Category extends Component {

  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
      dateInfo: PropTypes.string,
      description: PropTypes.string,
      subTitle: PropTypes.string,
      tags: PropTypes.array,
      descriptions: PropTypes.array,
      bookmark: PropTypes.bool,
    }),
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
      imageWidth: 0
    }
  }

  // componentWillMount() {
  //   const imageWidth = Dimensions.get('window').width - (stylesConfig.GUTTER * 10);
  //   this.setState({
  //     imageWidth
  //   });
  //   // this.setImageParams()
  // }

  render() {
    const { props, state } = this;
    const { data } = props;
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

            {data.bookmark &&
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

            {data.dateInfo &&

              <View
                style={[
                  style.header,
                ]}>
                <View style={style.headerLine} />
                <Text style={style.headerText}>{data.dateInfo}</Text>
              </View>
            }

            {data.theme == 'dark' &&
              <View style={style.topViewContainer}>
                {data.tags.map(tag =>
                  <Tag
                    key={tag.id}
                    active={tag.active}
                    text={tag.text}
                    description={tag.description}
                    convert={true}
                    style={{ marginTop: 0 }}
                  />
                )}
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
              {data.subTitle &&
                <Text style={style.subTitle}>{data.subTitle}</Text>
              }

              {data.description &&
                <Text style={[
                  style.description,
                  style.descriptionСontainer
                ]}>
                  {data.description}
                </Text>
              }
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

            </View>
            {/* END Content part */}

            <View
              style={[
                style.footer,
              ]}>
              {data.theme !== 'dark' &&

                data.tags.map(tag =>
                  <Tag
                    key={tag.id}
                    active={tag.active}
                    description={tag.description}
                    text={tag.text}
                  />
                )
              }
            </View>
          </View>
        </View>
      </View>
    )
  }

  onPress = () => {
    const { props, state } = this;



    if (props.onPress) {
      props.onPress()
    }
  }
}