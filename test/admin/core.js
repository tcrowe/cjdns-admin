module.exports = function(requestResponse, admin) {

	//
	// Core_exit
	//
	requestResponse({
		name: 'Core_exit',
		member: admin.Core_exit,
		logResponse: true,
		skip: true
	});

	requestResponse({
		name: 'core.exit',
		member: admin.core.exit,
		logResponse: true,
		skip: true
	});

	//
	// Core_initTunnel
	//
	requestResponse({
		name: 'Core_initTunnel',
		member: admin.Core_initTunnel,
		options: {
			desiredTunName: 'utun3'
		},
		logResponse: true,
		skip: true
	});

	requestResponse({
		name: 'core.initTunnel',
		member: admin.core.initTunnel,
		options: {
			desiredTunName: 'utun4'
		},
		logResponse: true,
		skip: true
	});

	//
	// Core_pid
	//
	requestResponse({
		name: 'Core_pid',
		member: admin.Core_pid
	});

	requestResponse({
		name: 'core.pid',
		member: admin.core.pid
	});
	
};
