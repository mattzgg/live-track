import React from 'react';
import { Text } from 'react-native';

/* eslint-disable import/prefer-default-export, react/prefer-stateless-function */
export class MonoText extends React.Component {
    static propTypes = {
        style: Text.propTypes.style,
    };

    static defaultProps = {
        style: {},
    };

    render() {
        const { style } = this.props;
        return (
            <Text
                {...this.props}
                style={[style, { fontFamily: 'space-mono' }]}
            />
        );
    }
}
