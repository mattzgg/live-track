import { createRootDispatchContext } from './middleware/DispatchContext';

export default (dispatchContext = createRootDispatchContext()) => {
    return {
        dispatchContext,
    };
};
