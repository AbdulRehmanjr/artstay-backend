import winston from 'winston';
import { env } from '~/env';
import path from 'path';
import fs from 'fs';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const isDevelopment = env.NODE_ENV === 'development';
  return isDevelopment ? 'debug' : 'warn';
};

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

winston.addColors(colors);

// Create custom format for clear and detailed logging
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => {
    const errorStack = info instanceof Error ? info.stack : '';
    return `[${info.timestamp}] ${info.level}: ${info.message}${errorStack ? '\n' + errorStack : ''}${
      info.metadata ? '\nMetadata: ' + JSON.stringify(info.metadata, null, 2) : ''
    }`;
  })
);

// Function to create daily folder
const createDailyFolder = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const folderPath = path.join('logs', `${year}-${month}-${day}`);
  
  // Create logs directory if it doesn't exist
  if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
  }
  
  // Create daily folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
  
  return folderPath;
};

// Custom transport for daily rotating files
const dailyErrorTransport = new winston.transports.File({
  filename: path.join(createDailyFolder(), 'error.log'),
  level: 'error',
  format: winston.format.combine(
    winston.format.uncolorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      const errorStack = info instanceof Error ? info.stack : '';
      return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}${errorStack ? '\n' + errorStack : ''}${
        info.metadata ? '\nMetadata: ' + JSON.stringify(info.metadata, null, 2) : ''
      }`;
    })
  )
});

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.simple()
    )
  }),
  dailyErrorTransport
];

// Create the logger
export const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

// Add error handling for the file transport
dailyErrorTransport.on('error', (error) => {
  console.error('Error writing to log file:', error);
});

// Example usage:
// logger.error('This is an error message', { metadata: { userId: 123 } });
// logger.error(new Error('This is an error with stack trace'));
// logger.info('This will only show in console, not in files');