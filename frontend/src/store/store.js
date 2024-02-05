import { createStore, compose, applyMiddleware } from 'redux';
// thunk for async requests
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers/rootReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// create the store to store the states of my reducers
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);