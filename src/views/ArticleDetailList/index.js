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
        loading: false,
        articles: []
    }

    componentDidMount() {
        this.filterArticles();
    }

    render() {
        const { state, props } = this;
        const style = styles({ ...props, ...state });

        return (
            <Content
                style={style.container}
                showLoading={state.loading}
                topPart={this.topPart(style)}
                bottomPart={this.bottomPart(props, state)}

            >
                <StatusBar
                    {...configStyles.STATUS_BAR}
                    hidden
                />

                <View style={style.content}>

                    <FlatList
                        data={state.articles}
                        extraData={state.articles}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.articleItem}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        onEndReachedThreshold={0.5}
                    />

                </View>
            </Content>
        );
    }

    articleItem = ({ item }) => {
        const { props } = this;

        return (
            <Article
                key={item.id}
                article={item}
                bookmark={true}
                type='withDescription'
                followList={props.followList}
                favorites={props.favorites}
                setFavorite={props.setFavorite}
                disableTags={true}
            />
        )
    }

    filterArticles = () => {
        const { props } = this;
        const articles = props.articles.filter(item => {
            const byCategory = item.parsingDataFiltered.find(el => el.type === props.type);

            if (byCategory) {
                return byCategory.items.find(el => el.term === props.tag.term)
            }
        })

        this.setState({
            articles
        })

    }

    keyExtractor = item => item.id

    topPart = (style) => (
        <View style={style.header}>
            <ButtonIcon
                name='close-circle'
                color={configStyles.COLOR_2}
                size={configStyles.FONT_SIZE + 10}
                style={style.close}
                onPress={this.backAction}
            />
            <Text style={style.title}>{this.props.tag.term}</Text>
        </View>
    )

    bottomPart = props => (
        <Follow
            title={props.tag.term}
            // image={props.image}
            visible={true}
            followList={props.followList}
            tag={props.tag}
            onPress={this.onPressFollow}
            getSizes={this.getSizesFollow}
        />
    )

    backAction = () => {
        Actions.pop()
    }

    onPress = id => {
        console.log('presses id ', id)

    }

    onPressFollow = () => {
        const { props } = this;

        props.setFollow(props.tag);

    }

    getSizesFollow = sizes => {
        this.setState({
            paddingBottom: sizes.paddingBottom
        })
    }

}

function mapStateToProps(state) {
    return {
        articles: state.articles.list,
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