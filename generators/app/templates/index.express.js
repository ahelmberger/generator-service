'use strict';

const express = require('express');
const cors = require('cors');
const gracefulShutdown = require('http-graceful-shutdown');

// Define some default values if not set in environment
const PORT = process.env.PORT || 3000;
const SHUTDOWN_TIMEOUT = process.env.SHUTDOWN_TIMEOUT || 10000;
const SERVICE_CHECK_HTTP = process.env.SERVICE_CHECK_HTTP || '/healthcheck';

// Create a new express app
const app = express();

// Add CORS headers
app.use(cors());

// Add health check endpoint
app.get(SERVICE_CHECK_HTTP, (req, res) => res.send({ uptime: process.uptime() }));

// Add all other service routes
app.get('/', (req, res) => res.send('Hello World'));

// Start the server
const server = app.listen(PORT);
console.log('Service listening on port %s ...', PORT);

// Enable graceful server shutdown when process is terminated
gracefulShutdown(server, { timeout: SHUTDOWN_TIMEOUT });
