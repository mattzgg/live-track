import React, { Component } from 'react';
import { View } from 'react-native';
import ScreenSwitcher from './ScreenSwitcher';

export default class PatrollingTasksHeader extends Component {
    render() {
        return (
            <View>
                <ScreenSwitcher />
            </View>
        );
    }
}
