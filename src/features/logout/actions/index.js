import { AsyncStorage } from 'react-native';
import { createActions } from 'redux-actions';
import FeatureActions from '../../../helpers/FeatureActions';
import metaCreator from '../../../helpers/metaCreator';

const createLogoutPayloadCreator = () => async (dispatch, getState, done) => {
    await AsyncStorage.removeItem('loginSession');
    dispatch(FeatureActions().setIsLoadingComplete(false));
    done();
};

const actions = createActions({
    LOGOUT: [createLogoutPayloadCreator, metaCreator],
});

export default actions;
