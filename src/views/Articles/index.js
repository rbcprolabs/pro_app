import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    StatusBar,
    FlatList
} from 'react-native';
import { maxBy, isEqual, difference } from 'lodash';
import { Actions } from 'react-native-router-flux';

import { getArticles } from 'app/redux/actions/articles';
import { setFavorite } from 'app/redux/actions/favorites';
import { setFollow } from 'app/redux/actions/follow';
import Content from 'app/components/Content';
import Article from 'app/components/Article';
import MostPopularTags from 'app/components/MostPopularTags';
import InitialData from 'app/bootstrap/InitialData';


import * as routes from "app/config/sceneKeys";
import * as configStyles from 'app/config/style';
import styles from './styles';

class Articles extends Component {

    static defaultProps = {

    };

    state = {
        loading: false,
        populars: ['people', 'companies', 'industries', 'tags'],
        showPopularIndex: 0,
        maxTags: 0
    }

    componentWillMount() {
        const { props } = this;

        InitialData('favorites', props.setFavorite);
        InitialData('follow', props.setFollow);

        props.articles.length == 0 ? this.setState({ loading: true }) : false
    }


    componentDidMount() {
        const { props } = this;
        Actions.push([routes.LOADING], {
            show: true
        })

        if (props.articles.length == 0) {
            props.getArticles().then(() => {
                setTimeout(() => { this.setState({ loading: false }) }, 1500)
            });
        }
    }

    componentWillReceiveProps(np) {
        if (np.articles.length > 0) {
            this.setMaxTags(np);
        }
    }

    render() {
        const { state, props } = this;
        const style = styles(props);

        return (
            <Content
                style={style.container}
                showLoading={state.loading}
            >
                <StatusBar
                    {...configStyles.STATUS_BAR}
                />

                <View
                    style={style.content}
                >

                    {props.articles.map((item, index) =>
                        this.articleItem({ item, index })
                    )}

                </View>
            </Content>
        );
    }

    articleItem = ({ item, index }) => {
        const { props, state } = this;
        let type = 'default';
        let popularType = false;

        if (item.format == 'Что это значит') {
            type = 'selected'
        }

        if (state.maxTags !== 0
            && this.checkMaxTags(item.parsingData) > state.maxTags
        ) {
            type = 'withDescription'
        }

        if ((index + 1) % 5 === 0) {
            popularType = state.populars[(index + 1) / 5 - 1];
        }

        return (
            <View key={item.id}>
                {popularType &&
                    <MostPopularTags
                        tags={props.mostPopularTags[popularType]}
                        tagsType={popularType}
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
                    />
                    {/* : false} */}

            </View>
        )
    }

    setMaxTags = props => {
        const articleWithMaxTags = maxBy(props.articles, item =>
            this.checkMaxTags(item.parsingData)
        );

        this.setState({
            maxTags: this.checkMaxTags(articleWithMaxTags.parsingData) * .8
        })

    }

    checkMaxTags = array => array.reduce((sum, cur) => {
        return sum + cur.items.length
    }, array[0].items.length)

}

function mapStateToProps(state) {
    return {
        articles: state.articles.list,
        tags: state.articles.list,
        mostPopularTags: state.articles.mostPopularTags,
        favorites: state.favorites.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: bindActionCreators(getArticles, dispatch),
        setFavorite: bindActionCreators(setFavorite, dispatch),
        setFollow: bindActionCreators(setFollow, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);