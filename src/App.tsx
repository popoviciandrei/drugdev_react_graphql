import React, { PureComponent } from "react";
import logo from "./logo.svg";
import "./App.css";
import Index from './pages/index';
import Edit from './pages/edit';
import Add from './pages/add';
import View from './pages/view';
import E404 from './pages/page404';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import CssBaseline from '@material-ui/core/CssBaseline';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: 'http://localhost:3001/'
})

const client = new ApolloClient({
  link,
  cache
})


class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <CssBaseline />
        <Router>
          <CssBaseline />
          <div className="App">
            <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/view/:contactId" component={View} />
              <Route path="/edit/:contactId" component={Edit} />
              <Route path="/add" component={Add} />
              <Route component={E404} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
