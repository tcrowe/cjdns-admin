
var assert = require('assert'),
	Admin = require('../lib/admin'),
	admin,
	port = process.env.CJDNS_ADMIN_PORT || 11234,
	ip = process.env.CJDNS_ADMIN_IP || '127.0.0.1',
	password;

if (!process.env.CJDNS_ADMIN_PASSWORD) {
	throw Error('the environment variable `CJDNS_ADMIN_PASSWORD` is required to run these tests');
}

// set this environment variable to make it work
password = process.env.CJDNS_ADMIN_PASSWORD;

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
});
