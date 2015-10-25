'use strict';

const koa = require('koa');
const cors = require('koa-cors');
const route = require('koa-route');
const gracefulShutdown = require('http-graceful-shutdown');

// Define some default values if not set in environment
const PORT = process.env.PORT || 3000;
const SHUTDOWN_TIMEOUT = process.env.SHUTDOWN_TIMEOUT || 10000;
const SERVICE_CHECK_HTTP = process.env.SERVICE_CHECK_HTTP || '/healthcheck';

// Create a new koa app
const app = koa();

// Add CORS headers
app.use(cors());

// Add health check endpoint
app.use(route.get(SERVICE_CHECK_HTTP, function *() {
  this.body = { uptime: process.uptime() };
}));

// Add all other service routes
app.use(route.get('/', function *() {
  this.body = 'Hello World';
}));

// Start the server
const server = app.listen(PORT);
console.log('Service listening on port %s ...', PORT);

// Enable graceful server shutdown when process is terminated
gracefulShutdown(server, { timeout: SHUTDOWN_TIMEOUT });
