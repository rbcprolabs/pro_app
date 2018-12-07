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


export default class Content extends Component {

    static propTypes = {
        style: PropTypes.object,
        showLoading: PropTypes.bool,
        scrollView: PropTypes.bool,
        bottomPart: PropTypes.element,
        afterLoading: PropTypes.func,
    }

    static defaultProps = {
        statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
        scrollView: true
    };

    render() {
        const { props } = this;
        const style = styles(props);

        return (
            <View style={style.container} {...props}>
                {props.topPart}

                {props.scrollView &&
                    <ScrollView
                    // bounces={false}
                    // style={style.container}
                    // {...props}
                    >
                        {props.children}
                    </ScrollView>
                }

                {!props.scrollView &&
                    <View>
                        {props.children}
                    </View>
                }

                {props.bottomPart}
                <Loading
                    show={props.showLoading}
                    afterClose={props.afterLoading}
                />
            </View>
        )
    }
}