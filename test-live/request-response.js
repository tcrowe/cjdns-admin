'use strict';

var assert = require('assert'),
    mocha = require('mocha'),
    cjdnsAdmin = require('../index'),
    describe = mocha.describe,
    it = mocha.it,
    admin;

admin = cjdnsAdmin.createAdmin({
    host: process.env.CJDNS_ADMIN_IP,
    port: process.env.CJDNS_ADMIN_PORT,
    password: process.env.CJDNS_ADMIN_PASSWORD
});

/**
 * Test a standard request-response admin function.
 * @param  {string} options.name        The admin function name for display purposes.
 * @param  {function} options.member      The admin function.
 * @param  {object} options.options     The `args` associated with the function.
 * @param  {boolean} options.logResponse Log the response to the console for debugging.
 */
function requestResponse(options) {
    var name,
        member,
        memberParts,
        memberOptions,
        logResponse;

    // the name for the suite, passed to `describe`
    name = options.name;

    // the member is currently a string, we need to convert to
    // something like admin[member]
    member = options.member;
    if (member.indexOf('.') > -1) {
        memberParts = member.split('.');
        member = admin[memberParts[0]][memberParts[1]];
    } else {
        member = admin[member];
    }

    if (options.options) {
        memberOptions = options.options;
    }

    if (options.logResponse) {
        logResponse = options.logResponse;
    }

    if (options.skip) {
        console.log('skipping test', name);
        return;
    }

    describe('#' + name, function () {
        it('should get a response', function (done) {
            var channel;

            if (memberOptions) {
                channel = member(memberOptions);
            } else {
                channel = member();
            }

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

module.exports = requestResponse;
