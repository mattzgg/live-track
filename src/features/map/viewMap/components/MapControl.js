import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default class MapControl extends Component {
    static propTypes = {
        source: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    render() {
        const { source, onPress } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <Image source={source} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: '#6c6c6c',
        backgroundColor: '#ffffff',
    },
});
