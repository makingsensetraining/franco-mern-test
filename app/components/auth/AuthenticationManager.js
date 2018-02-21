import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function AuthenticationManager({ children, router, location, authenticated }) {
  const render = () => {
    const {pathname} = location;

    if(!authenticated && (pathname !== '/login' && pathname !== '/callback')) {
      router.replace('/login');
      return null;
    }

    return children;
  };

  return render();
}

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated,
});

AuthenticationManager.propTypes = {
  children: PropTypes.element.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthenticationManager);
