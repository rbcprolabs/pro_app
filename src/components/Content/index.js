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
        showLoading: PropTypes.bool,
        bottomPart: PropTypes.element,
        afterLoading: PropTypes.func,
    }

    static defaultProps = {
        statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
    };

    render() {
        const { props } = this;
        const style = styles(props);

        return (
            <View style={style.container} {...props}>
                {props.topPart}
                <ScrollView bounces={false}
                    // style={style.container}
                    // {...props}
                >
                    {props.children}
                </ScrollView>
                {props.bottomPart}
                <Loading
                    show={props.showLoading}
                    afterClose={props.afterLoading}
                />
            </View>
        )
    }
}


export default Content;