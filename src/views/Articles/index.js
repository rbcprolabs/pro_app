import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    StatusBar,
    FlatList
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import { getArticles } from 'app/redux/actions/articles'
import Content from 'app/components/Content';
import Article from 'app/components/Article';

import * as routes from "app/config/sceneKeys";
import * as configStyles from 'app/config/style';
import styles from './styles';

class Articles extends Component {

    static defaultProps = {

    };

    state = {
        loading: false
    }

    componentWillMount() {
        const { props } = this;
        props.articles.length == 0 ? this.setState({ loading: true }) : false
    }


    componentDidMount() {
        const { props } = this;
        Actions.push([routes.LOADING], {
            show: true
        })
        // setTimeout(()=>{
        //     this.setState({
        //         loading: false
        //     })
        // }, 2000)
        if (props.articles.length == 0) {
            props.getArticles().then(() => {
                setTimeout(() => { this.setState({ loading: false }) }, 1500)
            });
        }
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
                <StatusBar
                    {...configStyles.STATUS_BAR}
                />

                <View
                    style={style.content}
                >
                    <FlatList
                        data={props.articles}
                        keyExtractor={item => item.id}
                        extraData={props}
                        renderItem={({ item }) =>
                            <Article
                                article={item}
                                type={types[Math.floor(Math.random() * types.length)]}
                                followList={props.followList}
                            />
                        }
                    />
                    {/* {props.articles.map(article => {
                        // if (article.title == 'Пробить потолок: когда в России начнут строить деревянные многоэтажки') {
                        return (
                            <Article
                                key={article.id}
                                article={article}
                                type={types[Math.floor(Math.random() * types.length)]}
                                type='default'
                                followList={props.followList}
                            />
                        )
                        // }
                    } */}

                    {/* )} */}
                </View>
            </Content>
        );
    }

}

function mapStateToProps(state) {
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