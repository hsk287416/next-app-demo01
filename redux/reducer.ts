import { Reducer, AnyAction } from "redux";
import * as commonActions from './action';
import { IUserInfo } from "../types/user-info.interface";

export type CommonState = {
    userInfo: IUserInfo | null;
    userName: string;
}

export const initialState: CommonState = {
    userInfo: null,
    userName: '',
}

const commonReducer: Reducer<CommonState, AnyAction> = (state: CommonState = initialState, action: AnyAction) => {
    const newState = JSON.parse(JSON.stringify(state)) as CommonState;
    const { type, payload } = action;
    switch (type) {
        case commonActions.CHANGE_USER_INFO:
            newState.userInfo = payload;
            break;
        case commonActions.CHANGE_NAME:
            newState.userName = payload;
            break;
        default:
            break;
    }
    return newState;
}

export default commonReducer;