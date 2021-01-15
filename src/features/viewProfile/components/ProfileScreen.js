import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import ProfileHeader from './ProfileHeader';

export default class ProfileScreen extends React.Component {
    static propTypes = {
        logout: PropTypes.func.isRequired,
    };

    static navigationOptions = {
        header: <ProfileHeader />,
    };

    render() {
        const { logout } = this.props;
        return (
            <View style={styles.container}>
                <Button title="退出" onPress={logout} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
