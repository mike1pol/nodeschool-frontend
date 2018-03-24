import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import Post from './Post';

const Feed = ({ feedQuery: { loading, feed } }) => (
  <div>
    {loading && <div>Loading...</div>}
    {feed && feed.length === 0 && <div>Feed not found</div>}
    {feed && feed.length > 0 && feed.map(Post)}
  </div>
);

const FEED_QUERY = gql`
  query FeedQuery {
    feed {
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
  name: 'feedQuery',
  options: {
    fetchPolicy: 'network-only'
  }
})(Feed);
