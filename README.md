# Runescape Chat Logger Server
The api for chat logger which can be used by bot (collectors) or client.

Server: https://runescape-chat-logger.herokuapp.com/api/v1/
Client: http://rs-chat-logger.surge.sh/

# Setup
- `clone repo && cd rs-chat-logger`
- run mongodb
- `yarn install`
- `node server.js`

# Config
- PORT = 8000
- MONGODB_URL = localhost:defaultport

Create a user by sending a post request to /users with username and password.
This will return a api token which can be used on auth endpoints.
Authorization: Bearer :apiToken:
