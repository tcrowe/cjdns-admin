'use strict';

var requestResponse = require('./request-response'),
    testUser1 = 'testuser' + Math.random().toString().substring(2, 8),
    testUser2 = 'testuser' + Math.random().toString().substring(2, 8);

//
// AuthorizedPasswords_add
//
requestResponse({
    name: 'authorizedPasswords.add',
    member: 'authorizedPasswords.add',
    options: {
        user: testUser2,
        password: testUser2
    },
    skip: true
});

//
// AuthorizedPasswords_list
//
requestResponse({
    name: 'authorizedPasswords.list',
    member: 'authorizedPasswords.list'
});

//
// AuthorizedPasswords_remove
//
// sometimes this one crashes cjdroute
requestResponse({
    name: 'authorizedPasswords.remove',
    member: 'authorizedPasswords.remove',
    options: {
        user: testUser2
    },
    logResponse: true,
    skip: true
});
