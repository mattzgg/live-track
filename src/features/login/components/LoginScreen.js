import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';

export default class LoginScreen extends Component {
    static propTypes = {
        account: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        handleChangeAccount: PropTypes.func.isRequired,
        handleChangePassword: PropTypes.func.isRequired,
        handleLogin: PropTypes.func.isRequired,
    };

    render() {
        const {
            account,
            password,
            handleChangeAccount,
            handleChangePassword,
            handleLogin,
        } = this.props;
        return (
            <View style={styles.container}>
                <Card title="林长通">
                    <Input
                        containerStyle={styles.inputContainer}
                        label="账号"
                        placeholder="手机号码/电子邮箱地址"
                        value={account}
                        onChangeText={handleChangeAccount}
                    />
                    <Input
                        containerStyle={styles.inputContainer}
                        label="密码"
                        secureTextEntry
                        value={password}
                        onChangeText={handleChangePassword}
                    />
                    <Button
                        title="登录"
                        onPress={() => handleLogin(account, password)}
                    />
                </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#6CDBF7',
    },
    inputContainer: {
        marginBottom: 10,
    },
});
