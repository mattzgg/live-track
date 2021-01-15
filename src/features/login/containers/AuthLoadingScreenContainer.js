import { connect } from 'react-redux';
import AuthLoadingScreen from '../components/AuthLoadingScreen';

const mapState = state => {
    return {
        isLoginSessionExisting: !!state.authData.user,
    };
};

export default connect(mapState)(AuthLoadingScreen);
