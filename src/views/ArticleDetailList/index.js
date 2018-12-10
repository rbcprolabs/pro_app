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
        loading: false,
        articles: []
    }

    componentWillReceiveProps(np) {
        if (np.articles.length > 0) {

            this.setState({
                articles: np.articles
            })
        }
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

                    {props.articles.map(item => this.articleItem({ item }))}

                    {/* Todo: переделать фильтр и флет лист для быстрого рендера */}
                    {/* <FlatList
                        data={props.articles}
                        extraData={props}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.articleItem}
                        style={[style.container]}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        onEndReachedThreshold={0.5}
                    /> */}

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
    }

    // filterArticles = ()=>{
    //     const {state} = this;

        

    // }

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