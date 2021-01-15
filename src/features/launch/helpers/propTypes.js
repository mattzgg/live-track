import PropTypes from 'prop-types';
import * as MainTabBarRouteNames from '../constants/MainTabBarRouteNames';

export const mainTabBarIconNameType = PropTypes.oneOf(
    Object.values(MainTabBarRouteNames),
);
