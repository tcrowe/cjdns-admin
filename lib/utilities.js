var crypto = require('crypto');
var utilities = {},
	validation = utilities.validation = {},
	v6digitPattern = /^[0-9a-f]{0,4}$/,
	BYTE_MAX = 255,
	INT_MAX = 65535;

var numForAscii = [
  99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,
  99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,
  99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,
   0, 1, 2, 3, 4, 5, 6, 7, 8, 9,99,99,99,99,99,99,
  99,99,10,11,12,99,13,14,15,99,16,17,18,19,20,99,
  21,22,23,24,25,26,27,28,29,30,31,99,99,99,99,99,
  99,99,10,11,12,99,13,14,15,99,16,17,18,19,20,99,
  21,22,23,24,25,26,27,28,29,30,31,99,99,99,99,99,
];

module.exports = utilities;

/**
 * Validate an IPv4 address.
 * @param  {string} ip The IPv4 to validate.
 * @return {boolean}    Returns true if the IPv4 is valid.
 */
validation.ipv4 = function(ip) {
	var digits,
		validDigits = 0;

	// ip is required
	if (!ip) {
		return false;
	}

	// ip must be a string
	if (ip && typeof ip !== 'string') {
		return false;
	}

	digits = ip.split('.');

	// ip must have 4 parts
	if (digits.length !== 4) {
		return false;
	}

	// go through each byte and see if it's valid
	digits.forEach(function(digit) {
		digit = parseInt(digit);
		if (!isNaN(digit) && digit >= 0 && digit <= BYTE_MAX) {
			// this is a valid ipv4 digit
			validDigits += 1;
		}
	});

	// the ip must have 4 valid digit numbers
	if (validDigits !== 4) {
		return false;
	}

	// it's valid
	return true;
};

/**
 * Validate an IPv6 address.
 * @param  {string} ip The IPv6 to validate.
 * @return {boolean}    Returns true if the IPv6 is valid.
 */
validation.ipv6 = function(ip) {
	var digits,
		validDigits = 0;

	// they have to pass something
	if (!ip) {
		return false;
	}

	// it has to be a string
	if (typeof ip !== 'string') {
		return false;
	}

	// convert to lower and split by colon
	digits = ip.toLowerCase().split(':');

	// ip must have 8 parts
	if (digits.length !== 8) {
		return false;
	}

	// each digit must be a hexidecimal number
	// each digit must be between 0 and 65535
	digits.forEach(function(digit) {
		if (digit.length === 0) {
			digit = 0;
		}
		if (v6digitPattern.test(digit)) {
			digit = parseInt('0x' + digit);
			if (!isNaN(digit) && digit >= 0 && digit <= INT_MAX) {
				// this is a valid ipv6 digit
				validDigits += 1;
			}
		}
	});

	// must have 8 valid digits
	if (validDigits !== 8) {
		return false;
	}

	// it's valid
	return true;

};

/**
 * Validate the input is an unsigned int. 0 to INT_MAX
 * @return {[type]} [description]
 */
validation.unsignedInt = function(num) {
	// can't be blank
	if (!num) {
		return false;
	}

	// parse it
	num = parseInt(num);

	// must be numeric
	if (isNaN(num)) {
		return false;
	}

	// must be from 0 to INT_MAX
	if (num < 0 || num > INT_MAX) {
		// out of range
		return false;
	}

	// it is an int and in range
	return true;
};

/**
 * Formats the IPV6 digits padding with zeros if it's less than four digits.
 * @param  {string} ipv6
 * @return {string}      ipv6
 */
utilities.expand6 = function(ipv6) {
	var digits = ipv6.toString().toLowerCase().split(':');
	digits = digits.map(function(item) {
		if (item.length === 3) {
			item = '0' + item;
		} else if (item.length === 2) {
			item = '00' + item;
		} else if (item.length === 1) {
			item = '000' + item;
		} else if (item.length === 0) {
			item = '0000';
		}
		return item;
	});
	return digits.join(':');
};

/**
 * Decodes a base32-encoded string into a BUffer
 * @param {string} base32-encoded string
 * @return {Buffer} the decoded input
 */
utilities.b32Decode = function(input) {
	var output = [];
	var outputIndex = 0;
	var inputIndex = 0;
	var nextByte = 0;
	var bits = 0;

	while (inputIndex < input.length) {
		var o = input.charCodeAt(inputIndex);
		if (o & 0x80) { throw new Error(); }
		var b = numForAscii[o];
		inputIndex++;
		if (b > 31) { throw new Error("bad character " + input[inputIndex] + " in " + input); }

		nextByte |= (b << bits);
		bits += 5;

		if (bits >= 8) {
			output[outputIndex] = nextByte & 0xff;
			outputIndex++;
			bits -= 8;
			nextByte >>= 8;
		}
	}

	if (bits >= 5 || nextByte) {
		throw new Error("bits is " + bits + " and nextByte is " + nextByte);
	}

	return new Buffer(output);
};

/**
 * Converts a public key to an IPv6 address
 * @param {string} base32-encoded public key
 * @return {string} ipv6
 */
utilities.publicKeyToIPv6 = function(publicKey) {
	var chunks, hexdigest;
	var hash1 = crypto.createHash('sha512');
	var hash2 = crypto.createHash('sha512');

	// Strip off the ".k" at the end
	publicKey = publicKey.substring(0, 52);

	hash1.update(utilities.b32Decode(publicKey));
	hash2.update(hash1.digest('binary'));

	hexdigest = hash2.digest('hex').substring(0, 32);
	chunks = [];
	for (var j = 0; j < 32; j += 4) {
		chunks.push(hexdigest.substring(j, j + 4));
	}

	return chunks.join(":");
};
