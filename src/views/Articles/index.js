import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    StatusBar,
    FlatList
} from 'react-native';
import { maxBy, isEqual, difference } from 'lodash';
import { Actions } from 'react-native-router-flux';

import {
    getArticles,
    clearArticles,
    getCards
} from 'app/redux/actions/articles';
import { setFavorite } from 'app/redux/actions/favorites';
import { setFollow } from 'app/redux/actions/follow';
import Content from 'app/components/Content';
import Article from 'app/components/Article';
import OneTagOfArticles from 'app/components/OneTagOfArticles';
import MostPopularTags from 'app/components/MostPopularTags';
import InitialData from 'app/bootstrap/InitialData';
import Youtube from 'app/components/Youtube';



import * as routes from "app/config/sceneKeys";
import * as configStyles from 'app/config/style';
import styles from './styles';

class Articles extends PureComponent {

    static defaultProps = {

    };

    state = {
        loading: false,
        populars: ['people', 'companies', 'industries', 'tags'],
        showPopularIndex: 0,
        maxTags: 0,
        refreshing: false,
        articles: []
    }

    componentWillMount() {
        const { props, state } = this;

        InitialData('favorites', props.setFavorite);
        InitialData('follow', props.setFollow);

        // Actions.push([routes.LOADING], {
        //     show: true
        // })


    }

    


    componentDidMount() {
        const { props, state } = this;

        if (state.articles.length == 0) {
            this.setState({ loading: true })
            this.getArticles()
        }

    }

    componentWillReceiveProps(np) {
        if (np.articles.length > 0) {

            this.setMaxTags(np);

            this.setState({
                articles: np.articles
            })
        }
    }

    render() {
        const { state, props } = this;
        const style = styles(props);


        return (

            <Content
                style={style.container}
                scrollView={false}
                showLoading={state.loading}
            >
                <StatusBar
                    {...configStyles.STATUS_BAR}
                />

                <FlatList
                    data={state.articles}
                    extraData={props}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.articleItem}
                    refreshing={state.refreshing}
                    onRefresh={this.onSwipeDown}
                    style={[ style.content]}
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    onEndReached={(e)=>console.log('test', e)}
                    onEndReachedThreshold={1}
                />

            </Content>
        );
    }

    onSwipeDown = () => {
        const { props } = this;

        this.setState({
            refreshing: true
        })

        props.clearArticles();
        this.getArticles()

    }

    getArticles = cb => {
        const { props, state } = this;

        Promise.all([
            props.getArticles(),
            props.getCards()
        ]).then(() => {
            this.setState({
                loading: false,
                refreshing: false
            })

            if (typeof cb == 'function') {
                cb();
            }
        });
    }

    keyExtractor = item => item.id

    articleItem = ({ item, index }) => {
        const { props, state } = this;
        let type = 'default';
        let indexShow = 0;
        let popularType = false;

        if (item.format == 'Что это значит') {
            type = 'selected'
        }

        if (item.youtube) {
            type = 'youtube'
        }

        if (item.media) {
            type = 'media'
        }

        if (state.maxTags !== 0
            && this.checkMaxTags(item.parsingData) > state.maxTags
        ) {
            type = 'withLead'
        }

        if ((index + 1) % 5 === 0) {
            indexShow = (index + 1) / 5 - 1;
            popularType = state.populars[indexShow];
        }

        return (
            <View key={item.id}>
                {popularType &&
                    <MostPopularTags
                        tags={props.mostPopularTags[popularType]}
                        tagsType={popularType}
                    />
                }
                {popularType
                    && props.basketCards[indexShow] &&
                    <OneTagOfArticles
                        data={props.basketCards[indexShow]}
                        followList={props.followList}
                    />
                }
                {/* {item.title == 'В центре Москвы объем свободных торговых площадей сократился на 4%' ? */}
                <Article
                    article={item}
                    type={type}
                    bookmark={true}
                    favorites={props.favorites}
                    setFavorite={props.setFavorite}
                    followList={props.followList}
                    index={index}
                />
                {/* : false} */}

            </View>
        )
    }

    setMaxTags = props => {
        const { state } = this;
        const articleWithMaxTags = maxBy(props.articles, item =>
            this.checkMaxTags(item.parsingData)
        );
        const maxTags = this.checkMaxTags(articleWithMaxTags.parsingData) * .8;

        this.setState({
            maxTags
        })

    }

    checkMaxTags = array => array.length > 0
        ? array.reduce((sum, cur) => {
            return sum + cur.items.length
        }, array[0].items.length)
        : false

}

function mapStateToProps(state) {
    return {
        articles: state.articles.list,
        tags: state.articles.list,
        mostPopularTags: state.articles.mostPopularTags,
        basketCards: state.articles.basketCards,
        favorites: state.favorites.list,
        followList: state.follow.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: bindActionCreators(getArticles, dispatch),
        clearArticles: bindActionCreators(clearArticles, dispatch),
        getCards: bindActionCreators(getCards, dispatch),
        setFavorite: bindActionCreators(setFavorite, dispatch),
        setFollow: bindActionCreators(setFollow, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);