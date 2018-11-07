import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StatusBar
} from 'react-native';

import {
    Actions
} from 'react-native-router-flux';

import Content from 'app/components/Content';
import Article from 'app/components/Article';

// import * as contentful from 'contentful'
import * as configStyles from 'app/config/style';
import * as routes from "app/config/sceneKeys";
import styles from './styles';

class Favorites extends Component {

    static defaultProps = {

    };

    state = {
        loading: false
    }

    componentDidMount() {
        // setTimeout(()=>{
        //     this.setState({
        //         loading: false
        //     })
        // }, 2000)



    }

    render() {
        const { state, props } = this;
        const types = ['default', 'selected', 'withDescription']
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
                    {props.articles.length == 0 &&
                        <Text>Вам ничего не нравится</Text>
                    }
                    {props.articles.map(article =>
                        <Article
                            key={article.id}
                            article={article}
                            type={types[Math.floor(Math.random() * types.length)]}
                            followList={props.followList}
                            onPressTag={this.onPressTag}
                        />
                    )}
                </View>
            </Content>
        );
    }

    onPressTag = (data) => {
        Actions.push(routes.ARTICLES_DETAIL_LIST.key, { ...data });
    }

}

function mapStateToProps(state) {
    console.log('state ', state)
    return {
        articles: state.favorites.list,
        followList: state.follow.list,
    }
}

export default connect(mapStateToProps)(Favorites);