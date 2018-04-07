const { HTTPError, HTTP404, ParseError } = require('./exceptions');

function http404Handler(req, res, next) {
  next(new HTTP404())
}

function errorHandler(error, req, res, next) {
  if (error instanceof ParseError) {
    res.status(error.status).json({...error.fields});
  } else if (error instanceof HTTPError) {
    res.status(error.status).json({ message: error.message });
  } else {
    if (process.env.NODE_ENV === 'development') {
      console.log('error:', error);
      res.status(500).json(error)
    } else {
      res.status(500).json({message: 'Internal service error'})
    }
  }
}

module.exports = {
  http404Handler,
  errorHandler,
}
