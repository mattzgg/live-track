import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import MapService from '../../../../helpers/MapService';
import createMapOverlay from '../../../map/viewMap/components/createMapOverlay';
import MapContainer from '../../../map/viewMap/containers/MapContainer';
import MapControlsContainer from '../../../map/viewMap/containers/MapControlsContainer';
import PatrollingTaskMarkerDetailContainer from '../containers/PatrollingTaskMarkerDetailContainer';
import PatrollingTasksHeader from './PatrollingTasksHeader';

const overlayStyles = StyleSheet.create({
    mapControlsOverlay: {
        bottom: 120,
        right: 10,
    },
    patrollingTaskMarkerDetailOverlay: {
        left: 10,
        bottom: 10,
        right: 10,
        height: 100,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
});

const MapControlsOverlay = createMapOverlay(overlayStyles.mapControlsOverlay)(
    MapControlsContainer,
);

const PatrollingTaskMarkerDetailOverlay = createMapOverlay(
    overlayStyles.patrollingTaskMarkerDetailOverlay,
)(PatrollingTaskMarkerDetailContainer);

export default class PatrollingTasksOnMapScreen extends Component {
    static navigationOptions = {
        header: <PatrollingTasksHeader />,
    };

    mapRef = React.createRef();

    componentDidMount() {
        this.empowerMapService();
    }

    empowerMapService = () => {
        MapService.setMap(this.mapRef.current);
    };

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={this.empowerMapService} />
                <MapContainer ref={this.mapRef}>
                    <MapControlsOverlay />
                    <PatrollingTaskMarkerDetailOverlay />
                </MapContainer>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
