import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';
import {loginAction, loginFailed} from '../../actions/authActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  submit(values) {
    const { email, password } = values;
    this.props.loginAction(email, password, (e => {
      this.props.loginFailed(e);
    }));
  }

  render() {
    return <LoginForm onSubmit={this.submit} error={this.props.error} />;
  }
}

LoginPage.propTypes = {
  loginAction: PropTypes.func.isRequired,
  loginFailed: PropTypes.func.isRequired,
  error: PropTypes.object
};

const mapStateToProps = (state) => ({
  error: state.auth.error
});

export default connect(mapStateToProps, { loginAction, loginFailed })(LoginPage);
