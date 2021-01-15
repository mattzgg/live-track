import { handleActions } from 'redux-actions';
import actions from '../actions';

const reducers = handleActions(
    {
        [actions.setIsLocationPermissionGranted]: (state, { payload }) => {
            return {
                ...state,
                isLocationPermissionGranted: payload,
            };
        },
        [actions.setCurrentPosition]: (state, { payload }) => {
            return {
                ...state,
                currentPosition: payload,
            };
        },
        [actions.setZoomLevel]: (state, { payload }) => {
            return {
                ...state,
                zoomLevel: payload,
            };
        },
    },
    {
        isLocationPermissionGranted: false,
        currentPosition: null,
        zoomLevel: 12,
    },
);

export default reducers;
