# generator-service

[Yeoman](http://yeoman.io) generator for REST services using [express](http://expressjs.com/) or [koa](http://koajs.com/)

## Features

* Choose between [express](http://expressjs.com/) and [koa](http://koajs.com/) as application frameworks
* Choose between [mocha](http://mochajs.org/) and [jasmine](https://github.com/mhevery/jasmine-node) as test frameworks
* When using mocha, choose between [expect.js](https://github.com/Automattic/expect.js), [should.js](http://shouldjs.github.io/) and [chai](http://chaijs.com/) as assertion libraries
* Enables CORS
* Enables graceful server shutdown
* Creates a health check endpoint (e.g. for use with [registrator](http://gliderlabs.com/registrator/latest/) and/or [consul](https://consul.io/))
* Creates a Dockerfile based on the [alpine-node](https://hub.docker.com/r/mhart/alpine-node/) image
* Creates [npm scripts](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/) for running, testing, building and live-reloading/testing of the application

NOTE: This service template is by default optimized for use with node.js 4.x but can be easily adapted to earlier versions.

## Getting Started

To install yeoman from npm, run:

```bash
npm install -g yo
```

To install generator-service from npm, run:

```bash
npm install -g generator-service
```

Finally, initiate the generator:

```bash
yo service
```

## License

MIT
