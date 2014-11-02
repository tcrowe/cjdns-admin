
module.exports = function(admin) {
	var request = admin.request,
		exit,
		initTunnel;

	exit = request.auto({
		restricted: true,
		func: 'Core_exit'
	});

	initTunnel = request.auto({
		restricted: false,
		func: 'Core_initTunnel',
		args: {
			desiredTunName: {
				required: false,
				type: 'string'
			}
		}
	});

	admin.Core_exit = exit;
	admin.Core_initTunnel = initTunnel;

	admin.core = {
		exit: exit,
		initTunnel: initTunnel
	};

};
