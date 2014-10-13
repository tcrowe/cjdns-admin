
// it's messy, just for generating docs

var fs = require('fs'),
	path = require('path'),
	funcpath = path.join(__dirname, 'functions.json'),
	functions = JSON.parse(fs.readFileSync(funcpath).toString()),
	mapFunc,
	originalMax = 0,
	alternateMax = 0,
	col1 = [],
	col2 = [];

mapFunc = {
	Admin_asyncEnabled: 'asyncEnabled',
	Admin_availableFunctions: 'availableFunctions',
	AdminLog_subscribe: 'log.subscribe',
	AdminLog_unsubscribe: 'log.unsubscribe',
	Allocator_bytesAllocated: 'allocator.bytesAllocated',
	Allocator_snapshot: 'allocator.snapshot',
	AuthorizedPasswords_add: 'authorizedPasswords.add',
	AuthorizedPasswords_list: 'authorizedPasswords.list',
	AuthorizedPasswords_remove: 'authorizedPasswords.remove',
	Core_exit: 'core.exit',
	Core_initTunnel: 'core.initTunnel',
	InterfaceController_disconnectPeer: 'interfaceController.disconnectPeer',
	InterfaceController_peerStats: 'interfaceController.peerStats',
	IpTunnel_allowConnection: 'ipTunnel.allowConnection',
	IpTunnel_connectTo: 'ipTunnel.connectTo',
	IpTunnel_listConnections: 'ipTunnel.listConnections',
	IpTunnel_removeConnection: 'ipTunnel.removeConnection',
	IpTunnel_showConnection: 'ipTunnel.showConnection',
	memory: 'memory',
	NodeStore_dumpTable: 'nodeStore.dumpTable',
	NodeStore_getLink: 'nodeStore.getLink',
	NodeStore_getRouteLabel: 'nodeStore.getRouteLabel',
	NodeStore_nodeForAddr: 'nodeStore.nodeForAddr',
	ping: 'ping',
	RainflyClient_addKey: 'rainflyClient.addKey',
	RainflyClient_addServer: 'rainflyClient.addServer',
	RainflyClient_minSignatures: 'rainflyClient.minSignatures',
	RouterModule_findNode: 'routerModule.findNode',
	RouterModule_getPeers: 'routerModule.getPeers',
	RouterModule_lookup: 'routerModule.lookup',
	RouterModule_pingNode: 'routerModule.pingNode',
	SearchRunner_showActiveSearch: 'searchRunner.showActiveSearch',
	Security_checkPermissions: 'security.checkPermissions',
	Security_dropPermissions: 'security.dropPermissions',
	Security_setUser: 'security.setUser',
	SessionManager_getHandles: 'sessionManager.getHandles',
	SessionManager_sessionStats: 'sessionManager.sessionStats',
	SwitchPinger_ping: 'switchPinger.ping',
	UDPInterface_beginConnection: 'udpInterface.beginConnection',
	UDPInterface_new: 'udpInterface.new'
}

/*Object.keys(mapFunc).forEach(function (key) {
	console.log(key, mapFunc[key]);
});

return;*/

function documentationOutput(fob) {
	var func = fob.func,
		args = fob.args,
		args2 = Object.keys(args);
	console.log('<a name="' + func + '"></a>');
	console.log('###', func + ', ' + mapFunc[func]);
	if (args2.length > 0) {
		Object.keys(args).forEach(function (key) {
			var arg = args[key],
				required = (arg.required === 1) ? 'required': 'optional',
				typename = arg.type.toLowerCase();
			if (typename === 'int') {
				// typename = 'number';
			}
			console.log('+ ' + key + ', ' + typename + ', ' + required);
		});
	}
	console.log();
	console.log('Usage:');
	console.log('```js');
	if (args2.length > 0) {
		console.log('var channel,\n\toptions;');
		console.log();
		console.log('options = {');
		Object.keys(args).forEach(function (key, index, arr) {
			var arg = args[key],
				required = (arg.required === 1) ? 'required': 'optional',
				typename = arg.type.toLowerCase(),
				data,
				comma = '';
			if (typename === 'int') {
				// typename = 'number';
				data = 0;
			} else {
				data = '\'\'';
			}
			if (index < arr.length - 1) {
				comma = ','
			}
			console.log('\t' + key + ': ' + data + comma);
		});
		console.log('};');
		console.log();
		console.log('channel = admin.' + mapFunc[func] + '(options);');
	} else {
		console.log('channel = admin.' + mapFunc[func] + '();');
	}
	console.log('admin.once(channel, processResponse);');
	console.log('```');
	console.log();
}

function sortFuncs (a, b) {
	var f1 = a.func.toLowerCase(),
		f2 = b.func.toLowerCase();
	if (f1 > f2) {
		return 1
	} else if (f1 < f2) {
		return -1;
	}
	return 0;
}

function padded(str, max, character) {
	var op = str,
		character = character || ' ';
	while (op.length < max) {
		op += character;
	}
	return op;
}

function table () {
	var orig,
		alt;
	Object.keys(mapFunc).forEach(function (key) {
		var f1 = '[' + key + '](#' + key + ')',
			f2 = '[' + mapFunc[key] + '](#' + key + ')';
		col1.push(f1);
		col2.push(f2);
		if (key.length > originalMax) {
			originalMax = f1.length;
		}
		if (mapFunc[key].length > alternateMax) {
			alternateMax = f2.length;
		}
	});
	orig = padded('Original', originalMax);
	alt = padded('Alternate', alternateMax);
	console.log('| ' + orig + ' | ' + alt + ' |');
	orig = padded('', originalMax, '-');
	alt = padded('', alternateMax, '-');
	console.log('|-' + orig + '-|-' + alt + '-|');
	col1.forEach(function (item, index, arr) {
		var f1 = padded(item, originalMax),
			f2 = padded(col2[index], alternateMax);
		console.log('| ' + f1 + ' | ' + f2 + ' |');
	});
}

functions.sort(sortFuncs);

// table();
// console.log();
functions.forEach(documentationOutput);
