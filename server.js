const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rs-chat-logger');

const apiRoutes = require('./src/routes');
const { http404Handler, errorHandler } = require('./src/helpers/middleware');
const { auth } = require('./src/helpers/auth');


app.use(morgan('tiny'));

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(auth);

app.use('/api/v1', apiRoutes);

app.use(http404Handler);

app.use(errorHandler);

app.listen(8000, () => console.log('Example app listening on port 8000!'));