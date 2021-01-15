import homeStack from '../../../assets/images/mainTabBarIcons/home_stack.png';
import homeStackFocused from '../../../assets/images/mainTabBarIcons/home_stack_focused.png';
import patrollingManagementStack from '../../../assets/images/mainTabBarIcons/patrolling_management_stack.png';
import patrollingManagementStackFocused from '../../../assets/images/mainTabBarIcons/patrolling_management_stack_focused.png';
import profileStack from '../../../assets/images/mainTabBarIcons/profile_stack.png';
import profileStackFocused from '../../../assets/images/mainTabBarIcons/profile_stack_focused.png';
import * as MainTabBarRouteNames from '../constants/MainTabBarRouteNames';

const createPair = (icon, iconFocused) => {
    return {
        icon,
        iconFocused,
    };
};

const config = {
    [MainTabBarRouteNames.HOME_STACK]: createPair(homeStack, homeStackFocused),
    [MainTabBarRouteNames.PATROLLING_MANGEMENT_STACK]: createPair(
        patrollingManagementStack,
        patrollingManagementStackFocused,
    ),
    [MainTabBarRouteNames.PROFILE_STACK]: createPair(
        profileStack,
        profileStackFocused,
    ),
};

export default function getSource(name, focused) {
    return focused ? config[name].iconFocused : config[name].icon;
}
