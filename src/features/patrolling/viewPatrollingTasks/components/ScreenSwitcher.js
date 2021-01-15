import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import DisplayModeToggleButton from './DisplayModeToggleButton';

export default class ScreenSwitcher extends Component {
    render() {
        const buttons = ['巡查林班', '巡查记录'];
        return (
            <View style={styles.container}>
                <ButtonGroup
                    containerStyle={styles.buttonGroup}
                    buttons={buttons}
                    selectedIndex={0}
                />
                <DisplayModeToggleButton />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
    },
    buttonGroup: {
        flex: 1,
    },
});
