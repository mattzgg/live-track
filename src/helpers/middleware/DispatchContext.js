import { createAction } from 'redux-actions';
import metaCreator from '../metaCreator';

export default class DispatchContext {
    constructor(name) {
        this.name = name;
        this.current = null;
        this.queue = [];
    }

    addAction(action) {
        if (!this.current) {
            this.current = action;
            return true; // need to run this action
        }

        this.queue.push(action);
        return false;
    }

    scheduleNext() {
        this.current = null;

        if (this.queue.length > 0) {
            return this.queue.shift();
        }

        return null;
    }

    fork(name) {
        return new DispatchContext(`${this.name}/${String(name)}`); // name can be an action creator by using string coercion
    }

    join(payload) {
        const joinActionCreator = createAction(
            `@@JOIN_${this.name}@@`,
            dispatchContext => async (dispatch, getState, done) => {
                if (typeof payload === 'function') {
                    const dcFork = dispatchContext.fork('@@JOIN@@');
                    await payload(dcFork);
                }
                done();
            },
            metaCreator,
        );
        return joinActionCreator(this);
    }
}

export function createRootDispatchContext() {
    return new DispatchContext('@@ROOT_DISPATCH_CONTEXT@@');
}
