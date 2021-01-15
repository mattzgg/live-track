import { connect } from 'react-redux';
import { createRootDispatchContext } from '../../../helpers/middleware/DispatchContext';
import LoginScreen from '../components/LoginScreen';
import actions from '../actions';

const mapState = state => ({
    account: state.authData.account,
    password: state.authData.password,
});

const mapDispatch = dispatch => ({
    handleChangeAccount(account) {
        dispatch(actions.loginForm.changeAccount(account));
    },
    handleChangePassword(password) {
        dispatch(actions.loginForm.changePassword(password));
    },
    handleLogin(account, password) {
        dispatch(actions.login(createRootDispatchContext(), account, password));
    },
});

export default connect(
    mapState,
    mapDispatch,
)(LoginScreen);
