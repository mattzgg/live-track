import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import enterSource from '../../../../assets/images/patrollingManagement/enter.png';

export default class PatrollingTaskMarkerDetail extends Component {
    static propTypes = {
        onEnter: PropTypes.func.isRequired,
    };

    render() {
        const { onEnter } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.enterButton} onPress={onEnter}>
                    <Image source={enterSource} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    enterButton: {
        alignSelf: 'flex-end',
    },
});
