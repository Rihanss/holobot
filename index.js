module.exports = require('./src/app');

process.on('unhandledRejection', e => console.error(e))
.on('uncaughtException', e => console.error(e));