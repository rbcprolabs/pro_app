import React, { Component, } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { isEmpty } from 'lodash';
import {
    View,
    Text,
    Dimensions,
    StatusBar,
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux';

import AutoHeightImage from 'react-native-auto-height-image';
import moment from 'moment';

import { setFavorite } from 'app/redux/actions/favorites'

import Content from 'app/components/Content';
import TagsList from 'app/components/TagsList';
import NavBar from 'app/components/NavBar';
import TextNumeric from 'app/components/TextNumeric';

import * as configStyles from 'app/config/style';
import styles from './styles';

class ArticleDetail extends Component {

    static defaultProps = {

    };

    state = {
        loading: false,
        imageWidth: 0
    }

    componentWillMount() {
        const imageWidth = Dimensions.get('window').width - configStyles.INTENT * 2;
        this.setState({
            imageWidth
        })
    }

    render() {
        const { state, props } = this;
        const style = styles(props);

        console.log('props detail ', props)
        return (
            <Content
                style={style.container}
                showLoading={state.loading}
                topPart={this.topPart(style)}

            >
                <StatusBar
                    {...configStyles.STATUS_BAR}
                    translucent={true}
                />
                <TagsList
                    key={uuid()}
                    tags={props.article.parsingDataFiltered}
                    followList={props.followList}
                    onPress={this.onPressTag}
                    typeVisible={true}
                    bgMode={true}
                />
                <View style={style.content}>
                    {props.article.body.content.map(item =>
                        <View key={uuid()}>
                            {
                                item.content.length > 0
                                    ?
                                    this.textBlock({
                                        atricle: item.content,
                                        nodeType: item.nodeType,
                                    })
                                    :
                                    this.imageBlock({
                                        image: item.data.target.fields.file,
                                        text: item.data.target.fields.title,
                                    })
                            }
                        </View>

                    )}

                </View>
            </Content>
        );
    }

    textBlock = ({
        atricle,
        nodeType,
        customStyle,
        viewType = 'default',
        index
    }) => {
        const { props } = this;
        const style = styles(props);

        // console.log(nodeType, atricle)


        return atricle.map((item, i) => {

            switch (nodeType) {
                // case 'heading-2': {
                case 'heading-2': {
                    return this.text(item.value, style.title);
                }
                case 'heading-3': {
                    return this.text(item.value, style.subTitle);
                }
                case 'blockquote': {

                    return this.textBlock({
                        atricle: item.content,
                        nodeType: item.nodeType,
                        customStyle: style.blockquote,
                        viewType: 'blockquote'
                    })
                }

                case 'unordered-list': {
                    return item.content.map(el =>
                        this.textBlock({
                            atricle: el.content,
                            nodeType: item.nodeType,
                            viewType: 'list',
                            index: i
                        })
                    )
                }

                case 'list-item': {
                    return (
                        <TextNumeric
                            key={uuid()}
                            text={item.value}
                            number={index}
                        />
                    )
                }

                default: {
                    // console.log('тута ', nodeType, atricle)

                    if (item.marks
                        && item.marks.length > 0
                        && item.marks[0].type == 'bold') {
                        customStyle = { ...customStyle, fontWeight: '700' };

                        // console.log('viewType ', viewType)
                        if (viewType == 'blockquote') {
                            customStyle = { ...customStyle, ...style.author };
                        }
                        // console.log('customStyle ', customStyle)
                    }


                    if (item.value !== '')
                        return this.text(item.value, customStyle);

                }

            }
        })

    }

    text = (text, customStyle) => {
        const style = styles(this.props);

        return (
            <Text
                key={uuid()}
                style={[
                    style.description,
                    customStyle
                ]}>
                {text}
            </Text>
        )
    }

    imageBlock = ({
        image,
        text
    }) => {
        const { state, props } = this;
        const style = styles(props);

        return (
            <View
                key={uuid()}
                style={style.imageContainer}>
                <AutoHeightImage
                    width={state.imageWidth}
                    source={{ uri: `https:${image.url}` }}
                />
                {text !== '' &&
                    <Text style={style.imageDescription}>{text}</Text>
                }

            </View>
        )
    }


    topPart = (style) => {
        const { props } = this;

        return (
            <View>
                <NavBar
                    title='Кококоммерсант'
                    actionRight={this.addFavorite}
                    favorites={props.favorites}
                    article={props.article}
                />
                <View style={style.header}>
                    <Text style={style.globalTitle}>{props.article.title}</Text>
                    <Text style={style.date}>{moment(props.article.published).format('DD.MM.YY, h:mm')}</Text>
                </View>
            </View>
        )
    }

    backAction = () => {
        Actions.pop()
    }

    onPress = (id) => {
        console.log('presses id ', id)

    }

    addFavorite = (id) => {
        const { props } = this;
        console.log('addFavorite ')
        props.setFavorite(props.article)

    }

}

function mapStateToProps(state) {
    return {
        favorites: state.favorites.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFavorite: bindActionCreators(setFavorite, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);