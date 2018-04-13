import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Button, Loader, Divider, Header } from 'semantic-ui-react';
import {selectors} from "../../reducers";
import MessageList from "../../components/Messages/MessageList";
import { fetchAccountMessages } from "../../actions/accountActions";

class Account extends Component {

  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    if (!this.props.messages || !this.props.messages.length) {
      this.loadMore();
    }
  }

  loadMore() {
    this.props.dispatch(fetchAccountMessages(this.props.username))
  }

  render() {
    const { isFetching, messages, username } = this.props;
    return (
      <Container style={{marginTop: '20px'}}>
        <Header as='h2'>{username} Messages</Header>
        <Divider />
        <MessageList messages={messages}/>
        <Loader active={isFetching} inline='centered'/>
        {/*<Button*/}
          {/*onClick={this.loadMore}*/}
          {/*disabled={isFetching}*/}
        {/*>Load More</Button>*/}
      </Container>
    );
  }
}

Account.propTypes = {};

function mapStateToProps(state, ownProps) {
  const { username } = ownProps.match.params;
  console.log('own', ownProps)
  return {
    messages: selectors.accounts.messageList(state, username),
    isFetching: selectors.accounts.isFetching(state),
    username,
  }
}

export default connect(mapStateToProps)(Account);
