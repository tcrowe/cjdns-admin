var bencode = require('bencode'),
	crypto = require('crypto');

function send(admin, funcObj, options) {
	var func = funcObj.func,
		channel = func + Math.random().toString().substring(2, 8),
		socket = admin.socket,
		restricted = funcObj.restricted || false,
		funcArgs = funcObj.args,
		req = {},
		buf,
		port = admin.config.port,
		ip = admin.config.ip,
		password = admin.config.password,
		cookieChannel;

	req.q = func;
	req.txid = channel;

	// TODO validate requests against the funcObj model

	function send_complete(err) {
		if (err) {
			return admin.response.error(req, err);
		}
	}

	if (funcArgs !== null &&
		options !== null &&
		typeof funcArgs === 'object' &&
		typeof options === 'object') {
		req.args = options;
	}

	if (restricted) {
		req.q = 'auth';
		req.aq = func;
		cookieChannel = admin.cookie();
		admin.requests[cookieChannel] = req;
		admin.once(cookieChannel, function(res) {
			var hash,
				sha256,
				cookieText;

			cookieText = res.data.cookie.toString();

			// compute the hash for this packet
			req.cookie = cookieText;
			hash = password + cookieText;
			sha256 = crypto.createHash('sha256');
			sha256.update(hash);
			hash = sha256.digest('hex');
			req.hash = hash;
			hash = bencode.encode(req);
			sha256 = crypto.createHash('sha256');
			sha256.update(hash);
			hash = sha256.digest('hex');
			req.hash = hash;

			admin.requests[channel] = req;
			buf = Buffer(bencode.encode(req));
			admin.socket.send(buf, 0, buf.length, port, ip, send_complete);
		});
	} else {
		admin.requests[channel] = req;
		buf = Buffer(bencode.encode(req));
		admin.socket.send(buf, 0, buf.length, port, ip, send_complete);
	}

	return channel;
}

function auto(admin) {
	return function autoPrepare(funcObj) {
		// save the request model
		admin.models[funcObj.func] = funcObj;
		return function autoSender(options) {
			return send(admin, funcObj, options);
		};
	};
}

module.exports = function(admin) {
	return {
		auto: auto(admin)
	};
};
