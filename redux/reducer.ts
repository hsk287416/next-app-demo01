import { Reducer, AnyAction } from "redux";
import * as commonActions from './action';

export type CommonState = {
    name: string
}

export const initialState: CommonState = {
    name: ''
}

const commonReducer: Reducer<CommonState, AnyAction> = (state: CommonState = initialState, action: AnyAction) => {
    const newState = JSON.parse(JSON.stringify(state)) as CommonState;
    const { type, payload } = action;
    switch (type) {
        case commonActions.CHANGE_NAME:
            newState.name = payload;
            break;
        default:
            break;
    }
    return newState;
}

export default commonReducer;