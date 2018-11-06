import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { isEmpty } from 'lodash';
import {
    View,
    Text,
    ImageBackground
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux';
import moment from 'moment';

import { setFavorite } from 'app/redux/actions/favorites'

import Content from 'app/components/Content';
import TagsList from 'app/components/TagsList';
import NavBar from 'app/components/NavBar';
import TextNumeric from 'app/components/TextNumeric';





import styles from './styles';

class ArticleDetail extends Component {

    static defaultProps = {

    };

    state = {
        loading: false
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
                {/* <TagsList
                    key={uuid()}
                    tags={props.article.parsingDataFiltered}
                    followList={props.followList}
                    onPress={this.onPressTag}
                    typeVisible={true}
                    bgMode={true}
                /> */}
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
                                        path: item.content,
                                        text: item.data.target.fields.title,
                                    })
                            }
                        </View>

                    )}
                    {/* <Text style={style.description}>{props.article.body}</Text> */}

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

        // return (
        //     atricle.map(item => {
        //         let customStyle = {};

        //         // console.log('item.marks ', item.marks)

        //         // item.content.map(item =>

        //         switch (nodeType) {
        //             case '': {
        //                 //statements; 
        //                 break;
        //             }
        //             case 'blockquote': {
        //                 console.log('case blockquote ', item)
        //                 let style = {...style}
        //                 style.description = {...style.description, fontWeight: '700'}
        //                 this.textBlock(item.content, item.nodeType, style, 'AAAAAAAAAAA')
        //                 // item.content.map(el=>{
        //                 //     // if (el.marks
        //                 //     //     && el.marks.length > 0
        //                 //     //     && marks[0].type == 'bold'
        //                 //     // ) {
        //                 //     //     customStyle = { ...customStyle, fontWeight: '700' }
        //                 //     //     // console.log('true')
        //                 //     // }
        //                 //     return (
        //                 //         <Text
        //                 //             key={uuid()}
        //                 //             style={[
        //                 //                 style.description,

        //                 //                 customStyle
        //                 //             ]}>
        //                 //             1111{el.value}1111
        //                 //         </Text>
        //                 //     )
        //                 // })

        //             }
        //             default: {
        //                 return (
        //                     <Text
        //                         key={uuid()}
        //                         style={[
        //                             style.description,
        //                             customStyle
        //                         ]}>
        //                         {item.value} {text}
        //                     </Text>
        //                 )
        //             }
        //         }

        //             // if (item.nodeType == 'paragraph') {
        //             //     return (
        //             //         <Text
        //             //             key={uuid()}
        //             //             style={[
        //             //                 style.description,
        //             //                 customStyle
        //             //             ]}>
        //             //             {item.value}
        //             //         </Text>
        //             //     )
        //             // }

        //         }
        //     )
        // )

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
        path,
        text
    }) => {
        const style = styles(this.props);
        const testPath = 'https://images.sftcdn.net/images/t_app-cover-l,f_auto/p/befbcde0-9b36-11e6-95b9-00163ed833e7/260663710/the-test-fun-for-friends-screenshot.jpg';

        return (
            <View
                key={uuid()}
                style={style.imageContainer}>
                <ImageBackground
                    source={{ uri: testPath }}
                    style={{ width: '100%', height: 232 }}
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