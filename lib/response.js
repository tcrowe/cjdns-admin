var bencode = require('bencode');

function auto(admin) {
	return function responseEmitter(msg) {
		var data,
			channel = null,
			request = null,
			func = null,
			args = null,
			model = null,
			errors = [],
			res;

		data = bencode.decode(msg, 'utf8');
		if (data) {
			if (data.txid) {
				channel = data.txid;
				request = admin.requests[channel];
				args = request.args;
				func = request.aq || request.q;
				model = admin.models[func];
			}
			if (data.error && data.error !== 'none') {
				errors.push(data.error);
			}
		}

		// build the response
		res = {
			channel: channel,
			func: func,
			model: model,
			args: args,
			request: request,
			data: data,
			errors: errors
		};

		// emit the response
		if (!channel) {
			channel = 'misc';
		}
		admin.emit(channel, res);

		// auto clean
		if (admin.config.autoClean && model.keepAlive !== true) {
			delete admin.requests[channel];
		}
	};
}

function error(admin) {
	return function errorEmitter(request, errors) {
		var channel = request.txid,
			func = request.aq || request.q,
			model = admin.models[func],
			res;

		// force errors into an array
		if (errors && !Array.isArray(errors)) {
			errors = [errors];
		}

		// build the response
		res = {
			channel: channel,
			func: func,
			model: model,
			args: request.args || null,
			request: request,
			data: null,
			errors: errors
		};

		// emit the response
		admin.emit(channel, res);

		// auto clean
		if (admin.config.autoClean && model.keepAlive !== true) {
			console.log('deleting', channel);
			delete admin.requests[channel];
		}
	};
}

module.exports = function(admin) {
	return {
		auto: auto(admin),
		error: error(admin)
	};
};
