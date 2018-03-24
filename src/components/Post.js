import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ id, title, text, isPublished, author: { name } }) => (
  <div className="card" key={id}>
    <div className="card-body">
      <h5 className="card-title">
        <Link to={`/post/${id}`}>{title}</Link> {!isPublished && '(Draft)'}
      </h5>
      <h6 className="card-subtitle mb-2 text-muted">{name}</h6>
      <p className="card-text">{text}</p>
    </div>
  </div>
);

export default Post;
