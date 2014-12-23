module.exports = function(admin) {
	var request = admin.request,
		ping;

	ping = request.auto({
		restricted: false,
		func: 'SwitchPinger_ping',
		args: {
			data: {
				required: false,
				type: 'string'
			},
			keyPing: {
				required: false,
				type: 'int'
			},
			path: {
				required: true,
				type: 'string'
			},
			timeout: {
				required: false,
				type: 'int'
			}
		}
	});

	admin.SwitchPinger_ping = ping;

	admin.switchPinger = {
		ping: ping
	};

};

