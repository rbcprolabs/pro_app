import React, { Component } from 'react';

import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore,
  compose
} from "redux";
import thunk from 'redux-thunk';
import reducers from 'app/redux/reducers';


const createStoreFunction = (initialState = undefined) => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(
      thunk
    ))
  )
}

const store = createStoreFunction();

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    );
  }
};