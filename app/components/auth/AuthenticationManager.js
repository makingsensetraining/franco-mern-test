import React from "react";
import PropTypes from "prop-types";
import userService from "../../services/userService";

function AuthenticationManager({ children, router, location }) {
  const render = () => {
    const { pathname } = location;

    if (
      !userService.isAuthenticated() &&
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
