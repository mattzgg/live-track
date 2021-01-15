import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import MapService from '../../../../helpers/MapService';
import NavigationService from '../../../../navigation/NavigationService';
import createMapOverlay from '../../../map/viewMap/components/createMapOverlay';
import MapContainer from '../../../map/viewMap/containers/MapContainer';
import MapControlsContainer from '../../../map/viewMap/containers/MapControlsContainer';
import GoBackButton from './GoBackButton';

const overlayStyles = StyleSheet.create({
    mapControlsOverlay: {
        bottom: 10,
        right: 10,
    },
    goBackButtonOverlay: {
        top: 10,
        left: 10,
    },
});

const MapControlsOverlay = createMapOverlay(overlayStyles.mapControlsOverlay)(
    MapControlsContainer,
);

const GoBackButtonOverlay = createMapOverlay(overlayStyles.goBackButtonOverlay)(
    GoBackButton,
);

export default class PatrollingTaskScreen extends Component {
    static navigationOptions = {
        header: null,
    };

    mapRef = React.createRef();

    componentDidMount() {
        this.empowerMapService();
    }

    empowerMapService = () => {
        MapService.setMap(this.mapRef.current);
    };

    handleClickGoBackButton = () => {
        NavigationService.goBack();
    };

    render() {
        return (
            <View style={styles.container}>
                <NavigationEvents onDidFocus={this.empowerMapService} />
                <MapContainer ref={this.mapRef}>
                    <MapControlsOverlay />
                    <GoBackButtonOverlay
                        onPress={this.handleClickGoBackButton}
                    />
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
