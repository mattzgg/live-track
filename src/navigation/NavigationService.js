import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}

function navigate(routeName, params) {
    navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}

function goBack(key) {
    navigator.dispatch(NavigationActions.back(key));
}

export default {
    setTopLevelNavigator,
    navigate,
    goBack,
};
