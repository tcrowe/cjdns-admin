'use strict';

var requestResponse = require('./request-response'),
    utilities = require('../lib/utilities');
//
// IpTunnel_allowConnection
//
requestResponse({
    name: 'ipTunnel.allowConnection, ipv4',
    member: 'ipTunnel.allowConnection',
    options: {
        ip4Address: '127.0.0.1',
        publicKeyOfAuthorizedNode: '0000000000000000000000000000000000000000000000000000.k'
    },
    skip: true
});

requestResponse({
    name: 'ipTunnel.allowConnection, ipv6',
    member: 'ipTunnel.allowConnection',
    options: {
        ip6Address: utilities.expand6('0:0:0:0:0:0:0:1'),
        publicKeyOfAuthorizedNode: '0000000000000000000000000000000000000000000000000000.k'
    },
    skip: true
});

//
// IpTunnel_connectTo
//


//
// IpTunnel_listConnections
//


//
// IpTunnel_removeConnection
//


//
// IpTunnel_showConnection
//
