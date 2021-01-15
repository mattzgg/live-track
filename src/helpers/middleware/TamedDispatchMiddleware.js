import { createRootDispatchContext } from './DispatchContext';
import FeatureActions from '../FeatureActions';

const contextStack = [];
let stateSnapshot = null;
export function getStateSnapshot() {
    return stateSnapshot;
}

function getTopContext() {
    const index = contextStack.length - 1;
    return index >= 0 ? contextStack[index] : null;
}

function isTop(context) {
    return (
        contextStack.length > 0 &&
        contextStack.indexOf(context) === contextStack.length - 1
    );
}

function resetContextStack() {
    contextStack.length = 0;
}

function createTamedDispatchMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        const { payload, meta = { dispatchContext: null } } = action;
        if (typeof payload === 'function') {
            let { dispatchContext: context } = meta;
            if (!context) {
                context = createRootDispatchContext();
            }

            let currentContext = getTopContext();
            if (!currentContext) {
                stateSnapshot = getState();
                dispatch(FeatureActions().setIsInProgress(true));
            }
            if (currentContext !== context) {
                contextStack.push(context);
                currentContext = context;
            }

            const shouldRun = currentContext.addAction(action);
            if (shouldRun) {
                const done = error => {
                    if (error) {
                        resetContextStack();
                        dispatch(FeatureActions().setIsInProgress(false));
                        dispatch(FeatureActions().setInProgressMessage(''));
                        dispatch(FeatureActions().setError(error));
                        dispatch(FeatureActions().rollbackOnError());
                        stateSnapshot = null;
                        return;
                    }

                    if (!isTop(currentContext)) {
                        return;
                    }

                    const scheduleNext = () => {
                        const nextAction = currentContext.scheduleNext();
                        if (nextAction) {
                            dispatch(nextAction);
                        } else {
                            contextStack.pop();
                            if (contextStack.length === 0) {
                                dispatch(
                                    FeatureActions().setIsInProgress(false),
                                );
                                dispatch(
                                    FeatureActions().setInProgressMessage(''),
                                );
                            } else {
                                currentContext = getTopContext();
                                scheduleNext();
                            }
                        }
                    };
                    scheduleNext();
                };
                payload(dispatch, getState, done, extraArgument);
            }
        } else {
            next(action);
        }
    };
}

const tamedDispatch = createTamedDispatchMiddleware();
tamedDispatch.withExtraArgument = createTamedDispatchMiddleware;

export default tamedDispatch;
