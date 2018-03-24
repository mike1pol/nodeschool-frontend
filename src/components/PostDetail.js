import React from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';

import { AUTH_TOKEN } from '../constants';

class PostDetail extends React.Component {
  token = localStorage.getItem(AUTH_TOKEN);
  state = {
    error: null
  };

  deletePost = async id => {
    try {
      await this.props.deletePost({
        variables: { id }
      });
    } catch (e) {
      this.setState({ error: e.message.replace('GraphQL error: ', '') });
    }
    this.props.history.replace('/');
  };

  publishDraft = async id => {
    try {
      await this.props.publishDraft({
        variables: { id }
      });
    } catch (e) {
      this.setState({ error: e.message.replace('GraphQL error: ', '') });
    }
    this.props.history.replace(`/post/${id}`);
  };

  renderPost({ id, title, text, isPublished, author: { name } }) {
    return (
      <div className="card" key={id}>
        <div className="card-body">
          <h5 className="card-title">
            {title} {!isPublished && '(Draft)'}
          </h5>
          <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
          <p className="card-text">{text}</p>
          {this.token &&
            !isPublished && (
              <button
                onClick={() => this.publishDraft(id)}
                className="card-link"
              >
                Publish
              </button>
            )}
          {this.token && (
            <button onClick={() => this.deletePost(id)} className="card-link">
              Delete
            </button>
          )}
        </div>
      </div>
    );
  }

  render() {
    const { postQuery: { loading, post } } = this.props;
    const { error } = this.state;
    return (
      <div>
        {loading && <div>Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {post && this.renderPost(post)}
      </div>
    );
  }
}
const POST_QUERY = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      text
      title
      isPublished
      author {
        name
      }
    }
  }
`;

const PUBLISH_MUTATION = gql`
  mutation publish($id: ID!) {
    publish(id: $id) {
      id
      isPublished
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation deletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(POST_QUERY, {
    name: 'postQuery',
    options: props => ({
      variables: {
        id: props.match.params.id
      }
    })
  }),
  graphql(PUBLISH_MUTATION, {
    name: 'publishDraft'
  }),
  graphql(DELETE_MUTATION, {
    name: 'deletePost'
  }),
  withRouter
)(PostDetail);
