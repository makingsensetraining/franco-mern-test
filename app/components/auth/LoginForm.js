import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from 'formsy-react-components';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { canSubmit: false, loading: false };

    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(newProps.error) {
      this.setState({loading: false});
    }
  }

  submit(model) {
    this.setState({ loading: true });
    this.props.onSubmit(model);
  }

  enableButton() {
    this.setState({ canSubmit: true });
  }

  disableButton() {
    this.setState({ canSubmit: false });
  }

  render() {

    const errorInfo = this.props.error ? <p className="bg-danger">{this.props.error.error_description}</p> : null;

    return (
      <Form
        onValidSubmit={this.submit}
        onValid={this.enableButton}
        onInvalid={this.disableButton}
        layout="vertical"
      >
        <Input
          name="email"
          label="Email"
          formNoValidate
          required
          validations="isEmail"
        />
        <Input
          name="password"
          type="password"
          label="Password"
          formNoValidate
          required
        />
        {errorInfo}
        <button
          type="submit"
          disabled={!this.state.canSubmit || this.state.loading}
          className="btn btn-primary"
        >
          {this.state.loading ? 'Loading...' : 'Login'}
        </button>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.shape({
    error: PropTypes.string,
    error_description: PropTypes.string
  })
};
