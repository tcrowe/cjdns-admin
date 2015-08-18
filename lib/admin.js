var utilities = require('./utilities'),
	validation = utilities.validation,
	eventemitter4 = require('eventemitter4'),
	request = require('./request'),
	response = require('./response'),
	dgram = require('dgram'),
	adminModules;

// these modules belong to admin
adminModules = [
	'allocator',
	'authorizedPasswords',
	'core',
	'interfaceController',
	'ipTunnel',
	'janitor',
	'log',
	'nodeStore',
	'routerModule',
	'searchRunner',
	'security',
	'sessionManager',
	'switchPinger',
	'udpInterface'
];

/**
 * Admin constructor
 * @param  {object} options Optional configuration for the Admin constructor.
 * @return {object}         Admin object
 */
function Admin(options) {

	var ip,
		port,
		config = {},
		admin,
		cookie,
		ping,
		memory,
		asyncEnabled,
		availableFunctions;

	if (!options || (options && !options.password)) {
		throw Error('Admin constructor, options are required with at least a password');
	}

	config.password = options.password;

	ip = options.ip || '127.0.0.1';

	// validate ip, must be an ipv4 or ipv6
	if (ip && (!validation.ipv4(ip) || !validation.ipv6(ip))) {
		config.ip = ip;
	} else {
		// invalid ip
		throw Error('Admin constructor, valid ip required');
	}

	port = options.port || 11234;

	// validate port
	if (validation.unsignedInt(port)) {
		config.port = port;
	} else {
		throw Error('Admin constructor, valid port required');
	}

	// automatically remove requests after they are complete
	if (options.autoClean) {
		config.autoClean = true;
	}

	admin = new eventemitter4();
	admin.config = config;
	admin.socket = dgram.createSocket('udp4');
	admin.request = request(admin);
	admin.response = response(admin);

	// store the models so we can look up request options
	admin.models = {};

	// store requests so we can send them back with responses
	admin.requests = {};

	// handle each message
	admin.socket.on('message', admin.response.auto);

	function loadAdminModule(moduleName) {
		// require each module passing the admin object
		// the module will inject functions into the admin object
		require('./admin/' + moduleName)(admin);
	}

	// lazy load each admin module if is it accessed
	adminModules.forEach(loadAdminModule);

	asyncEnabled = admin.request.auto({
		restricted: false,
		func: 'Admin_asyncEnabled'
	});

	availableFunctions = admin.request.auto({
		restricted: false,
		func: 'Admin_availableFunctions',
		args: {
			page: {
				required: false,
				type: 'int'
			}
		}
	});

	cookie = admin.request.auto({
		restricted: false,
		func: 'cookie'
	});

	memory = admin.request.auto({
		restricted: true,
		func: 'Allocator_bytesAllocated'
	});

	ping = admin.request.auto({
		restricted: false,
		func: 'ping'
	});

	admin.Admin_asyncEnabled = asyncEnabled;
	admin.asyncEnabled = asyncEnabled;

	admin.cookie = cookie;
	admin.memory = memory;
	admin.ping = ping;

	admin.Admin_availableFunctions = availableFunctions;
	admin.availableFunctions = availableFunctions;

	return admin;
};

module.exports = Admin;
