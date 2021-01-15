import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import displayModeGrid from '../../../../assets/images/patrollingManagement/display_mode_grid.png';

export default class DisplayModeToggleButton extends Component {
    render() {
        return (
            <TouchableOpacity>
                <Image source={displayModeGrid} />
            </TouchableOpacity>
        );
    }
}
