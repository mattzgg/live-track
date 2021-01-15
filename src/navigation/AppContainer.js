import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthLoadingScreenContainer from '../features/login/containers/AuthLoadingScreenContainer';
import LoginScreenContainer from '../features/login/containers/LoginScreenContainer';
import AppNavigator from './AppNavigator';

export default createAppContainer(
    createSwitchNavigator({
        AuthLoading: AuthLoadingScreenContainer,
        Auth: LoginScreenContainer,
        App: AppNavigator,
    }),
    {
        initialRouteName: 'AuthLoading',
    },
);
