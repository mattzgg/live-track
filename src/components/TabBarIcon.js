import React from "react";
import PropTypes from "prop-types";
import * as Icon from "@expo/vector-icons";

import Colors from "../constants/Colors";

/* eslint-disable import/prefer-default-export, react/prefer-stateless-function */
export default class TabBarIcon extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        focused: PropTypes.bool.isRequired,
    };

    render() {
        const { name, focused } = this.props;
        return (
            <Icon.Ionicons
                name={name}
                size={26}
                style={{ marginBottom: -3 }}
                color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}
