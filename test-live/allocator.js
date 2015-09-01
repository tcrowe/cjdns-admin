'use strict';

var requestResponse = require('./request-response');

//
// Allocator_bytesAllocated
//
requestResponse({
    name: 'allocator.bytesAllocated',
    member: 'allocator.bytesAllocated'
});

//
// Allocator_snapshot
//
requestResponse({
    name: 'allocator.snapshot',
    member: 'allocator.snapshot',
    skip: true
});

requestResponse({
    name: 'allocator.snapshot, with arguments',
    member: 'allocator.snapshot',
    options: {
        includeAllocations: 1
    },
    skip: true
});
