import { handleActions } from 'redux-actions';
import reduceStateForBool from '../../../helpers/reduceStateForBool';
import actions from '../actions';

const reducer = handleActions(
    {
        [actions.setError]: (state, { payload }) => {
            return {
                ...state,
                error: payload,
            };
        },
        [actions.setIsInProgress]: (state, { payload }) => {
            return reduceStateForBool(state, 'isInProgress', payload);
        },
        [actions.setIsResourcesReady]: (state, { payload }) => {
            return reduceStateForBool(state, 'isResourcesReady', payload);
        },
        [actions.setIsLoadingComplete]: (state, { payload }) => {
            return reduceStateForBool(state, 'isLoadingComplete', payload);
        },
        [actions.setMacAddress]: (state, { payload }) => {
            return {
                ...state,
                macAddress: payload,
            };
        },
        [actions.setInProgressMessage]: (state, { payload }) => {
            return {
                ...state,
                inProgressMessage: payload,
            };
        },
    },
    {
        error: null,
        isInProgress: false,
        inProgressMessage: '',
        isResourcesReady: false,
        isLoadingComplete: false,
        macAddress: '',
    },
);

export default reducer;
