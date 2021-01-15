import { AsyncStorage } from 'react-native';
import { createActions } from 'redux-actions';
import axios from 'axios';
import qs from 'qs';
import AppError from '../../../helpers/AppError';
import metaCreator from '../../../helpers/metaCreator';
import NavigationService from '../../../navigation/NavigationService';

const loginPayloadCreator = (dispatchContext, account, password) => async (
    dispatch,
    getState,
    done,
) => {
    const { macAddress: appid } = getState().systemData;
    const {
        data: { Code: code, Data: data, ErrorMsg: message },
    } = await axios.post(
        'http://47.110.80.118:8000/Server/APPServer/Login.ashx?action=login',
        qs.stringify({
            account,
            password,
            appid,
        }),
    );
    if (code === '200') {
        const { userId: id, userRealName: realName } = data;
        const user = { id, realName };

        const loginSessionJson = { user };
        const loginSession = JSON.stringify(loginSessionJson);
        await AsyncStorage.setItem('loginSession', loginSession);

        dispatch(actions.setUser(user));
        NavigationService.navigate('App');
        done();
    } else {
        done(new AppError(code, message));
    }
};

const actions = createActions({
    LOGIN_FORM: {
        CHANGE_ACCOUNT: undefined,
        CHANGE_PASSWORD: undefined,
    },
    LOGIN: [loginPayloadCreator, metaCreator],
    SET_USER: undefined,
});

export default actions;
