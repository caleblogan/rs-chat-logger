import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../../scenes/Home/Home';
import MessageStream from '../../scenes/MessageStream/MessageStream';
import Messages from '../../scenes/Messages/Messages';
import TopAccounts from '../../scenes/TopAccounts/TopAccounts';
import Account from '../../scenes/Account/Account';
import styles from './App.css';

class App extends Component {

  render() {
    return (
      <div className={styles.App}>
        <Header />
        <div className={styles.MainContent}>
          <Route exact path="/" component={Home} />
          <Route exact path="/messages" component={Messages} />
          <Route exact path="/stream" component={MessageStream} />
          <Route exact path="/top-accounts" component={TopAccounts} />
          <Route exact path="/accounts/:username" component={Account} />
          <Route exact path="/rs-chat-logger/dist/" render={() => (
            <Redirect to="/" />
          )}
          />
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
