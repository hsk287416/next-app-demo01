import { take, all, takeEvery, put } from 'redux-saga/effects';
import * as commonActions from './action';
import axios, { AxiosResponse } from 'axios';

export default function* takeRequest() {
    yield all([
        takeEvery(commonActions.LOGOUT, logout)
    ])
}

function* logout() {
    const resp: AxiosResponse<any> = yield axios.get('/logout');
    if (resp.status === 200) {
        yield put(commonActions.changeUserInfoAction(null));
    } else {
        console.error('logout error');
    }
}