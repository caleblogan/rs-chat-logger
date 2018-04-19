import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Menu, Image, Icon, Input, Responsive } from 'semantic-ui-react';

import styles from './Header.css';

const HeaderMenu = ({
  isLoggedIn,
}) => {
  return (
    <Menu className={styles.Header} fixed="top" borderless>
      <Menu.Item as={Link} to="/" header style={{borderLeft: '4px solid #511E7A'}}>
        Rs Chat Logger
      </Menu.Item>
      <Menu.Item as={Link} to="/">
        Visualizations
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
};

HeaderMenu.propTypes = {

};

export default HeaderMenu;
