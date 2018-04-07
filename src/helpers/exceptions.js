const { status } = require('../helpers/statusCodes')

class HTTPError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

class HTTP404 extends HTTPError {
  constructor(message='not found') {
    super(message, status.HTTP_404_NOT_FOUND)
  }
}

class PermissionDenied extends HTTPError {
  constructor(message='Permission denied') {
    super(message, status.HTTP_403_FORBIDDEN)
  }
}

class AuthenticationFailed extends HTTPError {
  constructor(message='Authentication failed') {
    super(message, status.HTTP_401_UNAUTHORIZED)
  }
}

class NotAuthenticated extends HTTPError {
  constructor(message='You are not authenticated') {
    super(message, status.HTTP_401_UNAUTHORIZED)
  }
}

/**
 * Used for invalid fields and form validation.
 * Expects fields to be an `object` of keys that match the field name.
 * `nonField` key is used for non field errors. Useful for top level form errors.
 */
class ParseError extends HTTPError {
  constructor(fields = {}) {
    super('Params not valid', status.HTTP_400_BAD_REQUEST)
    this.fields = fields
  }
}

class MethodNotAllowed extends HTTPError {
  constructor(message='Method not allowed') {
    super(message, status.HTTP_405_METHOD_NOT_ALLOWED)
  }
}

class ServerError extends HTTPError {
  constructor(message='Something went wrong') {
    super(message, status.HTTP_500_INTERNAL_SERVER_ERROR)
  }
}

module.exports = {
  HTTPError,
  HTTP404,
  PermissionDenied,
  AuthenticationFailed,
  NotAuthenticated,
  ParseError,
  MethodNotAllowed,
  ServerError,
}