
# cjdns-admin
---
A nodejs module for working with the [CJDNS](https://github.com/cjdelisle/cjdns) admin interface over UDP. It's made to be consistent, robust and easy to use.

## Development
---
Create environment variables that the tests will look for:
```
# cjdns development environment
export CJDNS_ADMIN_PORT=11234
export CJDNS_ADMIN_IP=127.0.0.1
export CJDNS_ADMIN_PASSWORD=from your cjdroute config
```

Tools are available via npm scripts. See `package.json` in the `scripts` section.
```
npm run lint
npm test
```

## Install
---
It's available via [npm](https://www.npmjs.com/package/cjdns-admin)
```
npm install cjdns-admin
```

## Admin
---
The `Admin` function returns an [EventEmitter4](https://github.com/eriksank/eventemitter4) with members for each admin function and their alternate. It also contains members which handle automatic paging for functions which are paged.

Options:
+ ip, string, optional
+ port, number, optional
+ password, string, required

Usage:
```js
var admin,
    channel;

// create a new Admin
admin = require('cjdns-admin').Admin({
    ip: '127.0.0.1',
    port: 11234,
    password: 'my cjdns password'
});

// ping the admin
channel = admin.ping();

// create a response handler
function pingResponse (res) {
    // process ping response
    console.dir(res);
}

// handle the response
admin.on(channel, pingResponse);
```

---

## CJDNS Admin functions
+ Original: named the same as CJDNS calls them
+ Alternate: consistent with normal JS function nomenclature
+ Underneath they call the same function

| Original                                  | Alternate                                 |
|-------------------------------------------|-------------------------------------------|
| [Admin_asyncEnabled](#Admin_asyncEnabled) | [admin.asyncEnabled](#Admin_asyncEnabled) |
| [Admin_availableFunctions](#Admin_availableFunctions) | [admin.availableFunctions](#Admin_availableFunctions) |
| [AdminLog_logMany](#AdminLog_logMany)     | [log.logMany](#AdminLog_logMany)          |
| [AdminLog_subscribe](#AdminLog_subscribe) | [log.subscribe](#AdminLog_subscribe)      |
| [AdminLog_subscriptions](#AdminLog_subscriptions) | [log.subscriptions](#AdminLog_subscriptions) |
| [AdminLog_unsubscribe](#AdminLog_unsubscribe) | [log.unsubscribe](#AdminLog_unsubscribe)  |
| [Allocator_bytesAllocated](#Allocator_bytesAllocated) | [allocator.bytesAllocated](#Allocator_bytesAllocated) |
| [Allocator_snapshot](#Allocator_snapshot) | [allocator.snapshot](#Allocator_snapshot) |
| [AuthorizedPasswords_add](#AuthorizedPasswords_add) | [authorizedPasswords.add](#AuthorizedPasswords_add) |
| [AuthorizedPasswords_list](#AuthorizedPasswords_list) | [authorizedPasswords.list](#AuthorizedPasswords_list) |
| [AuthorizedPasswords_remove](#AuthorizedPasswords_remove) | [authorizedPasswords.remove](#AuthorizedPasswords_remove) |
| [Core_exit](#Core_exit)                   | [core.exit](#Core_exit)                   |
| [Core_initTunnel](#Core_initTunnel)       | [core.initTunnel](#Core_initTunnel)       |
| [Core_pid](#Core_pid)                     | [core.pid](#Core_pid)                     |
| [InterfaceController_disconnectPeer](#InterfaceController_disconnectPeer) | [interfaceController.disconnectPeer](#InterfaceController_disconnectPeer) |
| [InterfaceController_peerStats](#InterfaceController_peerStats) | [interfaceController.peerStats](#InterfaceController_peerStats) |
| [IpTunnel_allowConnection](#IpTunnel_allowConnection) | [ipTunnel.allowConnection](#IpTunnel_allowConnection) |
| [IpTunnel_connectTo](#IpTunnel_connectTo) | [ipTunnel.connectTo](#IpTunnel_connectTo) |
| [IpTunnel_listConnections](#IpTunnel_listConnections) | [ipTunnel.listConnections](#IpTunnel_listConnections) |
| [IpTunnel_removeConnection](#IpTunnel_removeConnection) | [ipTunnel.removeConnection](#IpTunnel_removeConnection) |
| [IpTunnel_showConnection](#IpTunnel_showConnection) | [ipTunnel.showConnection](#IpTunnel_showConnection) |
| [Janitor_dumpRumorMill](#Janitor_dumpRumorMill) | [janitor.dumpRumorMill](#Janitor_dumpRumorMill) |
| [memory](#memory)                         | [admin.memory](#memory)                   |
| [NodeStore_dumpTable](#NodeStore_dumpTable) | [nodeStore.dumpTable](#NodeStore_dumpTable) |
| [NodeStore_getLink](#NodeStore_getLink)   | [nodeStore.getLink](#NodeStore_getLink)   |
| [NodeStore_getRouteLabel](#NodeStore_getRouteLabel) | [nodeStore.getRouteLabel](#NodeStore_getRouteLabel) |
| [NodeStore_nodeForAddr](#NodeStore_nodeForAddr) | [nodeStore.nodeForAddr](#NodeStore_nodeForAddr) |
| [ping](#ping)                             | [admin.ping](#ping)                       |
| [RouterModule_findNode](#RouterModule_findNode) | [routerModule.findNode](#RouterModule_findNode) |
| [RouterModule_getPeers](#RouterModule_getPeers) | [routerModule.getPeers](#RouterModule_getPeers) |
| [RouterModule_lookup](#RouterModule_lookup) | [routerModule.lookup](#RouterModule_lookup) |
| [RouterModule_nextHop](#RouterModule_nextHop) | [routerModule.nextHop](#RouterModule_nextHop) |
| [RouterModule_pingNode](#RouterModule_pingNode) | [routerModule.pingNode](#RouterModule_pingNode) |
| [SearchRunner_showActiveSearch](#SearchRunner_showActiveSearch) | [searchRunner.showActiveSearch](#SearchRunner_showActiveSearch) |
| [SearchRunner_search](#SearchRunner_search) | [searchRunner.search](#SearchRunner_search) |
| [Security_checkPermissions](#Security_checkPermissions) | [security.checkPermissions](#Security_checkPermissions) |
| [Security_chroot](#Security_chroot)       | [security.chroot](#Security_chroot)       |
| [Security_getUser](#Security_getUser)     | [security.getUser](#Security_getUser)     |
| [Security_nofiles](#Security_nofiles)     | [security.nofiles](#Security_nofiles)     |
| [Security_noforks](#Security_noforks)     | [security.noforks](#Security_noforks)     |
| [Security_seccomp](#Security_seccomp)     | [security.seccomp](#Security_seccomp)     |
| [Security_setupComplete](#Security_setupComplete) | [security.setupComplete](#Security_setupComplete) |
| [Security_setUser](#Security_setUser)     | [security.setUser](#Security_setUser)     |
| [SessionManager_getHandles](#SessionManager_getHandles) | [sessionManager.getHandles](#SessionManager_getHandles) |
| [SessionManager_sessionStats](#SessionManager_sessionStats) | [sessionManager.sessionStats](#SessionManager_sessionStats) |
| [SwitchPinger_ping](#SwitchPinger_ping)   | [switchPinger.ping](#SwitchPinger_ping)   |
| [UDPInterface_beginConnection](#UDPInterface_beginConnection) | [udpInterface.beginConnection](#UDPInterface_beginConnection) |
| [UDPInterface_new](#UDPInterface_new)     | [udpInterface.new](#UDPInterface_new)     |

<a name="Admin_asyncEnabled"></a>
### Admin_asyncEnabled, admin.asyncEnabled

Usage:
```js
channel = admin.asyncEnabled();
admin.once(channel, processResponse);
```

<a name="Admin_availableFunctions"></a>
### Admin_availableFunctions, admin.availableFunctions
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

<a name="AdminLog_logMany"></a>
### AdminLog_logMany, log.logMany
+ count, int, required

Usage:
```js
var channel,
    options;

options = {
    count: 0
};

channel = admin.log.logMany(options);
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

<a name="AdminLog_subscriptions"></a>
### AdminLog_subscriptions, log.subscriptions

Usage:
```js
channel = admin.log.subscriptions();
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

<a name="Core_pid"></a>
### Core_pid, core.pid

Usage:
```js
channel = admin.core.pid();
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
+ ip4Prefix, int, optional
+ ip6Address, string, optional
+ ip6Prefix, int, optional
+ publicKeyOfAuthorizedNode, string, required

Usage:
```js
var channel,
    options;

options = {
    ip4Address: '',
    ip4Prefix: 0,
    ip6Address: '',
    ip6Prefix: 0,
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

<a name="Janitor_dumpRumorMill"></a>
### Janitor_dumpRumorMill, janitor.dumpRumorMill
+ mill, string, required
+ page, int, required

Usage:
```js
var channel,
    options;

options = {
    mill: '',
    page: 0
};

channel = admin.janitor.dumpRumorMill(options);
admin.once(channel, processResponse);
```

<a name="memory"></a>
### memory, admin.memory

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
+ parent, string, optional

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
### ping, admin.ping

Usage:
```js
channel = admin.ping();
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

<a name="RouterModule_nextHop"></a>
### RouterModule_nextHop, routerModule.nextHop
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

channel = admin.routerModule.nextHop(options);
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

<a name="SearchRunner_search"></a>
### SearchRunner_search, searchRunner.search
+ ipv6, string, required
+ maxRequests, int, optional

Usage:
```js
var channel,
    options;

options = {
    ipv6: '',
    maxRequests: 0
};

channel = admin.searchRunner.search(options);
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

<a name="Security_chroot"></a>
### Security_chroot, security.chroot
+ root, string, required

Usage:
```js
var channel,
    options;

options = {
    root: ''
};

channel = admin.security.chroot(options);
admin.once(channel, processResponse);
```

<a name="Security_getUser"></a>
### Security_getUser, security.getUser
+ user, string, optional

Usage:
```js
var channel,
    options;

options = {
    user: ''
};

channel = admin.security.getUser(options);
admin.once(channel, processResponse);
```

<a name="Security_nofiles"></a>
### Security_nofiles, security.nofiles

Usage:
```js
channel = admin.security.nofiles();
admin.once(channel, processResponse);
```

<a name="Security_noforks"></a>
### Security_noforks, security.noforks

Usage:
```js
channel = admin.security.noforks();
admin.once(channel, processResponse);
```

<a name="Security_seccomp"></a>
### Security_seccomp, security.seccomp

Usage:
```js
channel = admin.security.seccomp();
admin.once(channel, processResponse);
```

<a name="Security_setupComplete"></a>
### Security_setupComplete, security.setupComplete

Usage:
```js
channel = admin.security.setupComplete();
admin.once(channel, processResponse);
```

<a name="Security_setUser"></a>
### Security_setUser, security.setUser
+ keepNetAdmin, int, required
+ uid, int, required

Usage:
```js
var channel,
    options;

options = {
    keepNetAdmin: 0,
    uid: 0
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
