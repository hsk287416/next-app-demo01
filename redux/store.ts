import { createStore, applyMiddleware } from 'redux';
import commonReducer, { CommonState, initialState } from './reducer';
import { composeWithDevTools } from "redux-devtools-extension";

export const initializeStore = (state: CommonState = initialState) => {
    return createStore(
        commonReducer,
        state,
        composeWithDevTools(applyMiddleware())
    )
}