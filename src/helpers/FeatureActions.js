import { createAction } from 'redux-actions';
import launchActions from '../features/launch/actions';
import loginActions from '../features/login/actions';
import logoutActions from '../features/logout/actions';
import mapViewMapActions from '../features/map/viewMap/actions';
import mapZoominActions from '../features/map/zoomin/actions';
import mapZoomoutActions from '../features/map/zoomout/actions';

let cache = null;

export default function get() {
    if (!cache) {
        cache = {
            ...launchActions,
            ...loginActions,
            ...logoutActions,
            ...mapViewMapActions,
            ...mapZoominActions,
            ...mapZoomoutActions,
            rollbackOnError: createAction('ROLLBACK_ON_ERROR'),
        };
    }

    return cache;
}
