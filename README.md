# node-example-service
Example Node microservice

*This document has been automatically generated by the CHG CLI. It will describe the features available in the generated project. You should replace this with your own content that describes your project.*

## Automated testing
> Module: [jest](https://jestjs.io/)

To execute the automated tests, run `npm run test`.

TODO How to build tests

## Code analysis
> Module: [eslint](https://eslint.org/)

To lint the project and fix any problems found, run `npm run lint`.

## Configuration
> Module: [rc](https://www.npmjs.com/package/rc)

Configuration is handled using the popular configuration loader package
[rc](https://www.npmjs.com/package/rc). You can use command-line parameters, environment variables, or configuration files to configure the application. See the [rc documentation](https://www.npmjs.com/package/rc#standards) for details.

## Debugging
> Module: [nodemon](https://nodemon.io/)

To run the project in debug mode, run `npm run debug`. Remote debugging will be enabled and the app will restart when a source file changes.

## Monitoring

### Canary endpoint
The `/` path is routed to a "canary" endpoint. This is intended to be used by monitoring services to ensure that the microservice is running, and provides useful information about it. You can customize what appears in the canary payload by modifying `/src/canary.controller.js`.

TODO More monitoring


## Outgoing requests
> Modules: [request](https://www.npmjs.com/package/request), [request-promise-native](https://www.npmjs.com/package/request-promise-native)

See `/src/xkcd.controller.js` for a simple example.


## REST endpoints
> Module: [express](https://expressjs.com/)

Set up routes in `/src/router.js`.

Configuration points:

- `http.path` (default `'/'`): The path where the endpoints will be attached.
- `http.port` (default = `8080`): The port to listen on for web requests.
