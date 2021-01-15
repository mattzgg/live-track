import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import zoominSource from '../../../../assets/images/map/zoomin.png';
import zoomoutSource from '../../../../assets/images/map/zoomout.png';
import centerAndZoomSource from '../../../../assets/images/map/center_and_zoom.png';
import MapControl from './MapControl';

export default class MapControls extends Component {
    static propTypes = {
        zoomin: PropTypes.func.isRequired,
        zoomout: PropTypes.func.isRequired,
        centerAndZoom: PropTypes.func.isRequired,
    };

    render() {
        const { zoomin, zoomout, centerAndZoom } = this.props;

        return (
            <View style={styles.container}>
                <View>
                    <MapControl source={zoominSource} onPress={zoomin} />
                </View>
                <View>
                    <MapControl source={zoomoutSource} onPress={zoomout} />
                </View>
                <View style={styles.locateCurrentPositionContainer}>
                    <MapControl
                        source={centerAndZoomSource}
                        onPress={centerAndZoom}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {},
    locateCurrentPositionContainer: {
        marginTop: 10,
    },
});
