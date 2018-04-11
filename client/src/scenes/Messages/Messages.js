import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';

class Messages extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={{marginTop: '20px'}}>
        Messages
      </Container>
    );
  }
}

Messages.propTypes = {};

function mapStateToProps(state) {
  return {
  }
}

export default connect(mapStateToProps)(Messages);
