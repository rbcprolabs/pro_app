import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from 'uuid/v1';
import { find } from 'lodash';
import {
    View,
    Text,
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux';
import moment from 'moment';

import { setFavorite } from 'app/redux/actions/favorites'

import Content from 'app/components/Content';
import TagsList from 'app/components/TagsList';
import NavBar from 'app/components/NavBar';




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


        return (
            <Content
                style={style.container}
                showLoading={state.loading}
                topPart={this.topPart(style)}

            >
                <TagsList
                    key={uuid()}
                    tags={props.article.tags}
                    followList={props.followList}
                    onPress={this.onPressTag}
                    typeVisible={true}
                    bgMode={true}
                />
                <View style={style.content}>

                    <Text style={style.description}>{props.article.body}</Text>

                </View>
            </Content>
        );
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
                    <Text style={style.title}>{props.article.title}</Text>
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