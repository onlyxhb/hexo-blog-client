module.exports = (result = null, code = 200, message = null) => {
  if ( arguments.length === 1 && typeof result === 'number' ) {
    code = result, result = null
  } else if (arguments.length === 2) {
    message = code, code = result, result = null
  }

  return {code, message, result}
}