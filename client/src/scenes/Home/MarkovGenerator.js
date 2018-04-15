import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Loader } from 'semantic-ui-react';
import { generateMessage } from "../../actions/chartActions";

class MarkovGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      isLoading: false,
    };
    this.generateMessage = this.generateMessage.bind(this);
  }

  componentDidMount() {
    this.generateMessage();
  }

  generateMessage() {
    this.setState({isLoading: true});
    this.props.dispatch(generateMessage())
      .then(message => {
        this.setState({message: message.data.message, isLoading: false});
      })
  }

  render() {
    const { isLoading, message } = this.state;
    return (
      <div>
        <p>{message}</p>
        <Loader active={isLoading} />
        <Button disabled={isLoading} onClick={this.generateMessage}>Generate</Button>
      </div>
    );
  }
}

MarkovGenerator.propTypes = {};

export default connect()(MarkovGenerator);
