const { createLogger, format, transports } = require('winston')
const { combine, label, timestamp, json } = format

const winstonRotate = require('winston-daily-rotate-file')
const fs = require('fs')

const config = require('../config.local.js')
const { logPath, shouldLogToFile } = config

const logFormat = combine(
  label({ label: 'Healthcheck' }),
  timestamp(),
  json()
)

const transportsSetup = [
  new (transports.Console)({
    format: logFormat,
    colorize: false,
    level: 'verbose'
  })
]

if (shouldLogToFile) {
  // Create the log directory if it does not exist
  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath)
  }

  transportsSetup.push(new (winstonRotate)({
    filename: `${logPath}/healthcheck.log`,
    format: logFormat,
    datePattern: 'YYYY-MM-DD',
    prepend: true,
    level: 'verbose'
  }))
}

const logger = createLogger({ transports: transportsSetup })

module.exports = logger
