import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,

} from 'react-native';

import { getArticles } from 'app/redux/actions/articles'
import Content from 'app/components/Content';
import Article from 'app/components/Article';

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
                    style={style.content}
                >
                    {props.articles.map(article =>
                        <Article
                            key={article.id}
                            article={article}
                            type={types[Math.floor(Math.random() * types.length)]}
                            followList={props.followList}
                        />
                    )}
                </View>
            </Content>
        );
    }

}

function mapStateToProps(state) {
    console.log('state ', state)
    return {
        articles: state.articles.list,
        followList: state.follow.list,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: bindActionCreators(getArticles, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);