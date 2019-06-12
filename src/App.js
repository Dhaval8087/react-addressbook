import '../node_modules/bootstrap/scss/bootstrap.scss';
import '../node_modules/font-awesome/scss/font-awesome.scss';
import './App.scss';

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserSettings from './components/settings/usersetings';
import UserList from './components/users/userlist';

const App = () => (
  <Router>
    <div className="App">
      <Switch>
         <Route exact path="/" component={UserList} />
         <Route exact path="/settings" component={UserSettings} />
      </Switch>
    </div>
  </Router>
);

export default App;
