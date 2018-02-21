import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';

const Header = ({ user }) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <IndexLink
            to="/"
            activeClassName="navbar-brand"
            className="navbar-brand"
          >
            <i className="glyphicon glyphicon-check" /> MERN seed
          </IndexLink>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <IndexLink to="/" activeClassName="active">
              <i className="glyphicon glyphicon-home" /> Home
            </IndexLink>
          </li>
          <li>
            <Link to="/app/users" activeClassName="active">
              <i className="glyphicon glyphicon-user" /> Users
            </Link>
          </li>
          <li>
            <Link to="/app/about" activeClassName="active">
              <i className="glyphicon glyphicon-exclamation-sign" /> About
            </Link>
          </li>
          <li>
            <Link to="/logout" activeClassName="active">
              <i className="glyphicon glyphicon-log-out" /> Logout
            </Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <p className="navbar-text"> Welcome, {user.name}</p>
          </li>
        </ul>
      </div>
    </nav>
  );
};

Header.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(Header);
