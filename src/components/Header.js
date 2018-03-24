import React from 'react';
import { withRouter, Link } from 'react-router-dom';

import { AUTH_TOKEN } from '../constants';

const Header = ({ history }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    history.push(`/`);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">Blog</span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Feed
            </Link>
          </li>
          {token && (
            <li className="nav-item">
              <Link className="nav-link" to="/drafts">
                Drafts
              </Link>
            </li>
          )}
        </ul>
        <ul className="navbar-nav navbar-right">
          {token && (
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create
              </Link>
            </li>
          )}
          <li className="nav-item">
            {token ? (
              <a
                style={{ cursor: 'pointer' }}
                className="nav-link"
                onClick={logout}
              >
                Logout
              </a>
            ) : (
              <Link className="nav-link" to="/login">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default withRouter(Header);
