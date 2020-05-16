function fail(message) {
  if (fail.mode === 'toss') {
    toss(message)
  } else if (fail.mode === 'report') {
    fail.reportError(message)
  } else {
    exit(message)
  }
}

fail.tossMode = () => {
  fail.mode = 'toss'
}

fail.reportMode = reportError => {
  if (typeof reportError === 'function') {
    fail.mode = 'report'
    fail.reportError = reportError
  } else {
    fail.mode = 'exit'
    fail('Could not set report mode on fail without a reportError function')
  }
}

let exit = message => {
  logError(message)
  process.exit(1)
}

let logError = message => {
  if (typeof message === 'string') {
    console.error(message)
  } else if (Array.isArray(message)) {
    message.forEach(msg => console.error(msg))
  }
}

let toss = message => {
  if (message instanceof Error) {
    throw message
  }

  throw new Error(message)
}

module.exports = fail
