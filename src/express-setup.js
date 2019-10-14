/* eslint-disable no-console */
const express = require('express');
let server;

// Start up the Express service.
exports.startExpress = ({ http: { port, path } }) => {
	return new Promise((resolve) => {
		console.log('Starting Express...');
		let app = express();
		app.use(express.json());
		app.get('/', require('./canary.controller'));
		app.use(path, require('./router'));
		app.use(errorHandler);
		server = app.listen(port, () => {
			console.log('Express started.');
			resolve(app);
		});
	});
};

// Stops the Express service.
exports.stopExpress = async () => {
	if (!server) {
		return;
	}

	console.log('Stopping Express...');
	await server.close();
	console.log('Express stopped.');
};

// If an endpoint sends an Error to next(), it gets handled here. Note that
// although the next argument is not used here, it is required for Express to
// treat this function as an error handler.
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	if (!err.statusCode) {
		err.statusCode = 500;
	}

	if (err.statusCode >= 500) {
		console.error(err);
	}

	res.status(err.statusCode).send({ error: err.message });
};

process.on('SIGINT', () => {
	console.log('Received SIGINT');
	exports.stopExpress();
});
process.on('unhandledRejection', (reason, p) => {
	console.log('Unhandled rejection at:', p, 'reason:', reason);
	exports.stopExpress();
});
