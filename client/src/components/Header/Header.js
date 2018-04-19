import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

import { selectors } from '../../reducers';
import HeaderMenu from "./HeaderMenu";
import HeaderMenuMobile from "./HeaderMenuMobile";
import styles from './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MediaQuery minWidth={700}>
        {(matches) => {
          if (matches) {
            return <HeaderMenu isLoggedIn={this.props.isLoggedIn} />;
          } else {
            return <HeaderMenuMobile isLoggedIn={this.props.isLoggedIn} />;
          }
        }}
      </MediaQuery>
    );
  }
}

Header.propTypes = {
};

function mapStateToProps(state) {
  return {
    isLoggedIn: selectors.auth.isLoggedIn(state),
  };
}

export default connect(mapStateToProps)(Header);
