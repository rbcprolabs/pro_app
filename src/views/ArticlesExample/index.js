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
import { getArticles } from 'app/redux/actions/articles'
import Content from 'app/components/Content';
import Article from 'app/components/Article';
import Button from 'app/components/Button';

// import * as contentful from 'contentful'


import styles from './styles';

class Articles extends Component {

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
        this.props.getArticles();
        console.log('componentDidMount')


    }

    articles = [
        {
            id: 'a1',
            title: 'Минсельхоз поддержал идею об отдельной полке для молочной продукции в магазинах',
            subTitle: '06.09.2018, 13:10 | ratail.ru',
            type: 'selected',
            tags: [
                {
                    id: 't3',
                    active: true,
                    text: 'Молочная продукция'
                }
            ]
        },
        {
            id: 'a2',
            dateInfo: 'Дайджест / Выпуск 29, 5-12 сентября',
            title: 'Ключевые события продуктового ритейла',
            description: 'X5 приобрела 450 постаматов «Халва» Spar открывает фермерские ярмарки Снять деньги в «Фасоли» и доехать на бесплатном такси из «Карусели»',
            bookmark: true,
            tags: [
                {
                    id: 't1',
                    active: true,
                    text: 'Продуктовый ритейл +10₽'
                },
                {
                    id: 't2',
                    active: false,
                    text: 'Книги, печать, канцтовары'
                },
            ]
        },
        {
            id: 'a4',
            dateInfo: 'Дайджест / Выпуск 29, 5-12 сентября',
            title: 'Ключевые события продуктового ритейла',
            description: 'X5 приобрела 450 постаматов «Халва» Spar открывает фермерские ярмарки Снять деньги в «Фасоли» и доехать на бесплатном такси из «Карусели»',
            bookmark: false,
            tags: [
                {
                    id: 't7',
                    active: true,
                    text: 'Продуктовый ритейл +10₽'
                },
                {
                    id: 't8',
                    active: false,
                    text: 'Книги, печать, канцтовары'
                },
            ]
        },
        {
            id: 'a3',
            title: 'X5 Открыла ящик',
            subTitle: '13.10.2018, 13:10 | КоммерсантЪ',
            tags: [
                {
                    id: 't4',
                    active: true,
                    text: 'Продуктовый ритейл +14₽'
                },
                {
                    id: 't5',
                    active: false,
                    text: 'Игорь Плетнев +5₽',
                    description: 'директор по развитию стратегических бизнесов X5',
                }
            ]
        },
        {
            id: 'a5',
            image: 'https://eimg.pravda.com/images/doc/f/c/fc2247d-690-2.jpg',
            title: '«Вкусвилл» пускает корни',
            subTitle: '13.10.2018, 13:10 | Источник – www.rbc.ru',
            description: 'Фонд TealTech Capital, среди основателей которого один из владельцев «Вкусвилла» Андрей Кривенко, поучаствует в создании сети сити-ферм «Местные корни». За три года в Москве и крупных городах должно появиться десять площадок по выращиванию зелени общей мощностью 1 тыс. тонн в год. Потенциальный оборот рынка этой продукции с сити-ферм оценивается в 70 млрд руб.',
            bookmark: false,
            tagTop: {
                active: false,
                text: 'Сити-фермы'
            },
            tags: [
                {
                    id: 't9',
                    active: false,
                    text: 'Вкусвилл +10₽'
                },
                {
                    id: 't10',
                    active: false,
                    text: 'Фонд TealTech Capital +3₽'
                },
            ]
        },
        {
            id: 'a6',
            dateInfo: 'Дайджест / Выпуск 29, 8-14 октября',
            title: 'Неделя ритейла',
            descriptions: [
                {
                    id: 'd1',
                    text: 'X5 Retail Group открыла магазин-лабораторию для быстрого технического тестирования и R&D новых технологий.'
                },
                {
                    id: 'd2',
                    text: 'Департамент по работе с рынками капитала "Магнита" возглавит Петр Молчанов'
                },
                {
                    id: 'd3',
                    text: 'Ритейлер «Ашан» представил новую концепцию магазинов - «Одастор» - с акцентом на товарах средней и премиальной ценовой категории'
                },
            ],
            bookmark: false,
            tags: [
                {
                    id: 't11',
                    active: false,
                    text: 'Продуктовый ритейл +3₽'
                },
                {
                    id: 't12',
                    active: false,
                    text: 'Кадровые перестановки +10₽'
                },
                {
                    id: 't13',
                    active: true,
                    text: 'Премиальные товары +5₽'
                },
                {
                    id: 't14',
                    active: true,
                    text: 'R&D и новые технологии +5₽'
                },
            ]
        },
    ]

    render() {
        const { state, props } = this;
        const style = styles(props);


        return (
            <Content
                style={style.container}
                showLoading={state.loading}
            >

                <View
                    style={style.categoriesContainer}
                >
                    {this.articles.map(article =>
                        <Article
                            key={article.id}
                            data={article}
                        />
                    )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Articles);