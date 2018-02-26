import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import loginService from '../../services/authService';
import { loginSuccess, loginFailed } from '../../actions/authActions';

class CallbackLoading extends Component {
  componentDidMount() {
    loginService
      .handleAuthentication()
      .then(auth => {
        if (!auth) {
          this.props.router.push('/login');
        } else {
          this.props.loginSuccess(auth.idTokenPayload);
          this.props.router.push('/');
        }
      })
      .catch(e => {
        this.props.loginFailed(e);
        this.props.router.push('/login');
      });
  }
  render() {
    return <div>Loading...</div>;
  }
}

CallbackLoading.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
  loginFailed: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired,
};

export default connect(null, { loginSuccess, loginFailed })(CallbackLoading);
