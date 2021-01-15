import PropTypes from 'prop-types';

export const errorType = PropTypes.instanceOf(Error);

export const userType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    realName: PropTypes.string.isRequired,
});
