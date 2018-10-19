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
import Category from 'app/components/Category';
import Button from 'app/components/Button';

import styles from './styles';


class Categories extends Component {

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

    categories = [
        {
            id: 'tv',
            title: 'Телеканал',
        },
        {
            id: 'newspaper',
            title: 'Газета',
        },
        {
            id: 'magazine',
            title: 'Журнал',
        },
        {
            id: 'style',
            title: 'Стиль',
        },
        {
            id: 'car',
            title: 'Авто',
        },
        {
            id: 'news',
            title: 'CNews',
        },
        {
            id: 'moto',
            title: 'Мото',
        },
        {
            id: 'nature',
            title: 'Природа',
        },
    ]

    render() {
        const { state, props } = this;
        const style = styles(props);


        return (
            <Content
                style={style.container}
                showLoading={state.loading}
                topPart={this.topPart(style)}
                bottomPart={this.bottomPart(style)}
            >

                <View
                    style={style.categoriesContainer}
                >
                    {this.categories.map(item =>
                        <View
                            key={item.id}
                            style={style.categoriesItem}
                        >
                            <Category
                                title={item.title}
                                onPress={() => this.onPress(item.id)}
                            />
                        </View>
                    )}
                </View>
            </Content>
        );
    }

    onPress = (id) => {
        console.log('presses id ', id)
        // const client = contentful.createClient({
        //     space: 'tu25wwmnykjr',
        //     accessToken: '12fe425427e6969dd7df6c41b21de307d1d74c2d971421bcf9dd22edaf0eccb4'
        // });
        // console.log('client ', client)
        // client.getEntries().then(entries => {
        //     entries.items.forEach(entry => {
        //         console.log('entry ', entry)
        //         if (entry.fields) {
        //             console.log('entry.fields ', entry.fields)
        //         }
        //     })
        // })
    }

    topPart = (style) => (
        <View style={style.topPart}>
            <Text style={style.subTitle}>вторник, 6 июля</Text>
            <Text style={style.title}>Категории</Text>
        </View>
    )


    bottomPart = (style) => (
        <View style={style.bottomPart}>
            <Button
                text="Button"
                onPress={() => console.log('lala click')}
            />
        </View>
    )
}

function mapStateToProps(state) {
    return {
    }
}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);