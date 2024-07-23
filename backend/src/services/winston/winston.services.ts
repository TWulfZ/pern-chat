import winston, { format, transports  } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { timestamp, printf, colorize} = winston.format;

const logFormat = format.combine(
  colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
);

const fileRotateTransport = new DailyRotateFile({
  filename: 'logs/%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const consoleTransport = new transports.Console({
  format: format.combine(format.colorize(), logFormat),
});

const customLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: process.env['NODE_ENV'] === 'development' ? 4 : 2,
};

const winstonService = winston.createLogger({
  levels: customLevels,
  level: 'info',
  format: logFormat,
  transports: [fileRotateTransport, consoleTransport],
});

export default winstonService;