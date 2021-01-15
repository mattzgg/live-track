import { createActions } from "redux-actions";
import * as Permissions from "expo-permissions";
import MapService from "../../../../helpers/MapService";
import FeatureActions from "../../../../helpers/FeatureActions";
import metaCreator from "../../../../helpers/metaCreator";
import { createRootDispatchContext } from "../../../../helpers/middleware/DispatchContext";
import getCurrentPosition from "../helpers/getCurrentPosition";

const centerAndZoomPayloadCreator = (
    dispatchContext = createRootDispatchContext(),
    isStateSkipped = true
) => async (dispatch, getState, done) => {
    const dcCenterAndZoom = dispatchContext.fork(
        FeatureActions().centerAndZoom
    );
    const { mapData } = getState();
    const { zoomLevel } = mapData;
    let { isLocationPermissionGranted, currentPosition } = mapData;

    if (!isLocationPermissionGranted) {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        isLocationPermissionGranted = status === "granted";
        dispatch(
            FeatureActions().setIsLocationPermissionGranted(
                isLocationPermissionGranted
            )
        );
    }

    if (isStateSkipped && isLocationPermissionGranted) {
        try {
            currentPosition = await getCurrentPosition();
        } catch (error) {
            done(error);
        }
        dispatch(FeatureActions().setCurrentPosition(currentPosition));
        dispatch(FeatureActions().writeGeoInfo(dcCenterAndZoom));
    }
    if (currentPosition) {
        MapService.handleCommand(
            commands.centerAndZoom({
                currentPosition,
                zoomLevel,
            })
        );
    }
    done();
};

const actions = createActions({
    CENTER_AND_ZOOM: [centerAndZoomPayloadCreator, metaCreator],
    SET_IS_LOCATION_PERMISSION_GRANTED: undefined,
    SET_CURRENT_POSITION: undefined,
    SET_ZOOM_LEVEL: undefined,
});

const commands = createActions({
    CENTER_AND_ZOOM: undefined,
});

export default actions;
