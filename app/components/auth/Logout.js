import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../actions/authActions';
import authService from '../../services/authService';

export function Logout({ router, logout }) {
  authService.logout();
  logout();
  return null;
}

Logout.propTypes = {
  router: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Logout);
