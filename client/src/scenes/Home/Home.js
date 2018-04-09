import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './Home.css';

class Home extends Component {

  render() {
    return (
      <div>
        Home
      </div>
    );
  }
}

Home.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {

  };
}

export default connect(mapStateToProps)(Home);
