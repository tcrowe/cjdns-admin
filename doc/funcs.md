<a name="Admin_asyncEnabled"></a>
### Admin_asyncEnabled, asyncEnabled

Usage:
```js
channel = admin.asyncEnabled();
admin.once(channel, processResponse);
```

<a name="Admin_availableFunctions"></a>
### Admin_availableFunctions, availableFunctions
+ page, int, optional

Usage:
```js
var channel,
	options;

options = {
	page: 0
};

channel = admin.availableFunctions(options);
admin.once(channel, processResponse);
```

<a name="AdminLog_subscribe"></a>
### AdminLog_subscribe, log.subscribe
+ file, string, optional
+ level, string, optional
+ line, int, optional

Usage:
```js
var channel,
	options;

options = {
	file: '',
	level: '',
	line: 0
};

channel = admin.log.subscribe(options);
admin.once(channel, processResponse);
```

<a name="AdminLog_unsubscribe"></a>
### AdminLog_unsubscribe, log.unsubscribe
+ streamId, string, required

Usage:
```js
var channel,
	options;

options = {
	streamId: ''
};

channel = admin.log.unsubscribe(options);
admin.once(channel, processResponse);
```

<a name="Allocator_bytesAllocated"></a>
### Allocator_bytesAllocated, allocator.bytesAllocated

Usage:
```js
channel = admin.allocator.bytesAllocated();
admin.once(channel, processResponse);
```

<a name="Allocator_snapshot"></a>
### Allocator_snapshot, allocator.snapshot
+ includeAllocations, int, optional

Usage:
```js
var channel,
	options;

options = {
	includeAllocations: 0
};

channel = admin.allocator.snapshot(options);
admin.once(channel, processResponse);
```

<a name="AuthorizedPasswords_add"></a>
### AuthorizedPasswords_add, authorizedPasswords.add
+ authType, int, optional
+ ipv6, string, optional
+ password, string, required
+ user, string, required

Usage:
```js
var channel,
	options;

options = {
	authType: 0,
	ipv6: '',
	password: '',
	user: ''
};

channel = admin.authorizedPasswords.add(options);
admin.once(channel, processResponse);
```

<a name="AuthorizedPasswords_list"></a>
### AuthorizedPasswords_list, authorizedPasswords.list

Usage:
```js
channel = admin.authorizedPasswords.list();
admin.once(channel, processResponse);
```

<a name="AuthorizedPasswords_remove"></a>
### AuthorizedPasswords_remove, authorizedPasswords.remove
+ user, string, required

Usage:
```js
var channel,
	options;

options = {
	user: ''
};

channel = admin.authorizedPasswords.remove(options);
admin.once(channel, processResponse);
```

<a name="Core_exit"></a>
### Core_exit, core.exit

Usage:
```js
channel = admin.core.exit();
admin.once(channel, processResponse);
```

<a name="Core_initTunnel"></a>
### Core_initTunnel, core.initTunnel
+ desiredTunName, string, optional

Usage:
```js
var channel,
	options;

options = {
	desiredTunName: ''
};

channel = admin.core.initTunnel(options);
admin.once(channel, processResponse);
```

<a name="InterfaceController_disconnectPeer"></a>
### InterfaceController_disconnectPeer, interfaceController.disconnectPeer
+ pubkey, string, required

Usage:
```js
var channel,
	options;

options = {
	pubkey: ''
};

channel = admin.interfaceController.disconnectPeer(options);
admin.once(channel, processResponse);
```

<a name="InterfaceController_peerStats"></a>
### InterfaceController_peerStats, interfaceController.peerStats
+ page, int, optional

Usage:
```js
var channel,
	options;

options = {
	page: 0
};

channel = admin.interfaceController.peerStats(options);
admin.once(channel, processResponse);
```

<a name="IpTunnel_allowConnection"></a>
### IpTunnel_allowConnection, ipTunnel.allowConnection
+ ip4Address, string, optional
+ ip6Address, string, optional
+ publicKeyOfAuthorizedNode, string, required

Usage:
```js
var channel,
	options;

options = {
	ip4Address: '',
	ip6Address: '',
	publicKeyOfAuthorizedNode: ''
};

channel = admin.ipTunnel.allowConnection(options);
admin.once(channel, processResponse);
```

<a name="IpTunnel_connectTo"></a>
### IpTunnel_connectTo, ipTunnel.connectTo
+ publicKeyOfNodeToConnectTo, string, required

Usage:
```js
var channel,
	options;

options = {
	publicKeyOfNodeToConnectTo: ''
};

channel = admin.ipTunnel.connectTo(options);
admin.once(channel, processResponse);
```

<a name="IpTunnel_listConnections"></a>
### IpTunnel_listConnections, ipTunnel.listConnections

Usage:
```js
channel = admin.ipTunnel.listConnections();
admin.once(channel, processResponse);
```

<a name="IpTunnel_removeConnection"></a>
### IpTunnel_removeConnection, ipTunnel.removeConnection
+ connection, int, required

Usage:
```js
var channel,
	options;

options = {
	connection: 0
};

channel = admin.ipTunnel.removeConnection(options);
admin.once(channel, processResponse);
```

<a name="IpTunnel_showConnection"></a>
### IpTunnel_showConnection, ipTunnel.showConnection
+ connection, int, required

Usage:
```js
var channel,
	options;

options = {
	connection: 0
};

channel = admin.ipTunnel.showConnection(options);
admin.once(channel, processResponse);
```

<a name="memory"></a>
### memory, memory

Usage:
```js
channel = admin.memory();
admin.once(channel, processResponse);
```

<a name="NodeStore_dumpTable"></a>
### NodeStore_dumpTable, nodeStore.dumpTable
+ page, int, required

Usage:
```js
var channel,
	options;

options = {
	page: 0
};

channel = admin.nodeStore.dumpTable(options);
admin.once(channel, processResponse);
```

<a name="NodeStore_getLink"></a>
### NodeStore_getLink, nodeStore.getLink
+ linkNum, int, required
+ parent, string, required

Usage:
```js
var channel,
	options;

options = {
	linkNum: 0,
	parent: ''
};

channel = admin.nodeStore.getLink(options);
admin.once(channel, processResponse);
```

<a name="NodeStore_getRouteLabel"></a>
### NodeStore_getRouteLabel, nodeStore.getRouteLabel
+ pathParentToChild, string, required
+ pathToParent, string, required

Usage:
```js
var channel,
	options;

options = {
	pathParentToChild: '',
	pathToParent: ''
};

channel = admin.nodeStore.getRouteLabel(options);
admin.once(channel, processResponse);
```

<a name="NodeStore_nodeForAddr"></a>
### NodeStore_nodeForAddr, nodeStore.nodeForAddr
+ ip, string, optional

Usage:
```js
var channel,
	options;

options = {
	ip: ''
};

channel = admin.nodeStore.nodeForAddr(options);
admin.once(channel, processResponse);
```

<a name="ping"></a>
### ping, ping

Usage:
```js
channel = admin.ping();
admin.once(channel, processResponse);
```

<a name="RainflyClient_addKey"></a>
### RainflyClient_addKey, rainflyClient.addKey
+ ident, string, required

Usage:
```js
var channel,
	options;

options = {
	ident: ''
};

channel = admin.rainflyClient.addKey(options);
admin.once(channel, processResponse);
```

<a name="RainflyClient_addServer"></a>
### RainflyClient_addServer, rainflyClient.addServer
+ addr, string, required

Usage:
```js
var channel,
	options;

options = {
	addr: ''
};

channel = admin.rainflyClient.addServer(options);
admin.once(channel, processResponse);
```

<a name="RainflyClient_minSignatures"></a>
### RainflyClient_minSignatures, rainflyClient.minSignatures
+ count, int, required

Usage:
```js
var channel,
	options;

options = {
	count: 0
};

channel = admin.rainflyClient.minSignatures(options);
admin.once(channel, processResponse);
```

<a name="RouterModule_findNode"></a>
### RouterModule_findNode, routerModule.findNode
+ nodeToQuery, string, required
+ target, string, required
+ timeout, int, optional

Usage:
```js
var channel,
	options;

options = {
	nodeToQuery: '',
	target: '',
	timeout: 0
};

channel = admin.routerModule.findNode(options);
admin.once(channel, processResponse);
```

<a name="RouterModule_getPeers"></a>
### RouterModule_getPeers, routerModule.getPeers
+ nearbyPath, string, optional
+ path, string, required
+ timeout, int, optional

Usage:
```js
var channel,
	options;

options = {
	nearbyPath: '',
	path: '',
	timeout: 0
};

channel = admin.routerModule.getPeers(options);
admin.once(channel, processResponse);
```

<a name="RouterModule_lookup"></a>
### RouterModule_lookup, routerModule.lookup
+ address, string, required

Usage:
```js
var channel,
	options;

options = {
	address: ''
};

channel = admin.routerModule.lookup(options);
admin.once(channel, processResponse);
```

<a name="RouterModule_pingNode"></a>
### RouterModule_pingNode, routerModule.pingNode
+ path, string, required
+ timeout, int, optional

Usage:
```js
var channel,
	options;

options = {
	path: '',
	timeout: 0
};

channel = admin.routerModule.pingNode(options);
admin.once(channel, processResponse);
```

<a name="SearchRunner_showActiveSearch"></a>
### SearchRunner_showActiveSearch, searchRunner.showActiveSearch
+ number, int, required

Usage:
```js
var channel,
	options;

options = {
	number: 0
};

channel = admin.searchRunner.showActiveSearch(options);
admin.once(channel, processResponse);
```

<a name="Security_checkPermissions"></a>
### Security_checkPermissions, security.checkPermissions

Usage:
```js
channel = admin.security.checkPermissions();
admin.once(channel, processResponse);
```

<a name="Security_dropPermissions"></a>
### Security_dropPermissions, security.dropPermissions

Usage:
```js
channel = admin.security.dropPermissions();
admin.once(channel, processResponse);
```

<a name="Security_setUser"></a>
### Security_setUser, security.setUser
+ user, string, required

Usage:
```js
var channel,
	options;

options = {
	user: ''
};

channel = admin.security.setUser(options);
admin.once(channel, processResponse);
```

<a name="SessionManager_getHandles"></a>
### SessionManager_getHandles, sessionManager.getHandles
+ page, int, optional

Usage:
```js
var channel,
	options;

options = {
	page: 0
};

channel = admin.sessionManager.getHandles(options);
admin.once(channel, processResponse);
```

<a name="SessionManager_sessionStats"></a>
### SessionManager_sessionStats, sessionManager.sessionStats
+ handle, int, required

Usage:
```js
var channel,
	options;

options = {
	handle: 0
};

channel = admin.sessionManager.sessionStats(options);
admin.once(channel, processResponse);
```

<a name="SwitchPinger_ping"></a>
### SwitchPinger_ping, switchPinger.ping
+ data, string, optional
+ keyPing, int, optional
+ path, string, required
+ timeout, int, optional

Usage:
```js
var channel,
	options;

options = {
	data: '',
	keyPing: 0,
	path: '',
	timeout: 0
};

channel = admin.switchPinger.ping(options);
admin.once(channel, processResponse);
```

<a name="UDPInterface_beginConnection"></a>
### UDPInterface_beginConnection, udpInterface.beginConnection
+ address, string, required
+ interfaceNumber, int, optional
+ password, string, optional
+ publicKey, string, required

Usage:
```js
var channel,
	options;

options = {
	address: '',
	interfaceNumber: 0,
	password: '',
	publicKey: ''
};

channel = admin.udpInterface.beginConnection(options);
admin.once(channel, processResponse);
```

<a name="UDPInterface_new"></a>
### UDPInterface_new, udpInterface.new
+ bindAddress, string, optional

Usage:
```js
var channel,
	options;

options = {
	bindAddress: ''
};

channel = admin.udpInterface.new(options);
admin.once(channel, processResponse);
```

