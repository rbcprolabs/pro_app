import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
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

    render() {
        const { state, props } = this;
        const style = styles(props);
        const types = ['default', 'selected', 'withDescription']

        console.log('props ', props)
        return (
            <Content
                style={style.container}
                showLoading={state.loading}
                topPart={this.topPart(style)}
                bottomPart={this.bottomPart(props, state)}

            >
                <StatusBar hidden />

                <View style={style.content}>

                    {props.articles.map(article =>
                        find(article.tags[props.categoryIndex].items, props.tag)
                            ?
                            <Article
                                key={article.id}
                                article={article}
                                bookmark={true}
                                type='withDescription'
                                followList={props.followList}
                                favorites={props.favorites}
                                setFavorite={props.setFavorite}
                            />
                            :
                            false
                    )}

                </View>
            </Content>
        );
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
            <Text style={style.title}>{this.props.tag.text}</Text>
        </View>
    )

    bottomPart = (props, state) => (
        <Follow
            title={props.tag.text}
            // image={props.image}
            visible={true}
            followNow={state.followNow}
            onPress={this.onPressFollow}
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