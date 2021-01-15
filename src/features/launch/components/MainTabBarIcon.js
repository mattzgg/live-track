import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { mainTabBarIconNameType } from '../helpers/propTypes';
import getMainTabBarIconSource from '../helpers/getMainTabBarIconSource';

export default class MainTabBarIcon extends React.Component {
    static propTypes = {
        name: mainTabBarIconNameType.isRequired,
        focused: PropTypes.bool.isRequired,
    };

    render() {
        const { name, focused } = this.props;
        return (
            <Image
                source={getMainTabBarIconSource(name, focused)}
                style={{ width: 36, height: 46 }}
            />
        );
    }
}
