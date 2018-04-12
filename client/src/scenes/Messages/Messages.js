import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button, Loader } from 'semantic-ui-react';
import {selectors} from "../../reducers";
import MessageList from "../../components/Messages/MessageList";
import MessageControls from "./MessageControls";
import {fetchMessages} from "../../actions/messageActions";

class Messages extends Component {

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  loadMore() {
    this.props.dispatch(fetchMessages())
  }

  render() {
    const { isFetching, messages } = this.props;
    return (
      <Container style={{marginTop: '20px'}}>
        <MessageControls />
        <MessageList messages={messages}/>
        <Loader active={isFetching} inline='centered'/>
        <Button
          onClick={this.loadMore}
          disabled={isFetching}
        >Load More</Button>
      </Container>
    );
  }
}

Messages.propTypes = {};

function mapStateToProps(state) {
  return {
    messages: selectors.messages.messageList(state),
    isFetching: selectors.messages.isFetching(state),
  }
}

export default connect(mapStateToProps)(Messages);
