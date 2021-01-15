import { connect } from 'react-redux';
import FeatureActions from '../../../../helpers/FeatureActions';
import MapControls from '../components/MapControls';

const mapDispatch = dispatch => {
    return {
        zoomin: () => {
            dispatch(FeatureActions().zoomin());
        },
        zoomout: () => {
            dispatch(FeatureActions().zoomout());
        },
        centerAndZoom: () => {
            dispatch(FeatureActions().centerAndZoom());
        },
    };
};

export default connect(
    null,
    mapDispatch,
)(MapControls);
