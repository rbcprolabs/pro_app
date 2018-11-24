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
    TouchableOpacity,
    Linking
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
import Youtube from 'app/components/Youtube';
import Image from 'app/components/Image';

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
        const { article } = props;
        const style = styles(props);
        console.log('props.article ', article);
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
                <View style={style.header}>
                    <Text style={style.globalTitle}>{article.title}</Text>
                    <Text style={style.date}>{moment(article.published).format('DD.MM.YY, h:mm')}</Text>
                </View>
                <TagsList
                    key={uuid()}
                    tags={article.parsingData}
                    followList={props.followList}
                    onPress={this.onPressTag}
                    typeVisible={true}
                    bgMode={true}
                />

                <View style={style.content}>

                    {article.media &&
                        <View>
                            {this.text(article.media.fields.description)}
                            <Image
                                url={article.media.fields.file.url}
                                activeZoom={true}
                            />
                        </View>
                    }

                    {article.idYoutube &&
                        <View>
                            <Youtube
                                id={article.idYoutube}
                                style={style.video}
                            />
                            {this.text(article.lead)}
                        </View>
                    }


                    {article.body && article.body.content.map(el =>
                        <View key={uuid()} style={{ flexWrap: 'wrap', flexDirection: 'row' }} >
                            {
                                el.content.length > 0
                                    ?
                                    this.textBlock({
                                        atricle: el.content,
                                        nodeType: el.nodeType,
                                    })
                                    :
                                    this.imageBlock({
                                        image: el.data.target.fields.file,
                                        text: el.data.target.fields.title,
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
        link,
        index
    }) => {
        const { props } = this;
        const style = styles(props);

       // console.log(nodeType, atricle)
        return atricle.map((item, i) => {
            switch (item.nodeType) {
                case 'hyperlink': {
                    return this.textBlock({
                        atricle: item.content,
                        nodeType: item.nodeType,
                        link: item.data.uri,
                        viewType: 'link'
                    })
                }
            }

            switch (nodeType) {
                // case 'heading-2': {
                case 'heading-2': {
                    return this.text(item.value, style.title);
                }
                case 'heading-3': {
                    return this.text(item.value, style.subTitle);
                }
                case 'blockquote': {

                    return (
                        <View key={uuid()} style={style.containerBlockquote}>
                            {
                                this.textBlock({
                                    atricle: item.content,
                                    nodeType: item.nodeType,
                                    customStyle: style.blockquote,
                                    viewType: 'blockquote'
                                })
                            }
                        </View>
                    )
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

                        if (viewType == 'blockquote') {
                            customStyle = { ...customStyle, ...style.author };
                        }
                    }

                    if (viewType == 'link') {
                        return (
                            <TouchableOpacity
                                key={uuid()}
                                onPress={() => Linking.openURL(link)}
                                activeOpacity={.8}
                            >
                                {this.text(item.value, style.link)}
                            </TouchableOpacity>
                        )
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
                ]}
            >
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
            <NavBar
                title={props.article.sources.fields.name}
                actionRight={this.addFavorite}
                favorites={props.favorites}
                article={props.article}
            />
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