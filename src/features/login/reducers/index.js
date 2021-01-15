import { handleActions } from 'redux-actions';
import { createDefaultAuthData } from '../../../helpers/DefaultDataFactory';
import actions from '../actions';

const reducers = handleActions(
    {
        [actions.loginForm.changeAccount]: (state, { payload }) => ({
            ...state,
            account: payload,
        }),
        [actions.loginForm.changePassword]: (state, { payload }) => ({
            ...state,
            password: payload,
        }),
        [actions.setUser]: (state, { payload }) => {
            return {
                ...state,
                user: payload,
            };
        },
    },
    createDefaultAuthData(),
);

export default reducers;
