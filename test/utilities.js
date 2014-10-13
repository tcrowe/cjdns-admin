
var assert = require('assert'),
	utilities = require('../lib/utilities'),
	validation = utilities.validation;

describe('ipv4 validation', function () {
	it('returns `false` if nothing is passed', function () {
		assert.equal(validation.ipv4(), false);
	});
	it('returns `false` if anything but a string is passed', function () {
		assert.equal(validation.ipv4(undefined), false);
		assert.equal(validation.ipv4(null), false);
		assert.equal(validation.ipv4(1), false);
		assert.equal(validation.ipv4(true), false);
		assert.equal(validation.ipv4(new Date()), false);
		assert.equal(validation.ipv4({}), false);
		assert.equal(validation.ipv4(function () {}), false);
	});
	it('returns `false` the ipv4 is too short', function () {
		assert.equal(validation.ipv4('0.0.0'), false);
	});
	it('returns `false` if the digits are out of range', function () {
		assert.equal(validation.ipv4('127.300.23.5'), false);
	});
	it('returns `true` if a valid ipv4 is passed', function () {
		assert.equal(validation.ipv4('127.0.0.1'), true);
	});
});

describe('ipv6 validation', function () {
	// TODO this currently requires the full 8 colons, could be better
	it('returns `false` if nothing is passed', function () {
		assert.equal(validation.ipv6(), false);
	});
	it('returns `false` if anything but a string is passed', function () {
		assert.equal(validation.ipv6(undefined), false);
		assert.equal(validation.ipv6(null), false);
		assert.equal(validation.ipv6(1), false);
		assert.equal(validation.ipv6(true), false);
		assert.equal(validation.ipv6(new Date()), false);
		assert.equal(validation.ipv6({}), false);
		assert.equal(validation.ipv6(function () {}), false);
	});
	it('returns `false` the ipv6 is too short', function () {
		assert.equal(validation.ipv6('0000:0000:0000:0000:0000:0000:0000'), false);
	});
	it('returns `false` if the digits are out of range', function () {
		assert.equal(validation.ipv6('0000:0000:fffff:0000:0000:fffff:0000:0000'), false);
	});
	it('returns `true` if a valid ipv6 is passed', function () {
		assert.equal(validation.ipv6('0000:ffff:0000:ffff:0000:ffff:0000:ffff'), true);
		assert.equal(validation.ipv6('::::0000:ffff:0000:ffff'), true);
	});
});

describe('ipv6 formatting', function () {
	// TODO could make this better and add more test cases
	it('convert short form to long form', function () {
		assert.equal(utilities.expand6('::::0000:fff:0000:fff'), '0000:0000:0000:0000:0000:0fff:0000:0fff');
	});
});

describe('unsignedInt validation', function () {
	it('returns `false` if nothing is passed', function () {
		assert.equal(validation.unsignedInt(), false);
	});
	it('returns `false` if anything but a number is passed', function () {
		assert.equal(validation.unsignedInt(undefined), false);
		assert.equal(validation.unsignedInt(null), false);
		assert.equal(validation.unsignedInt('hello'), false);
		assert.equal(validation.unsignedInt(true), false);
		assert.equal(validation.unsignedInt(new Date()), false);
		assert.equal(validation.unsignedInt({}), false);
		assert.equal(validation.unsignedInt(function () {}), false);
	});
	it('returns `false` if out of range', function () {
		assert.equal(validation.unsignedInt(-5), false);
		assert.equal(validation.unsignedInt(70000), false);
	});
});
