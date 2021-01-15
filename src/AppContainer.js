import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import tamedDispatch, {
    getStateSnapshot,
} from './helpers/middleware/TamedDispatchMiddleware';
import appReducer from './reducers';
import App from './App';

const rootReducer = (state, action) => {
    if (action.type === 'ROLLBACK_ON_ERROR') {
        return appReducer(getStateSnapshot(), action);
    }
    return appReducer(state, action);
};
const store = createStore(rootReducer, applyMiddleware(tamedDispatch));

export default class AppContainer extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}
