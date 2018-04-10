import React from 'react';
import PropTypes from 'prop-types';
import { Comment } from 'semantic-ui-react';

import Message from "./Message";

const MessageList = ({
  messages,
}) => {
  return (
    <Comment.Group>
      {messages.map(message => (
        <Message
          key={message._id}
          username={message.username}
          message={message.message}
          type={message.type}
          tile={message.tile}
          locationName={message.locationName}
          world={message.world}
          date={message.created_at}
        />
      ))}
    </Comment.Group>
  );
};

MessageList.propTypes = {

};

export default MessageList;
