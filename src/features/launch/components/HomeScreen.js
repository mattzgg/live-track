import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <WebView
                    style={styles.webContainer}
                    source={{ uri: 'file:///android_asset/lzzweb/index.html' }}
                    allowUniversalAccessFromFileURLs
                    allowFileAccess
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webContainer: {
        flex: 1,
    },
});
