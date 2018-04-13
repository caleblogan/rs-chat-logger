import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Menu, Image, Icon, Input, Responsive } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';

import { selectors } from '../../reducers';
import styles from './Header.css';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Menu className={styles.Header} fixed="top" borderless>
        <Menu.Item as={Link} to="/" header style={{borderLeft: '4px solid #511E7A'}}>
          {/*<Image*/}
          {/*size='mini'*/}
          {/*src='/logo.png'*/}
          {/*style={{ marginRight: '1.5em' }}*/}
          {/*/>*/}
          Rs Chat Logger
        </Menu.Item>
        <Menu.Item as={Link} to="/messages">
          Messages
        </Menu.Item>
        <Menu.Item as={Link} to="/stream">
          Message Stream
        </Menu.Item>
        <Menu.Item as={Link} to="/top-accounts">
          Top Accounts
        </Menu.Item>
      </Menu>
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
