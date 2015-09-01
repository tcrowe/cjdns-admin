'use strict';

var requestResponse = require('./request-response');

//
// InterfaceController_disconnectPeer
//
requestResponse({
    name: 'interfaceController.disconnectPeer',
    member: 'interfaceController.disconnectPeer',
    options: {
        pubkey: ''
    },
    skip: true
});

//
// InterfaceController_peerStats
//
requestResponse({
    name: 'interfaceController.peerStats',
    member: 'interfaceController.peerStats'
});

requestResponse({
    name: 'interfaceController.peerStats',
    member: 'interfaceController.peerStats',
    options: {
        page: 0
    }
});
