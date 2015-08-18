module.exports = function(admin) {
	var request = admin.request,
		logMany,
		subscribe,
		subscriptions,
		unsubscribe;

	logMany = request.auto({
		restricted: true,
		func: 'AdminLog_logMany',
		args: {
			count: {
				required: true,
				type: 'int'
			}
		}
	});

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
				type: 'int'
			}
		}
	});

	subscriptions = request.auto({
		restricted: true,
		func: 'AdminLog_subscriptions'
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

	admin.AdminLog_logMany = logMany;
	admin.AdminLog_subscribe = subscribe;
	admin.AdminLog_subscriptions = subscriptions;
	admin.AdminLog_unsubscribe = unsubscribe;

	admin.log = {
		logMany: logMany,
		subscribe: subscribe,
		subscriptions: subscriptions,
		unsubscribe: unsubscribe
	};
};
