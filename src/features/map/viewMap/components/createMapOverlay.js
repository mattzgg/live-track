import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function createMapOverlay(style) {
    return Component => props => {
        return (
            <View style={[styles.overlay, { ...style }]}>
                <Component {...props} />
            </View>
        );
    };
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
    },
});
