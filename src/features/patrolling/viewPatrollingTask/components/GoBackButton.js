import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image } from 'react-native';
import goBackSource from '../../../../assets/images/navigation/go_back.png';

export default class GoBackButton extends Component {
    static propTypes = {
        onPress: PropTypes.func.isRequired,
    };

    render() {
        const { onPress } = this.props;
        return (
            <View>
                <TouchableOpacity onPress={onPress}>
                    <Image source={goBackSource} />
                </TouchableOpacity>
            </View>
        );
    }
}
