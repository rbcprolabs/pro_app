import React, { Component } from 'react';
import { Dimensions } from "react-native";
import {
    Scene,
    Stack,
    Router,
    Tabs,
    Modal
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import Rox from 'rox-react-native';
import ReduxContainer from 'app/bootstrap/Redux';
import InitialData from 'app/bootstrap/InitialData';
import { setFavorite } from 'app/redux/actions/favorites';



import * as routes from "app/config/sceneKeys";
import styles from './styles';


// Redux
import Categories from 'app/views/Categories';
import Articles from 'app/views/Articles';
import ArticleDetailList from 'app/views/ArticleDetailList';
import ArticleDetail from 'app/views/ArticleDetail';
import Favorites from 'app/views/Favorites';
import Settings from 'app/views/Settings';
// END Redux

import AsincStorage from 'app/services/AsincStorage';


export default class App extends Component {

    componentWillMount() {
        // InitialData();

    }

    render() {
        const style = styles();
        // For network debug
        // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

        Rox.setup("5bd03940fd54c84192765520")
        // let favorites;

        // if((favorites = await AsincStorage.get('favorites'))){

        // };


        // const flags = {
        //     articlesView: new Rox.Flag(true)
        //   };
        // Rox.register('TEST', flags);


        // if (flags.articlesView.isEnabled()) {
        //     console.log('articlesView is enabled');
        //     alert('articlesView is enabled')
        //   }else{
        //       alert(JSON.stringify(flags.articlesView.isEnabled()))
        //   }
        
        return (
            <ReduxContainer>
                <Router sceneStyle={style.routerContainer}>
                    <Modal
                        hideNavBar
                    >

                        <Stack key="root">

                            <Scene
                                key={routes.CATEGORIES.key}
                                title={routes.CATEGORIES.title}
                                component={Categories}
                                hideNavBar={true}

                            />

                            <Scene
                                key={routes.ARTICLE_DETAIL.key}
                                title={routes.ARTICLE_DETAIL.title}
                                component={ArticleDetail}
                                hideNavBar={true}

                            />


                            <Scene
                                key={routes.FEED.key}
                                panHandlers={null}
                                hideNavBar
                                initial
                            >
                                <Tabs
                                    key={routes.FEED.key}
                                    swipeEnabled
                                    showLabel={true}
                                    tabBarPosition='top'
                                    tabBarStyle={style.tabsContainer}
                                    tabStyle={style.tab}
                                    labelStyle={style.tabLabel}
                                    indicatorStyle={style.tabActiveIndicator}
                                    upperCaseLabel={false}
                                    lazy
                                >
                                    <Scene
                                        key={routes.ARTICLES.key}
                                        title={routes.ARTICLES.title}
                                        component={Articles}
                                        hideNavBar={true}
                                    />
                                    <Scene
                                        key={routes.FAVORITES.key}
                                        title={routes.FAVORITES.title}
                                        component={Favorites}
                                        hideNavBar={true}
                                    />
                                    <Scene
                                        key={routes.SETTINGS.key}
                                        title={routes.SETTINGS.title}
                                        component={Settings}
                                        hideNavBar={true}
                                    />
                                </Tabs>
                            </Scene>

                        </Stack>

                        <Scene
                            key={routes.ARTICLES_DETAIL_LIST.key}
                            title={routes.ARTICLES_DETAIL_LIST.title}
                            component={ArticleDetailList}
                            hideNavBar={true}

                        />
                    </Modal>
                </Router>
            </ReduxContainer>
        );
    }
}