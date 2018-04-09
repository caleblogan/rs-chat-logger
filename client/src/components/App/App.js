import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Link, Redirect } from 'react-router-dom';

import Header from '../Header/Header';
import Home from '../../scenes/Home/Home';
import styles from './App.css';

class App extends Component {

  render() {
    return (
      <div className={styles.App}>
        <Header />
        <div className={styles.MainContent}>
          <Route exact path="/" component={Home} />
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
