// Dependencies
const db = require('mongoose');
import chalk from 'chalk';

// Debug Settings
const debug = require('debug')('contacts-api:DB');

// Enviroment
const dbUri =
    process.env.ENV === 'dev'
        ? process.env.DB_URL_DEV
        : process.env.DB_URL_PROD;

db.connect(dbUri, {
    keepAliveInitialDelay: 300000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

db.connection.on('connected', () => {
    console.log(`${chalk.green('[contacts-api:DB]')} MongoDB conectado`);
    debug('MongoDB connection open to ' + dbUri);
});

db.connection.on('error', (error) => {
    console.log(error);
    console.log(
        `${chalk.red('[contacts-api:DB]')} MongoDB error de conexión ${error}`,
    );
});

db.connection.on('disconnected', () => {
    console.log(
        `${chalk.red('[contacts-api:DB]')} MongoDB conexión desconectada`,
    );
});

process.on('SIGINT', () => {
    db.connection.close(() => {
        console.log(
            `${chalk.red(
                '[contacts-api:DB]',
            )} MongoDB conexión desconectada a través de la terminación de la aplicación`,
        );
        process.exit(0);
    });
});

// Use native promises
db.Promise = global.Promise;

module.exports = db;
