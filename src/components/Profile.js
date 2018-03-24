import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const UserProfile = user => (
  <table>
    <tbody>
      <tr>
        <td>ID</td>
        <td>{user.id}</td>
      </tr>
      <tr>
        <td>Email</td>
        <td>{user.email}</td>
      </tr>
      <tr>
        <td>Name</td>
        <td>{user.name}</td>
      </tr>
      <tr>
        <td>Role</td>
        <td>{user.type}</td>
      </tr>
    </tbody>
  </table>
);

const Profile = ({ profile: { loading, error, me } }) => (
  <div>
    {loading && <div>Loading...</div>}
    {error && <div className="alert alert-danger">{error.message}</div>}
    {me && UserProfile(me)}
  </div>
);

const PROFILE_QUERY = gql`
  query {
    me {
      id
      email
      name
      type
    }
  }
`;

export default graphql(PROFILE_QUERY, {
  name: 'profile',
  options: {
    fetchPolicy: 'network-only'
  }
})(Profile);
