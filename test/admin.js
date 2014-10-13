
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

function requestResponse (name, member, options, logResponse) {
	describe('#' + name, function () {
		it('should get a response',function (done) {
			var channel = member(options);
			admin.on(channel, function (res) {
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

function assertObject (obj) {
	return function () {
		assert.equal(typeof obj, 'object');
	};
}

describe('Admin', function () {
	describe('constructor, password only', function () {
		admin = Admin({
			password: password
		});
		it('should return an object', assertObject(admin));
	});
	describe('constructor, ip and password', function () {
		admin = Admin({
			ip: ip,
			password: password
		});
		it('should return an object', assertObject(admin));
	});
	describe('constructor, port and password', function () {
		admin = Admin({
			port: port,
			password: password
		});
		it('should return an object', assertObject(admin));
	});
	describe('constructor, full', function () {
		admin = Admin({
			ip: ip,
			port: port,
			password: password,
			autoClean: true
		});
		it('should return an object', assertObject(admin));
	});

	//
	// cookie
	//
	requestResponse('cookie', admin.cookie);

	//
	// ping
	//
	requestResponse('ping', admin.ping);

	//
	// memory, calls Allocator_bytesAllocated
	// memory call is depricated
	//
	requestResponse('memory', admin.memory);

	//
	// Admin_asyncEnabled
	// 
	requestResponse('Admin_asyncEnabled', admin.Admin_asyncEnabled);
	requestResponse('asyncEnabled', admin.asyncEnabled);

	//
	// Admin_availableFunctions
	// 
	requestResponse('Admin_availableFunctions',
		admin.Admin_availableFunctions);
	requestResponse('availableFunctions',
		admin.availableFunctions);

	requestResponse('Admin_availableFunctions, with arguments',
		admin.Admin_availableFunctions,
		{ page: 0 });
	requestResponse('availableFunctions, with arguments',
		admin.availableFunctions,
		{ page: 0 });

	//
	// Allocator_bytesAllocated
	// 
	requestResponse('Allocator_bytesAllocated',
		admin.Allocator_bytesAllocated);
	requestResponse('allocator.bytesAllocated',
		admin.allocator.bytesAllocated);

	//
	// Allocator_snapshot
	// 
	requestResponse('Allocator_snapshot',
		admin.Allocator_snapshot);
	requestResponse('allocator.snapshot',
		admin.allocator.snapshot);

	requestResponse('Allocator_snapshot, with arguments',
		admin.Allocator_snapshot, { includeAllocations: 1 });
	requestResponse('allocator.snapshot, with arguments',
		admin.allocator.snapshot, { includeAllocations: 1 });

	//
	// AuthorizedPasswords_add
	//
	var testUser1 = 'testuser' + Math.random().toString().substring(2, 8),
		testUser2 = 'testuser' + Math.random().toString().substring(2, 8);
	requestResponse('AuthorizedPasswords_add',
		admin.AuthorizedPasswords_add,
		{ user: testUser1, password: testUser1 });
	// TODO figure out why this one crashes cjdroute
	/*requestResponse('authorizedPasswords.add',
		admin.authorizedPasswords.add,
		{ user: testUser2, password: testUser2 });*/
	
	//
	// AuthorizedPasswords_list
	//
	requestResponse('AuthorizedPasswords_list',
		admin.AuthorizedPasswords_list);
	requestResponse('authorizedPasswords.list',
		admin.authorizedPasswords.list);

	//
	// AuthorizedPasswords_remove
	//
	requestResponse('AuthorizedPasswords_remove',
		admin.AuthorizedPasswords_remove,
		{ user: testUser1 });
	// TODO figure out why this one crashes cjdroute
	/*requestResponse('authorizedPasswords.remove',
		admin.authorizedPasswords.remove,
		{ user: testUser2 });*/

	//
	// InterfaceController_disconnectPeer
	//
	// TODO come up with a good test case for this
	/*requestResponse('InterfaceController_disconnectPeer',
		admin.InterfaceController_disconnectPeer,
		{ pubkey: '???' });*/

	//
	// InterfaceController_peerStats
	//
	requestResponse('InterfaceController_peerStats',
		admin.InterfaceController_peerStats);
	requestResponse('InterfaceController_peerStats, with arguments',
		admin.InterfaceController_peerStats,
		{ page: 0 });
	requestResponse('interfaceController.peerStats',
		admin.interfaceController.peerStats);
	requestResponse('interfaceController.peerStats',
		admin.interfaceController.peerStats,
		{ page: 0 });

	//
	// NodeStore_dumpTable
	//
	requestResponse('NodeStore_dumpTable',
		admin.NodeStore_dumpTable,
		{ page: 0 });

	//
	// NodeStore_getLink
	//
	// TODO figure out how to use this
	/*requestResponse('NodeStore_getLink',
		admin.NodeStore_getLink);
	requestResponse('NodeStore_getLink, with arguments',
		admin.NodeStore_dumpTable,
		{ linkNum: 0, parent: '???' });*/
	

	//
	// NodeStore_getRouteLabel
	//
	// TODO figure out how to use this
	/*requestResponse('NodeStore_getRouteLabel',
		admin.NodeStore_getRouteLabel,
		{ pathParentToChild: '???', pathToParent: '???' });*/

	//
	// NodeStore_nodeForAddr
	//
	// TODO figure out how to use this
	/*requestResponse('NodeStore_nodeForAddr',
		admin.NodeStore_nodeForAddr,
		{ ip: '???' });*/

	

	//
	// subscriber types
	//
	/*describe('#AdminLog_subscribe', function () {
		it('should have several responses', function (done) {
			var channel = admin.AdminLog_subscribe(),
				streamId,
				responseCount = 0;
			admin.on(channel, function (res) {
				console.log(res);
				assert.equal(typeof res, 'object');
				assert(res.func);
				assert(res.channel && res.channel === channel);
				assert(res.data);
				streamId = res.data.streamId;
				assert(res.errors && res.errors.length === 0);
				responseCount += 1;
				console.log('responseCount', responseCount);
				if (responseCount >= 3) {
					done();
				}
			});
		});
	});*/


});
