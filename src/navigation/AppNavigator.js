import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";

import * as MainTabBarRouteNames from "../features/launch/constants/MainTabBarRouteNames";
import MainTabBarIcon from "../features/launch/components/MainTabBarIcon";
import HomeScreen from "../features/launch/components/HomeScreen";
import PatrollingTasksOnMapScreen from "../features/patrolling/viewPatrollingTasks/components/PatrollingTasksOnMapScreen";
import PatrollingTaskScreen from "../features/patrolling/viewPatrollingTask/components/PatrollingTaskScreen";
import ProfileScreenContainer from "../features/viewProfile/containers/ProfileScreenContainer";

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

const PatrollingManagementStack = createStackNavigator({
    PatrollingTasksOnMap: PatrollingTasksOnMapScreen,
    PatrollingTask: PatrollingTaskScreen,
});

const ProfileStack = createStackNavigator({
    Profile: ProfileScreenContainer,
});

export default createBottomTabNavigator(
    {
        [MainTabBarRouteNames.HOME_STACK]: HomeStack,
        [MainTabBarRouteNames.PATROLLING_MANGEMENT_STACK]: PatrollingManagementStack,
        [MainTabBarRouteNames.PROFILE_STACK]: ProfileStack,
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: (
                { focused } /* eslint-disable-line react/prop-types */
            ) => {
                const { routeName } = navigation.state;
                return <MainTabBarIcon name={routeName} focused={focused} />;
            },
        }),
        tabBarOptions: {
            showLabel: false,
            style: {
                backgroundColor: "#189B56",
                height: 62,
            },
        },
    }
);
