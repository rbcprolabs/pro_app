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

    // componentDidMount(){
    //     setTimeout(()=>{
    //         this.setState({
    //             loading: false
    //         })
    //     }, 2000)
    // }

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
        //   products: state.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        //   getProducts: bindActionCreators(getProducts, dispatch),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);