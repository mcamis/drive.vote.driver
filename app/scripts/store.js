import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk'
import logger from 'redux-logger'


import rootReducer from './reducers/rootReducer';

const loggerMiddleware = logger()
const defaultState = {
    rosters: {}
};
const enhancers = compose(
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        applyMiddleware(loggerMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);
export const history = syncHistoryWithStore(browserHistory, store);

export default store;
