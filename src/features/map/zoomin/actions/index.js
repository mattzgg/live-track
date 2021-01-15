import { createActions } from 'redux-actions';
import MapService from '../../../../helpers/MapService';
import FeatureActions from '../../../../helpers/FeatureActions';
import metaCreator from '../../../../helpers/metaCreator';
import { createRootDispatchContext } from '../../../../helpers/middleware/DispatchContext';

const zoominPayloadCreator = (
    dispatchContext = createRootDispatchContext(),
) => async (dispatch, getState, done) => {
    const {
        mapData: { zoomLevel },
    } = getState();
    const nextZoomLevel = zoomLevel + 1;
    dispatch(FeatureActions().setZoomLevel(nextZoomLevel));
    const dcZoomin = dispatchContext.fork(FeatureActions.zoomin);
    dispatch(FeatureActions().writeGeoInfo(dcZoomin));
    MapService.handleCommand(commands.zoomin({ zoomLevel: nextZoomLevel }));
    done();
};

const actions = createActions({
    ZOOMIN: [zoominPayloadCreator, metaCreator],
});

const commands = createActions({
    ZOOMIN: undefined,
});

export default actions;
