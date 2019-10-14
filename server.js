const { startExpress } = require('./src/express-setup');
const APP_NAME = process.env.npm_package_name;
const APP_VERSION = process.env.npm_package_version;
const config = require('rc')(APP_NAME, {
	http: {
		path: '/',
		port: 8080
	}
});

startExpress(config).then(() => {
	console.log(`Listening on port ${config.http.port}`);
});
