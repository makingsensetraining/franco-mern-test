import React from 'react';
import PropTypes from 'prop-types';

export default function SignedOutLayout({ children }) {
  return (
      <div className="col-md-4 col-md-offset-4">{children}</div>
  );
}

SignedOutLayout.propTypes = {
  children: PropTypes.element,
};
