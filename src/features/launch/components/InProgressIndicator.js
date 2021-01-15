import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

export default class InProgressIndicator extends Component {
    static propTypes = {
        message: PropTypes.string.isRequired,
    };

    renderMessage() {
        const { message } = this.props;
        if (!message) {
            return null;
        }

        return (
            <View style={styles.messageContainer}>
                <Text style={styles.message}>{message}</Text>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>
                {this.renderMessage()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 999,
    },
    activityIndicatorContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    messageContainer: {
        backgroundColor: '#006400',
    },
    message: {
        alignSelf: 'center',
        color: '#FFFFFF',
        padding: 5,
    },
});
