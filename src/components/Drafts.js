import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Post from './Post';

const Drafts = ({ draftsQuery: { loading, drafts } }) => (
  <div>
    {loading && <div>Loading...</div>}
    {drafts && drafts.length === 0 && <div>Drafts not found</div>}
    {drafts && drafts.length > 0 && drafts.map(Post)}
  </div>
);

const FEED_QUERY = gql`
  query DraftsQuery {
    drafts {
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

export default graphql(FEED_QUERY, {
  name: 'draftsQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(Drafts);
