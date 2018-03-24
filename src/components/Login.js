import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../constants';

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: '',
      password: '',
      error: null
    };
  }

  handleLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ error: null });
    try {
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      });
      const { token } = result.data.login;
      this.saveUserData(token);
      this.props.history.push(`/`);
    } catch (e) {
      this.setState({ error: e.message.replace('GraphQL error: ', '') });
    }
  };

  saveUserData(token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <div style={{ width: '500px', margin: '40px auto' }}>
        <h4>Login</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.handleLogin}>
          <div className="form-group">
            <label>E-mail</label>
            <input
              className="form-control"
              type="email"
              value={email}
              placeholder="E-mail"
              onChange={({ target: { value: email } }) =>
                this.setState({ email })
              }
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              value={password}
              placeholder="Password"
              onChange={({ target: { value: password } }) =>
                this.setState({ password })
              }
            />
          </div>
          <button type="submit" bsStyle="primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;
export default graphql(LOGIN_MUTATION, { name: 'loginMutation' })(Login);
