import { AsyncStorage } from "react-native";
import { createActions } from "redux-actions";
import { Updates } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as Icon from "@expo/vector-icons";
import DeviceInfo from "react-native-device-info";
import robotDev from "../../../assets/images/robot-dev.png";
import robotProd from "../../../assets/images/robot-prod.png";
import splashSource from "../../../assets/images/splash.png";
import tiandituSource from "../../../assets/map/tianditu.html";
import spaceMono from "../../../assets/fonts/SpaceMono-Regular.ttf";
import FeatureActions from "../../../helpers/FeatureActions";
import metaCreator from "../../../helpers/metaCreator";
import { createRootDispatchContext } from "../../../helpers/middleware/DispatchContext";

const loadResourcesPayloadCreator = () => async (dispatch, getState, done) => {
    await Asset.loadAsync([robotDev, robotProd]);
    await Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": spaceMono,
    });
    await Asset.fromModule(splashSource).downloadAsync();
    done();
};

const loadLoginSessionPayloadCreator = () => async (
    dispatch,
    getState,
    done
) => {
    const loginSession = await AsyncStorage.getItem("loginSession");
    const loginSessionJson = JSON.parse(loginSession);
    const { user } = loginSessionJson || { user: null };
    dispatch(FeatureActions().setUser(user));
    done();
};

const getMacAddressPayloadCreator = () => async (dispatch, getState, done) => {
    const macAddress = await DeviceInfo.getMACAddress();
    dispatch(FeatureActions().setMacAddress(macAddress));
    done();
};

const readGeoInfoPayloadCreator = () => async (dispatch, getState, done) => {
    const geoInfo = await AsyncStorage.getItem("geoInfo");
    const geoInfoJson = JSON.parse(geoInfo);
    if (geoInfoJson) {
        const { currentPosition, zoomLevel } = geoInfoJson;
        dispatch(FeatureActions().setCurrentPosition(currentPosition));
        dispatch(FeatureActions().setZoomLevel(zoomLevel));
    }
    done();
};

const writeGeoInfoPayloadCreator = () => async (dispatch, getState, done) => {
    const {
        mapData: { currentPosition, zoomLevel },
    } = getState();
    const geoInfoJson = {
        currentPosition,
        zoomLevel,
    };
    const geoInfo = JSON.stringify(geoInfoJson);
    await AsyncStorage.setItem("geoInfo", geoInfo);
    done();
};

const loadMapDataPayloadCreator = (
    dispatchContext = createRootDispatchContext()
) => async (dispatch, getState, done) => {
    const dcLoadMapData = dispatchContext.fork(FeatureActions().loadMapData);
    dispatch(FeatureActions().readGeoInfo(dcLoadMapData));

    dispatch(
        dcLoadMapData.join((dcJoin) => {
            const { currentPosition } = getState().mapData;
            if (!currentPosition) {
                dispatch(FeatureActions().centerAndZoom(dcJoin));
            }
        })
    );
    done();
};

const launchPayloadCreator = (
    dispatchContext = createRootDispatchContext()
) => async (dispatch, getState, done) => {
    const dcLaunch = dispatchContext.fork(FeatureActions().launch);
    dispatch(FeatureActions().loadResources(dcLaunch));
    dispatch(
        dcLaunch.join(async () => {
            dispatch(FeatureActions().setIsResourcesReady(true));
            if (!__DEV__) {
                const { isAvailable } = await Updates.checkForUpdateAsync();
                if (isAvailable) {
                    await Updates.fetchUpdateAsync({
                        eventListener: (event) => {
                            switch (event.type) {
                                case Updates.EventType.DOWNLOAD_STARTED:
                                    dispatch(
                                        FeatureActions().setInProgressMessage(
                                            "发现新版本，开始下载应用更新文件"
                                        )
                                    );
                                    break;
                                case Updates.EventType.DOWNLOAD_FINISHED:
                                    dispatch(
                                        FeatureActions().setInProgressMessage(
                                            "应用更新文件下载完毕"
                                        )
                                    );
                                    break;
                                default:
                                    break;
                            }
                        },
                    });
                    dispatch(
                        FeatureActions().setInProgressMessage("开始更新应用")
                    );
                    Updates.reloadFromCache();
                }
            }
        })
    );
    dispatch(
        dcLaunch.join(async () => {
            dispatch(FeatureActions().setInProgressMessage("正在下载地图页面"));
            await Asset.fromModule(tiandituSource).downloadAsync();
        })
    );
    dispatch(
        dcLaunch.join(() => {
            dispatch(FeatureActions().setInProgressMessage("正在获取MAC地址"));
            dispatch(FeatureActions().getMacAddress(dcLaunch));
        })
    );
    dispatch(FeatureActions().loadMapData(dcLaunch));
    dispatch(FeatureActions().loadLoginSession(dcLaunch));
    dispatch(
        dcLaunch.join(() => {
            dispatch(FeatureActions().setIsLoadingComplete(true));
        })
    );
    done();
};

const actions = createActions({
    SET_ERROR: undefined,
    SET_IS_IN_PROGRESS: undefined,
    SET_IN_PROGRESS_MESSAGE: undefined,
    SET_IS_RESOURCES_READY: undefined,
    SET_IS_LOADING_COMPLETE: undefined,
    LOAD_RESOURCES: [loadResourcesPayloadCreator, metaCreator],
    GET_MAC_ADDRESS: [getMacAddressPayloadCreator, metaCreator],
    SET_MAC_ADDRESS: undefined,
    LOAD_LOGIN_SESSION: [loadLoginSessionPayloadCreator, metaCreator],
    READ_GEO_INFO: [readGeoInfoPayloadCreator, metaCreator],
    WRITE_GEO_INFO: [writeGeoInfoPayloadCreator, metaCreator],
    LOAD_MAP_DATA: [loadMapDataPayloadCreator, metaCreator],
    LAUNCH: [launchPayloadCreator, metaCreator],
});

export default actions;
