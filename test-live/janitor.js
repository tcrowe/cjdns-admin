'use strict';

var requestResponse = require('./request-response');

//
// Janitor_dumpRumorMill
//
requestResponse({
    name: 'janitor.dumpRumorMill',
    member: 'janitor.dumpRumorMill',
    options: {
        mill: 'dump-rumor-mill-test',
        page: 0
    },
    skip: true
});
