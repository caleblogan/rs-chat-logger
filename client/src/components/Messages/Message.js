import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Comment } from 'semantic-ui-react';

import TimeAgo from "../TimeAgo/TimeAgo";
import styles from './Message.css';

const Message = ({
  username,
  message,
  type,
  tile,
  locationName,
  world,
  date,
}) => {
  return (
    <Comment className={styles.Message}>
      <Comment.Content>
        <Comment.Author as={Link} to={`/accounts/${username}`}>{username}</Comment.Author>
        <Comment.Metadata>
          <div>{<TimeAgo date={date}/>} • </div>
          <div>{locationName} • </div>
          <div>{world}</div>
        </Comment.Metadata>
        <Comment.Text>{message}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

Message.propTypes = {

};

export default Message;
