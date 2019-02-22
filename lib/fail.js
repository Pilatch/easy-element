module.exports = function fail(message) {
  if (fail.mode === 'toss') {
    toss(message)
  } else {
    exit(message)
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
  throw new Error(message)
}
