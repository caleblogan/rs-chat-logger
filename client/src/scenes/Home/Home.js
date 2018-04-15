import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Menu } from 'semantic-ui-react';

import styles from './Home.css';
import WordCounts from "./WordCounts";
import WordsOverTime from './WordsOverTime';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'wordsOverTime',
    };
    this.handleItemClick = this.handleItemClick.bind(this);
  }

  handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  renderActive() {
    switch (this.state.activeItem) {
      case 'wordCounts':
        return <WordCounts />;
      case 'wordsOverTime':
        return <WordsOverTime />
      default:
        return undefined;
    }
  }

  render() {
    const { activeItem } = this.state;
    return (
      <Container style={{marginTop: '20px', maxWidth: '1400px'}}>
        <Menu pointing secondary>
          <Menu.Item name='wordCounts' active={activeItem === 'wordCounts'} onClick={this.handleItemClick}>Word Counts</Menu.Item>
          <Menu.Item name='wordsOverTime' active={activeItem === 'wordsOverTime'} onClick={this.handleItemClick}>Words Over Time</Menu.Item>
        </Menu>
        {this.renderActive()}
      </Container>
    );
  }
}

Home.propTypes = {};

function mapStateToProps(state, ownProps) {
  return {

  };
}

export default connect(mapStateToProps)(Home);
