import path from "path";

let config = {};

config.logFileDir = path.join(__dirname, '../../log');
config.logFileName = 'app.log';
config.dbUser = process.env.dbUser || 'postgres';
config.dbPassword = process.env.dbPassword || '1234';
config.dbHost = process.env.dbHost || 'localhost';
config.dbPort = process.env.dbPort || '5432';
config.dbName = process.env.dbName || 'petshop';
config.serverPort = process.env.serverPort || 3000;

export default config;