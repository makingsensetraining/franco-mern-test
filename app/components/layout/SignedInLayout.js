import React, { PropTypes } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';

// This component handles the App template used on every page.
export default class SignedInLayout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid">{this.props.children}</div>
        <hr />
        <Footer />
      </div>
    );
  }
}

SignedInLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
