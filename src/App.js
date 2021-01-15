import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, View, Image } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { connect } from "react-redux";
import Toast from "react-native-easy-toast";
import splashSource from "./assets/images/splash.png";
import FeatureActions from "./helpers/FeatureActions";
import InProgressIndicatorContainer from "./features/launch/containers/InProgressIndicatorContainer";
import NavigationService from "./navigation/NavigationService";
import AppContainer from "./navigation/AppContainer";
import ToastService from "./helpers/ToastService";
import { errorType } from "./helpers/propTypes";

class App extends Component {
    static propTypes = {
        error: errorType,
        isInProgress: PropTypes.bool.isRequired,
        isResourcesReady: PropTypes.bool.isRequired,
        isLoadingComplete: PropTypes.bool.isRequired,
        clearError: PropTypes.func.isRequired,
        launch: PropTypes.func.isRequired,
    };

    static defaultProps = {
        error: null,
    };

    constructor(...args) {
        super(...args);
        SplashScreen.preventAutoHideAsync();
    }

    componentDidMount = () => {
        const { launch } = this.props;
        launch();
    };

    componentDidUpdate(prevProps) {
        const {
            isLoadingComplete: prevIsLoadingComplete,
            error: prevError,
        } = prevProps;
        const { isLoadingComplete, launch, error, clearError } = this.props;
        if (prevIsLoadingComplete && !isLoadingComplete) {
            launch();
        }
        if (!prevError && error) {
            ToastService.show(error.message, 3000);
            clearError();
        }
    }

    renderInProgressIndicator() {
        const { isInProgress } = this.props;
        if (!isInProgress) {
            return null;
        }
        return <InProgressIndicatorContainer />;
    }

    render() {
        const { isResourcesReady, isLoadingComplete } = this.props;
        if (!isResourcesReady) {
            return null;
        }

        return (
            <View style={styles.container}>
                {this.renderInProgressIndicator()}
                <Toast ref={ToastService.setToast} />
                {!isLoadingComplete ? (
                    <Image
                        style={{
                            flex: 1,
                            resizeMode: "stretch",
                            width: undefined,
                            height: undefined,
                        }}
                        source={splashSource}
                        onLoadEnd={() => {
                            SplashScreen.hideAsync();
                        }}
                        fadeDuration={0}
                    />
                ) : (
                    <AppContainer
                        ref={NavigationService.setTopLevelNavigator}
                    />
                )}
            </View>
        );
    }
}

const mapState = (state) => {
    const {
        error,
        isInProgress,
        isResourcesReady,
        isLoadingComplete,
    } = state.systemData;
    return {
        error,
        isInProgress,
        isResourcesReady,
        isLoadingComplete,
    };
};

const mapDispatch = (dispatch) => {
    return {
        launch: () => {
            dispatch(FeatureActions().launch());
        },
        clearError: () => {
            dispatch(FeatureActions().setError(null));
        },
    };
};

export default connect(mapState, mapDispatch)(App);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
