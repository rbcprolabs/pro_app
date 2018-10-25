import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,

} from 'react-native';

import {
    Actions
} from 'react-native-router-flux';
import { getArticles } from 'app/redux/actions/articles'
import Content from 'app/components/Content';
import Article from 'app/components/Article';

import * as routes from "app/config/sceneKeys";

import styles from './styles';

class Articles extends Component {

    static defaultProps = {

    };

    state = {
        loading: false
    }

    componentDidMount() {
        const { props } = this;
        // setTimeout(()=>{
        //     this.setState({
        //         loading: false
        //     })
        // }, 2000)
        if (props.articles.length == 0) {
            props.getArticles();
        }
        console.log('componentDidMount')


    }

    render() {
        const { state, props } = this;
        const style = styles(props);
        const types = ['default', 'selected', 'withDescription']


        return (
            <Content
                style={style.container}
                showLoading={state.loading}
            >

                <View
                    style={style.categoriesContainer}
                >
                    {props.articles.map(article =>
                        <Article
                            key={article.id}
                            data={article}
                            type={types[Math.floor(Math.random() * types.length)]}
                            onPressTag={this.onPressTag}
                        />
                    )}
                </View>
            </Content>
        );
    }

    onPressTag = (data) => {
        Actions.push(routes.ARTICLES_DETAIL_LIST.key, {...data});
    }

}

function mapStateToProps(state) {
    console.log('state ', state)
    return {
        articles: state.articles.list
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: bindActionCreators(getArticles, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);