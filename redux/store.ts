import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import commonReducer, { CommonState, initialState } from './reducer';
import createSagaMiddleware from 'redux-saga'
import saga from './saga';

const isServer = typeof window === 'undefined';

const sagaMiddleware = createSagaMiddleware();

let composeEnhancers = compose;
if (!isServer) {
    const win: any = window;
    composeEnhancers = win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? win.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;
}

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

export const initializeStore = (state: CommonState = initialState) => {
    const store = createStore(
        commonReducer,
        state,
        enhancer
    );
    sagaMiddleware.run(saga);
    return store;
}