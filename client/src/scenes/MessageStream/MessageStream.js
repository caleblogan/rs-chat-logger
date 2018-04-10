import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'semantic-ui-react';
import MessageList from "../../components/Messages/MessageList";
import {selectors} from "../../reducers";
import {startMessageStream, stopMessageStream} from "../../actions/messageActions";

class MessageStream extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(startMessageStream());
  }

  componentWillUnmount() {
    this.props.dispatch(stopMessageStream());
  }

  render() {
    return (
      <Container style={{marginTop: '60px'}}>
        <MessageList messages={this.props.messages}/>
      </Container>
    );
  }
}

MessageStream.propTypes = {};

function mapStateToProps(state) {
  return {
    messages: selectors.messages.messageStreamList(state),
  }
}

export default connect(mapStateToProps)(MessageStream);
