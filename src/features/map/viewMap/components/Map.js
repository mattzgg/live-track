import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import getMapSource from '../helpers/getMapSource';

export default class Map extends Component {
    static propTypes = {
        handleMessageFromMap: PropTypes.func.isRequired,
    };

    mapWebViewRef = React.createRef();

    getMapWebView() {
        return this.mapWebViewRef.current;
    }

    handleMessageFromMap = event => {
        const { handleMessageFromMap } = this.props;
        const { data: message } = event.nativeEvent;
        handleMessageFromMap(message);
    };

    handleCommand = command => {
        const message = JSON.stringify(command);
        this.getMapWebView().postMessage(message);
    };

    render() {
        const mapSource = getMapSource();
        const { children } = this.props; // eslint-disable-line
        return (
            <View style={styles.container}>
                <WebView
                    ref={this.mapWebViewRef}
                    source={mapSource}
                    style={styles.mapWebView}
                    onMessage={this.handleMessageFromMap}
                    allowFileAccess
                />
                {children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    mapWebView: {
        flex: 1,
    },
});
