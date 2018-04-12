import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import {selectors} from "../../reducers";
import {fetchMessages, setSearch, setSortBy, setSortOrder} from "../../actions/messageActions";

const sortByOptions = [
  { key: 'created_at', text: 'Date', value: 'created_at' },
  { key: 'username', text: 'Username', value: 'username' },
  { key: 'locationName', text: 'Location', value: 'locationName' },
  // { key: '', text: '', value: '' },
];

const sortOrderOptions = [
  { key: 'asc', text: 'Asc', value: 'asc' },
  { key: 'desc', text: 'Desc', value: 'desc' },
];

class MessageControls extends Component {

  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSortBy = this.handleSortBy.bind(this);
    this.handleSortOrder = this.handleSortOrder.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSortBy(e, { name, value }) {
    if (this.props.sortBy !== value) {
      this.props.dispatch(setSortBy(value));
      this.props.dispatch(fetchMessages());
    }
  }

  handleSortOrder(e, { name, value }) {
    if (this.props.sortOrder !== value) {
      this.props.dispatch(setSortOrder(value));
      this.props.dispatch(fetchMessages());
    }
  }

  handleSubmit() {
    this.props.dispatch(setSearch(this.state.search));
    this.props.dispatch(fetchMessages());
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            label='Search'
            placeholder='Search...'
            name='search'
            value={this.state.search}
            action={{ content: 'Search', onClick: this.handleSubmit }}
            onChange={this.handleChange}
          />
          <Form.Select
            fluid
            label='Sort By'
            value={this.props.sortBy}
            options={sortByOptions}
            name='sortBy'
            onChange={this.handleSortBy}
          />
          <Form.Select
            fluid
            label='Sort Order'
            value={this.props.sortOrder}
            options={sortOrderOptions}
            name='sortOrder'
            onChange={this.handleSortOrder}
          />
        </Form.Group>
      </Form>
    );
  }
}

MessageControls.propTypes = {};

function mapStateToProps(state) {
  return {
    sortBy: selectors.messages.sortBy(state),
    sortOrder: selectors.messages.sortOrder(state),
  }
}

export default connect(mapStateToProps)(MessageControls);
