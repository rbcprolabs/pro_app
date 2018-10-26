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
import moment from 'moment';

import Content from 'app/components/Content';
import ButtonIcon from 'app/components/ButtonIcon';




import styles from './styles';

class ArticleDetail extends Component {

    static defaultProps = {

    };

    state = {
        loading: false
    }

    render() {
        const { state, props } = this;
        const style = styles(props);


        return (
            <Content
                style={style.container}
                showLoading={state.loading}
                topPart={this.topPart(style)}

            >
                <View style={style.content}>

                    <Text style={style.description}>{props.body}</Text>

                </View>
            </Content>
        );
    }

    topPart = (style) => {
        const { props } = this;

        return (
            <View style={style.header}>
                {/* <ButtonIcon
                    name='ios-close-circle'
                    color={configStyles.COLOR_2}
                    size={configStyles.FONT_SIZE + 10}
                    style={style.close}
                    onPress={this.backAction}
                /> */}
                <Text style={style.title}>{props.title}</Text>
                <Text style={style.date}>{moment(props.published).format('DD.MM.YY, h:mm')}</Text>
            </View>
        )
    }



    backAction = () => {
        Actions.pop()
    }

    onPress = (id) => {
        console.log('presses id ', id)

    }

}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleDetail);