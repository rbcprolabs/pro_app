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
import Button from 'app/components/Button';

// import * as contentful from 'contentful'


import styles from './styles';

class Articles extends Component {

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
        this.props.getArticles();
        console.log('componentDidMount')


    }

    render() {
        const { state, props } = this;
        const style = styles(props);


        return (
            <Content
                style={style.container}
                showLoading={state.loading}
            >

                <View
                    style={style.categoriesContainer}
                >
                    <Article />
                </View>
            </Content>
        );
    }

    onPress = (id) => {
        console.log('presses id ', id)

    }

}

function mapStateToProps(state) {
    console.log('state ', state)
    return {
        articles: state.articles
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: bindActionCreators(getArticles, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);