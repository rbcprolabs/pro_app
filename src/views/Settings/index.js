import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StatusBar
} from 'react-native';


import { getArticles } from 'app/redux/actions/articles'
import Content from 'app/components/Content';

import * as configStyles from 'app/config/style';

import styles from './styles';

class Settings extends Component {

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
                    style={style.categoriesContainer}
                >
                    <Text>Settings</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);