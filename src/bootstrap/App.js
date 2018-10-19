import React, { Component } from 'react';
import { Dimensions } from "react-native";
import {
    Scene,
    Stack,
    Router,
} from 'react-native-router-flux';

import ReduxContainer from 'app/bootstrap/Redux';

import * as routes from "app/config/sceneKeys";
import * as styles from 'app/config/style';


import NavBar from "app/components/NavBar";
// import * as contentful from 'contentful'
// const contentful = require('contentful')


// Redux
import Index from 'app/views/Index';
import Categories from 'app/views/Categories';
import Articles from 'app/views/Articles';

// END Redux



export default class App extends Component {

    render() {

        // For network debug
        GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

        return (
            <ReduxContainer>
                <Router sceneStyle={{ backgroundColor: styles.COLOR_1 }}>
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
                            initial
                        />
                        <Scene
                            key={routes.ARTICLES.key}
                            title={routes.ARTICLES.title}
                            component={Articles}
                            hideNavBar={true}

                        />

                    </Stack>
                </Router>
            </ReduxContainer>
        );
    }
}