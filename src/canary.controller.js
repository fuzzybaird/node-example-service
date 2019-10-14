module.exports = (req, res) => {
	res.send({
		description: process.env.npm_package_description,
		host: process.env.COMPUTERNAME,
		name: process.env.npm_package_name,
		pid: process.pid,
		platform: process.platform,
		version: process.env.npm_package_version
	});
};
