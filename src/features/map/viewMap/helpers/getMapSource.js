import { Asset } from "expo-asset";
import { Platform } from "react-native";
import mapSource from "../../../../assets/map/tianditu.html";

const ANDROID_LOCAL_ASSET_SCHEME = "asset:///";

export default function getMapSource() {
    let { localUri: uri } = Asset.fromModule(mapSource);
    if (
        uri &&
        Platform.OS === "android" &&
        uri.startsWith(ANDROID_LOCAL_ASSET_SCHEME)
    ) {
        uri = `file:///android_asset/${uri.substr(
            ANDROID_LOCAL_ASSET_SCHEME.length
        )}`;
    }

    return { uri };
}
