function fail(message) {
  if (fail.mode === 'toss') {
    toss(message)
  } else {
    exit(message)
  }
}

fail.tossMode = () => {
  fail.mode = 'toss'
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
