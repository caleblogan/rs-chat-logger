const express = require('express');
const app = express();
const expressWss = require('express-ws')(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

const mongoose = require('mongoose');
mongoose.connect(_.get(process.env, 'MONGODB_URI', 'mongodb://localhost/rs-chat-logger'));
console.log(process.env);
console.log(_.get(process.env, 'MONGODB_URI', 'def'));

const apiRoutes = require('./src/routes');
const { http404Handler, errorHandler } = require('./src/helpers/middleware');
const { auth } = require('./src/helpers/auth');
const wsClientMiddlware = require('./src/helpers/wsClientMiddleware');


app.use(morgan('tiny'));

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(wsClientMiddlware());

app.use(auth);

app.use('/api/v1', apiRoutes);

app.use(http404Handler);

app.use(errorHandler);

app.listen(8000, () => console.log('Example app listening on port 8000!'));