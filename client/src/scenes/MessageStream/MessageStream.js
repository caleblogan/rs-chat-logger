import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'semantic-ui-react';
import MessageList from "../../components/Messages/MessageList";

class MessageStream extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          "username": "FarLye06090",
          "message": "[Farlye06090] [50k] - [11350k] [54 - 100] Good luck |16:40:26|",
          "type": "PLAYER",
          "tile": "3162 3483 0",
          "locationName": "Varrock Ge",
          "world": 301,
          "created_at": "2018-04-09T16:41:15.549Z",
        },
        {
          "username": "Jager0nem",
          "message": "Buying all green d hide body !!!!",
          "type": "PLAYER",
          "tile": "3166 3483 0",
          "locationName": "Varrock Ge",
          "world": 301,
          "created_at": "2018-04-09T16:41:19.027Z",
        },
      ],
    }
  }
  render() {
    return (
      <Container style={{marginTop: '60px'}}>
        <MessageList messages={this.state.messages}/>
      </Container>
    );
  }
}

MessageStream.propTypes = {};

export default MessageStream;
