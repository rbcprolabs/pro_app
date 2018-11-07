import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    FlatList,
    StatusBar
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux';
import { find, isEqual } from 'lodash';

import { setFollow } from 'app/redux/actions/follow'
import { setFavorite } from 'app/redux/actions/favorites'

import Content from 'app/components/Content';
import ButtonIcon from 'app/components/ButtonIcon';
import Article from 'app/components/Article';
import Follow from 'app/components/Follow';

import * as configStyles from 'app/config/style';


import styles from './styles';

class ArticleDetailList extends Component {

    static defaultProps = {

    };

    state = {
        loading: false
    }

    componentWillMount() {
        this.followNowCheck(this.props)
    }

    componentWillReceiveProps(np) {
        const { props } = this;

        if (!isEqual(props.followList, np.followList)) {
            this.followNowCheck(np);
        }

    }

    componentDidMount() {
        const { state, props } = this;

        // props.articles.map(article =>
        //     find(find(article.parsingDataFiltered, { 'type': props.type }).items, { 'term': props.tag.term })
        //         ?
        //         console.log('article ', article)
        //         : false
        // )

        // props.articles.map(article => {
        //     console.log('lala ', find(article.parsingDataFiltered, { 'type': props.type }))

        // })
    }

    render() {
        const { state, props } = this;
        const style = styles({ ...props, ...state });
        const types = ['default', 'selected', 'withDescription']

        console.log('props дфдф ', props)
        return (
            <Content
                style={style.container}
                showLoading={state.loading}
                topPart={this.topPart(style)}
                bottomPart={this.bottomPart(props, state)}

            >
                <StatusBar hidden />

                <View style={style.content}>

                    <FlatList
                        data={props.articles}
                        keyExtractor={item => item.id}
                        renderItem={this.articleItem}
                    />

                </View>
            </Content>
        );
    }

    articleItem = ({ item }) => {
        const { props } = this;
        const categoryFound = find(item.parsingDataFiltered, { 'type': props.type });

        if (categoryFound && find(categoryFound.items, { 'term': props.tag.term })) {
            return (
                <Article
                    article={item}
                    bookmark={true}
                    type='withDescription'
                    followList={props.followList}
                    favorites={props.favorites}
                    setFavorite={props.setFavorite}
                />
            )
        }
    }

    topPart = (style) => (
        <View style={style.header}>
            <ButtonIcon
                name='ios-close-circle'
                color={configStyles.COLOR_2}
                size={configStyles.FONT_SIZE + 10}
                style={style.close}
                onPress={this.backAction}
            />
            <Text style={style.title}>{this.props.tag.term}</Text>
        </View>
    )

    bottomPart = (props, state) => (
        <Follow
            title={props.tag.term}
            // image={props.image}
            visible={true}
            followNow={state.followNow}
            onPress={this.onPressFollow}
            getSizes={this.getSizesFollow}
        />
    )

    backAction = () => {
        Actions.pop()
    }

    onPress = (id) => {
        console.log('presses id ', id)

    }

    onPressFollow = () => {
        const { props } = this;

        props.setFollow(props.tag);

    }

    followNowCheck = (np) => {
        const { props } = this;
        const followNow = find(np.followList, props.tag) ? true : false;

        this.setState({
            followNow
        })

        return followNow;
    }

    getSizesFollow = (sizes) => {
        this.setState({
            paddingBottom: sizes.paddingBottom
        })
    }

}

function mapStateToProps(state) {
    return {
        articles: state.articles.list,
        followList: state.follow.list,
        followList: state.follow.list,
        favorites: state.favorites.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setFollow: bindActionCreators(setFollow, dispatch),
        setFavorite: bindActionCreators(setFavorite, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailList);