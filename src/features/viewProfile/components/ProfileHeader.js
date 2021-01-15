import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { userType } from '../../../helpers/propTypes';

class ProfileHeader extends Component {
    static propTypes = {
        user: userType.isRequired,
    };

    render() {
        const { user } = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.userRealName}>{user.realName}</Text>
            </View>
        );
    }
}

const mapState = state => {
    return {
        user: state.authData.user,
    };
};

export default connect(mapState)(ProfileHeader);

const styles = StyleSheet.create({
    container: {
        height: 120,
        backgroundColor: '#2898EA',
    },
    userRealName: {
        color: '#FFFFFF',
        marginLeft: 10,
        marginTop: 10,
    },
});
