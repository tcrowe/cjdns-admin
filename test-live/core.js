'use strict';

var requestResponse = require('./request-response');

//
// Core_exit
//
requestResponse({
    name: 'core.exit',
    member: 'core.exit',
    logResponse: true,
    skip: true
});

//
// Core_initTunnel
//
requestResponse({
    name: 'core.initTunnel',
    member: 'core.initTunnel',
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
    name: 'core.pid',
    member: 'core.pid',
});
