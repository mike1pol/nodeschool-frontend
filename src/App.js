import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/Header';
import Feed from './components/Feed';
import Drafts from './components/Drafts';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import Create from './components/Create';

const App = () => (
  <div>
    <Header />
    <div className="container" style={{ paddingTop: '20px' }}>
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route path="/drafts" component={Drafts} />
        <Route path="/create" component={Create} />
        <Route path="/post/:id" component={PostDetail} />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  </div>
);

export default App;
