import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class UserPasswordChanger extends React.Component {
  constructor(props, ctx) {
    super(props, ctx);
    this.changePassword = this.changePassword.bind(this);
    this.state = {
      oldPassword: '',
      newPassword: ''
    };
  }

  async changePassword(e) {
    e.preventDefault();

    this.setState({ error: null });
    try {
      const result = await this.props.changePassword({
        variables: this.state
      });
      console.log(result.data);
      this.setState({ oldPassword: '', newPassword: '' });
    } catch (e) {
      this.setState({ error: e.message.replace('GraphQL error: ', '') });
    }
  }

  render() {
    const { oldPassword, newPassword, error } = this.state;
    return (
      <div style={{ width: '500px', margin: '40px auto' }}>
        <h4>Change Password</h4>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={this.changePassword}>
          <div className="form-group">
            <label>Old password</label>
            <input
              className="form-control"
              type="password"
              value={oldPassword}
              placeholder="Old Password"
              onChange={({ target: { value: oldPassword } }) =>
                this.setState({ oldPassword })
              }
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              className="form-control"
              type="password"
              value={newPassword}
              placeholder="New Password"
              onChange={({ target: { value: newPassword } }) =>
                this.setState({ newPassword })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </form>
      </div>
    );
  }
}

const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePasswordMutation(
    $oldPassword: String!
    $newPassword: String!
  ) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      id
    }
  }
`;

export default graphql(CHANGE_PASSWORD_MUTATION, {
  name: 'changePassword'
})(UserPasswordChanger);
