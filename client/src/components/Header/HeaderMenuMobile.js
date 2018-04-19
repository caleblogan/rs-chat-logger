import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Menu, Image, Icon, Input, Dropdown } from 'semantic-ui-react';

import styles from './Header.css';

class HeaderMenuMobile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(event) {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    return (
      <Menu className={styles.Header} fixed="top" borderless>
        <Menu.Item as={Link} to="/" header style={{borderLeft: '4px solid #511E7A'}}>
          Rs Chat Logger
        </Menu.Item>

        <Menu.Menu position='right'>
          <Dropdown icon='sidebar' className='link item'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/">Visualizations</Dropdown.Item>
              <Dropdown.Item as={Link} to="/messages">Messages</Dropdown.Item>
              <Dropdown.Item as={Link} to="/stream">Message Stream</Dropdown.Item>
              <Dropdown.Item as={Link} to="/top-accounts">Top Accounts</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
    );
  }
}

HeaderMenuMobile.propTypes = {

};

export default HeaderMenuMobile;
