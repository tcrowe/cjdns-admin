'use strict';

var assert = require('assert'),
    mocha = require('mocha'),
    describe = mocha.describe,
    it = mocha.it,
    createAdmin = require('../lib/admin'),
    admin,
    port = process.env.CJDNS_ADMIN_PORT || 11234,
    ip = process.env.CJDNS_ADMIN_IP || '127.0.0.1',
    password;

if (!process.env.CJDNS_ADMIN_PASSWORD) {
    throw new Error('the environment variable `CJDNS_ADMIN_PASSWORD` is required to run these tests');
}

// set this environment variable to make it work
password = process.env.CJDNS_ADMIN_PASSWORD;

function assertObject(obj) {
    return function () {
        assert.equal(typeof obj, 'object');
    };
}

describe('createAdmin', function () {
    describe('constructor, password only', function () {
        admin = createAdmin({
            password: password
        });
        it('should return an object', assertObject(admin));
    });

    describe('constructor, ip and password', function () {
        admin = createAdmin({
            ip: ip,
            password: password
        });
        it('should return an object', assertObject(admin));
    });

    describe('constructor, port and password', function () {
        admin = createAdmin({
            port: port,
            password: password
        });
        it('should return an object', assertObject(admin));
    });

    describe('constructor, full', function () {
        admin = createAdmin({
            ip: ip,
            port: port,
            password: password,
            autoClean: true
        });
        it('should return an object', assertObject(admin));
    });
});
