import { connect } from 'react-redux';
import InProgressIndicator from '../components/InProgressIndicator';

const mapState = state => {
    return {
        message: state.systemData.inProgressMessage,
    };
};

export default connect(mapState)(InProgressIndicator);
