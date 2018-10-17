import React, { Component } from 'react';
import { Dimensions } from "react-native";
import {
    Scene,
    Stack,
    Router,
} from 'react-native-router-flux';

import axios from 'axios';

import ReduxContainer from 'app/bootstrap/Redux';

import { apiUrl, apiKey } from 'app/config/api'

import * as routes from "app/config/sceneKeys";

import NavBar from "app/components/NavBar";

// Redux
import Index from 'app/views/Index';

// END Redux



export default class App extends Component {

    render() {
        // const width = Dimensions.get('screen').width * .8;
        // For network debug
        GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

        // axios.create({
        //     timeout: 4000
        // });
        // axios.defaults.baseURL = apiUrl;
        // axios.defaults.headers.apiKey = apiKey;
        // axios.defaults.method = 'post';

        return (
            <ReduxContainer>
                <Router sceneStyle={{ backgroundColor: "#000" }}> 
                            <Stack key="root">
                                <Scene
                                    key={routes.INDEX.key}
                                    title={routes.INDEX.title}
                                    component={Index}
                                    navBar={NavBar}
                                    initial
                                />

                            </Stack>
                </Router>
            </ReduxContainer>
        );
    }
}