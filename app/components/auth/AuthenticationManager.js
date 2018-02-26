import React from "react";
import PropTypes from "prop-types";
import authService from "../../services/authService";

function AuthenticationManager({ children, router, location }) {
  const render = () => {
    const { pathname } = location;

    if (
      !authService.isAuthenticated() &&
      (pathname !== "/login" && pathname !== "/callback")
    ) {
      router.replace("/login");
      return null;
    }

    return children;
  };

  return render();
}

AuthenticationManager.propTypes = {
  children: PropTypes.element.isRequired,
  router: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default AuthenticationManager;
