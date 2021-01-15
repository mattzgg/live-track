import { connect } from 'react-redux';
import { createOperateMapError } from '../../../../helpers/AppErrorFactory';
import FeatureActions from '../../../../helpers/FeatureActions';
import { createRootDispatchContext } from '../../../../helpers/middleware/DispatchContext';
import Map from '../components/Map';

const ROOT_DISPATCH_CONTEXT_REQUIRED_ACTIONS = [
    String(FeatureActions().centerAndZoom),
];

function isRootDispatchContextRequired(actionCreator) {
    const type = String(actionCreator);
    return ROOT_DISPATCH_CONTEXT_REQUIRED_ACTIONS.indexOf(type) !== -1;
}

const mapDispatch = dispatch => {
    return {
        handleMessageFromMap: message => {
            let messageJson = JSON.parse(message);
            const { type, params = [] } = messageJson;
            if (type === 'setError') {
                const [{ message: errorMessage }] = params;
                const cause = new Error(errorMessage);
                messageJson = {
                    ...messageJson,
                    params: [createOperateMapError(cause)],
                };
            }
            const actionCreator = FeatureActions()[type];
            if (typeof actionCreator === 'function') {
                const { params: messageParams = [] } = messageJson;
                if (isRootDispatchContextRequired(actionCreator)) {
                    messageParams.unshift(createRootDispatchContext());
                }
                const action = actionCreator(...messageParams);
                dispatch(action);
            }
        },
    };
};

export default connect(
    null,
    mapDispatch,
    null,
    {
        forwardRef: true,
    },
)(Map);
