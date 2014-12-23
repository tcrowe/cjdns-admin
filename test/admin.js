var assert = require('assert'),
	fixtures = require('./fixtures'),
	Admin = require('../lib/admin'),
	admin,
	port = process.env.CJDNS_ADMIN_PORT || 11234,
	ip = process.env.CJDNS_ADMIN_IP || '127.0.0.1',
	password;

/*if (!process.env.CJDNS_ADMIN_IP) {
	throw Error('the environment variable `CJDNS_ADMIN_IP` is required to run these tests');
}

if (!process.env.CJDNS_ADMIN_PORT) {
	throw Error('the environment variable `CJDNS_ADMIN_PORT` is required to run these tests');
}*/

if (!process.env.CJDNS_ADMIN_PASSWORD) {
	throw Error('the environment variable `CJDNS_ADMIN_PASSWORD` is required to run these tests');
}

// set this environment variable to make it work
password = process.env.CJDNS_ADMIN_PASSWORD;

/**
 * Test a standard request-response admin function.
 * @param  {string} options.name        The admin function name for display purposes.
 * @param  {function} options.member      The admin function.
 * @param  {object} options.options     The `args` associated with the function.
 * @param  {boolean} options.logResponse Log the response to the console for debugging.
 */
function requestResponse(options) {
	var name,
		member,
		memberOptions,
		logResponse;
	name = options.name;
	member = options.member;
	if (options.options) {
		memberOptions = options.options;
	}
	if (options.logResponse) {
		logResponse = options.logResponse;
	}
	if (options.skip) {
		console.log('skipping test', name);
		return;
	}
	describe('#' + name, function() {
		it('should get a response', function(done) {
			var channel;
			if (memberOptions) {
				channel = member(memberOptions);
			} else {
				channel = member();
			}
			admin.on(channel, function(res) {
				if (logResponse) {
					console.log(res);
				}
				assert.equal(typeof res, 'object');
				assert(res.func);
				assert(res.channel && res.channel === channel);
				assert(res.data);
				assert(res.errors && res.errors.length === 0);
				done();
			});
		});
	});
}

function assertObject(obj) {
	return function() {
		assert.equal(typeof obj, 'object');
	};
}

describe('Admin', function() {
	describe('constructor, password only', function() {
		admin = Admin({
			password: password
		});
		it('should return an object', assertObject(admin));
	});
	
	describe('constructor, ip and password', function() {
		admin = Admin({
			ip: ip,
			password: password
		});
		it('should return an object', assertObject(admin));
	});

	describe('constructor, port and password', function() {
		admin = Admin({
			port: port,
			password: password
		});
		it('should return an object', assertObject(admin));
	});

	describe('constructor, full', function() {
		admin = Admin({
			ip: ip,
			port: port,
			password: password,
			autoClean: true
		});
		it('should return an object', assertObject(admin));
	});

	describe('check for presence of all members', function () {
		it('should contain each member in `fixtures.allMembers`', function (done) {
			fixtures.allMembers.forEach(function(func) {
				var member = admin;
				// some members are objects with admin functions on them
				if (func.indexOf('.') > -1) {
					// this member is an object
					func = func.split('.');
					// crawl the name until we get the function
					func.forEach(function (memberPart) {
						member = member[memberPart];
					});
				} else {
					member = member[func];
				}
				// test for member existence
				// console.log(func, typeof member);
				assert.equal(typeof member, 'function');
			});
			done();
		});
	});
	
	//
	// Admin_asyncEnabled
	// 
	requestResponse({
		name: 'Admin_asyncEnabled',
		member: admin.Admin_asyncEnabled
	});
	requestResponse({
		name: 'asyncEnabled',
		member: admin.asyncEnabled
	});

	//
	// Admin_availableFunctions
	// 
	requestResponse({
		name: 'Admin_availableFunctions',
		member: admin.Admin_availableFunctions
	});

	requestResponse({
		name: 'availableFunctions',
		member: admin.availableFunctions
	});

	requestResponse({
		name: 'Admin_availableFunctions, with arguments',
		member: admin.Admin_availableFunctions,
		options: {
			page: 0
		}
	});

	requestResponse({
		name: 'availableFunctions, with arguments',
		member: admin.availableFunctions,
		options: {
			page: 0
		}
	});

	//
	// cookie
	//
	requestResponse({
		name: 'cookie',
		member: admin.cookie
	});

	//
	// ping
	//
	requestResponse({
		name: 'ping',
		member: admin.ping
	});

	// test the rest of the admin modules
	fixtures.moduleList.forEach(function(moduleName) {
		require('./admin/' + moduleName)(requestResponse, admin);
	});

});
