import { connect } from 'react-redux';
import NavigationService from '../../../../navigation/NavigationService';
import PatrollingTaskMarkerDetail from '../components/PatrollingTaskMarkerDetail';

export default connect(
    null,
    null,
    () => {
        return {
            onEnter: () => {
                NavigationService.navigate('PatrollingTask');
            },
        };
    },
)(PatrollingTaskMarkerDetail);
