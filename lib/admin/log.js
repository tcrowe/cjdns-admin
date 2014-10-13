
module.exports = function (admin) {
	var request = admin.request,
		subscribe,
		unsubscribe;

	subscribe = request.auto({
		restricted: true,
		keepAlive: true,
		func: 'AdminLog_subscribe',
		args: {
			file: {
				required: false,
				type: 'string'
			},
			level: {
				required: false,
				type: 'string'
			},
			line: {
				required: false,
				type: 'number'
			}
		}
	});

	unsubscribe = request.auto({
		restricted: true,
		func: 'AdminLog_unsubscribe',
		args: {
			streamId: {
				required: true,
				type: 'string'
			}
		}
	});

	admin.AdminLog_subscribe = subscribe;
	admin.AdminLog_unsubscribe = unsubscribe;

	admin.log = {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
};
