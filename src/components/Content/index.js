import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    View,
    ScrollView,
    Platform,
    StatusBar
} from 'react-native';

import Loading from 'app/components/Loading';
import styles from './styles';


class Content extends Component {

    static propTypes = {
        style: PropTypes.object,
        disableMargin: PropTypes.bool,
        showLoading: PropTypes.bool,
        afterLoading: PropTypes.func
    }

    static defaultProps = {
        disableMargin: false,
        statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    };

    render() {
        const { props } = this;
        const style = styles(props);

        return (
            <View style={style.container} {...props}>
                <ScrollView bounces={false}
                    // style={style.container}
                    // {...props}
                >
                    {props.children}
                </ScrollView>
                <Loading
                    show={props.showLoading}
                    afterClose={props.afterLoading}
                />
            </View>
        )
    }
}


export default Content;