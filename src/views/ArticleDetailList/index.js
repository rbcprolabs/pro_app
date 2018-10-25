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

    componentDidMount() {
        // setTimeout(()=>{
        //     this.setState({
        //         loading: false
        //     })
        // }, 2000)

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
                topPart={this.topPart(style)}
                bottomPart={this.bottomPart(props)}

            >
                <StatusBar hidden />

                <View
                    style={style.articlesContainer}
                >

                    {props.articles.map(article =>
                        article.tags.find(tag => tag.text == props.title)
                            ?
                            <Article
                                key={article.id}
                                data={article}
                                bookmark={true}
                                type={types[Math.floor(Math.random() * types.length)]}
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
            <Text style={style.title}>{this.props.title}</Text>
        </View>
    )

    bottomPart = (props) => (
        <Follow
            title={props.title}
            // image={props.image}
            visible={true}
        />
    )

    backAction = () => {
        Actions.pop()
    }

    onPress = (id) => {
        console.log('presses id ', id)

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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetailList);