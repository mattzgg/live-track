import { combineReducers } from 'redux';
import systemData from '../features/launch/reducers';
import authData from '../features/login/reducers';
import mapData from '../features/map/viewMap/reducers';

export default combineReducers({
    systemData,
    authData,
    mapData,
});
