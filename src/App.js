import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NotFound from './components/NotFound';
import Feed from './components/Feed';
import Drafts from './components/Drafts';
import PostDetail from './components/PostDetail';
import Login from './components/Login';
import Create from './components/Create';
import Profile from './components/Profile';
import ChangePassword from './components/ChangePassword';

import Header from './components/Header';

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
        <Route path="/profile/password" component={ChangePassword} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
