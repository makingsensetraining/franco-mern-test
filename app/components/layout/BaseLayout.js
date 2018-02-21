import React from 'react';
import PropTypes from 'prop-types';

export default function BaseLayout({ children }) {
  return <div className="container-fluid">{children}</div>;
}

BaseLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
