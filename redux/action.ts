import { IUserInfo } from "../types/user-info.interface";

export const CHANGE_USER_INFO = 'CHANGE_USER_INFO';
export const CHANGE_NAME = 'CHANGE_NAME';
export const LOGOUT = 'LOGOUT';

export const changeUserInfoAction = (userInfo: IUserInfo | null) => {
    return {
        type: CHANGE_USER_INFO,
        payload: userInfo
    }
}

export const logoutAction = () => {
    return {
        type: LOGOUT
    }
}

export const changeNameAction = (userName: string) => {
    return {
        type: CHANGE_NAME,
        payload: userName
    }
}