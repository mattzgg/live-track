import { connect } from 'react-redux';
import actions from '../../logout/actions';
import ProfileScreen from '../components/ProfileScreen';

const mapDispatch = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
    };
};

export default connect(
    null,
    mapDispatch,
)(ProfileScreen);
