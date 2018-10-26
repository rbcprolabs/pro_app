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
import Content from 'app/components/Content';

import styles from './styles';


class Index extends Component {

    static defaultProps = {

    };

    state = {
        loading: false
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 2000)
    }

    render() {
        const { state, props } = this;
        const style = styles(props);


        return (
            <Content
                style={style.container}
                showLoading={state.loading}
            >
                <Text style={style.text}>INDEX PAGE</Text>
            </Content>
        );
    }
}

function mapStateToProps(state) {
    return {
        //   products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //   getProducts: bindActionCreators(getProducts, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);