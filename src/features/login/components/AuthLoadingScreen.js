import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default class AuthLoadingScreen extends Component {
    static propTypes = {
        isLoginSessionExisting: PropTypes.bool.isRequired,
    };

    async componentDidMount() {
        const { navigation, isLoginSessionExisting } = this.props;
        navigation.navigate(isLoginSessionExisting ? 'App' : 'Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
