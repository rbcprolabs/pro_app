import React, { Component } from 'react';
import { Dimensions } from "react-native";
import {
    Scene,
    Stack,
    Router,
    Tabs,
    Modal
} from 'react-native-router-flux';

import ReduxContainer from 'app/bootstrap/Redux';

import * as routes from "app/config/sceneKeys";
import styles from './styles';



import NavBar from "app/components/NavBar";
// import * as contentful from 'contentful'
// const contentful = require('contentful')


// Redux
import Index from 'app/views/Index';
import Categories from 'app/views/Categories';
import Articles from 'app/views/Articles';
import ArticleDetailList from 'app/views/ArticleDetailList';
import ArticleDetail from 'app/views/ArticleDetail';
import Favorites from 'app/views/Favorites';
import Settings from 'app/views/Settings';

// END Redux


export default class App extends Component {



    render() {
        const style = styles();
        // For network debug
        GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
        return (
            <ReduxContainer>
                <Router sceneStyle={style.routerContainer}>
                    <Modal
                        hideNavBar
                    >

                        <Stack key="root">
                            <Scene
                                key={routes.INDEX.key}
                                title={routes.INDEX.title}
                                component={Index}
                                navBar={NavBar}
                            />

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