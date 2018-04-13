import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Button, Loader, List, Label } from 'semantic-ui-react';
import {selectors} from "../../reducers";
import { fetchMessages } from "../../actions/messageActions";
import {fetchTopAccounts} from "../../actions/accountActions";

class TopAccounts extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.accounts.length) {
      this.props.dispatch(fetchTopAccounts());
    }
  }

  render() {
    const { isFetching, accounts } = this.props;
    return (
      <Container style={{marginTop: '20px'}}>
        <List ordered>
          {accounts.map(acc => (
            <List.Item key={acc._id}>
              <Link style={{padding: '0 8px'}} to={`/accounts/${acc._id}`}>{acc._id}</Link>
              {' '}{acc.count}
            </List.Item>
          ))}
        </List>
        <Loader active={isFetching} />
      </Container>
    );
  }
}

TopAccounts.propTypes = {};

function mapStateToProps(state) {
  return {
    accounts: selectors.topAccounts.list(state),
    isFetching: selectors.topAccounts.isFetching(state),
  }
}

export default connect(mapStateToProps)(TopAccounts);
