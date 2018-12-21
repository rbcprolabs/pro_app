import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    View,
    Text,
    StatusBar
} from 'react-native';
import AsyncStorage from 'app/services/AsyncStorage';


import { getArticles } from 'app/redux/actions/articles'
import Content from 'app/components/Content';
import Button from 'app/components/Button';

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
                    <Button
                        text="Удалить все подписки с памяти?"
                        onPress={this.onPress}
                    />
                </View>
                {this.rollout()}
            </Content>
        );
    }

    rollout = () => {
        const { props } = this;
        const style = styles(props);
        const result = [];

        for (let key in props.rollout) {
            console.log('props.rollout[key]', props.rollout[key])
            result.push({
                key: key,
                value: props.rollout[key]
            })
        }

        return (result.map(item =>
            <View key={item.key} style={style.containerText}>
                <Text>{item.key}</Text>
                <Text>{JSON.stringify(item.value)}</Text>
            </View>
        ))

    }

    onPress = () => {
        AsyncStorage.clear().then(() => {
            alert('Все подписки удалены')
        })
    }

}

function mapStateToProps(state) {
    console.log('state ', state)
    return {
        rollout: state.settings.rollout,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getArticles: bindActionCreators(getArticles, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);