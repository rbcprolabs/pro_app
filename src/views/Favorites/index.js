import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    FlatList,
    StatusBar
} from 'react-native';
import PropTypes from 'prop-types';


import {
    Actions
} from 'react-native-router-flux';

import Content from 'app/components/Content';
import Article from 'app/components/Article';

// import * as contentful from 'contentful'
import * as configStyles from 'app/config/style';
import * as routes from "app/config/sceneKeys";
import styles from './styles';

class Favorites extends PureComponent {

    static propTypes = {
        articles: PropTypes.array,
        followList: PropTypes.array,
    }

    render() {
        const { state, props } = this;
        const types = ['default', 'selected', 'withDescription']
        const style = styles(props);


        return (
            <Content
                style={style.container}
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

                    <FlatList
                        data={props.articles}
                        extraData={props.articles}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.articleItem}
                        initialNumToRender={5}
                        maxToRenderPerBatch={2}
                        onEndReachedThreshold={0.5}
                    />
                </View>
            </Content>
        );
    }

    keyExtractor = item => item.id

    articleItem = ({ item }) => {
        const { props } = this;

        return (
            <Article
                article={item}
                type='default'
                followList={props.followList}
            />
        )
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