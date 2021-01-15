import { createActions } from 'redux-actions';
import MapService from '../../../../helpers/MapService';
import FeatureActions from '../../../../helpers/FeatureActions';
import metaCreator from '../../../../helpers/metaCreator';
import { createRootDispatchContext } from '../../../../helpers/middleware/DispatchContext';

const zoomoutPayloadCreator = (
    dispatchContext = createRootDispatchContext(),
) => async (dispatch, getState, done) => {
    const {
        mapData: { zoomLevel },
    } = getState();
    const nextZoomLevel = zoomLevel - 1;
    dispatch(FeatureActions().setZoomLevel(nextZoomLevel));
    const dcZoomout = dispatchContext.fork(FeatureActions().zoomout);
    dispatch(FeatureActions().writeGeoInfo(dcZoomout));
    MapService.handleCommand(commands.zoomout({ zoomLevel: nextZoomLevel }));
    done();
};

const actions = createActions({
    ZOOMOUT: [zoomoutPayloadCreator, metaCreator],
});

const commands = createActions({
    ZOOMOUT: undefined,
});

export default actions;
