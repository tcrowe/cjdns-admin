
module.exports = function(admin) {
	var request = admin.request,
		addKey,
		addServer,
		minSignatures;

	addKey = request.auto({
		restricted: false,
		func: 'RainflyClient_addKey',
		args: {
			ident: {
				required: true,
				type: 'string'
			}
		}
	});

	addServer = request.auto({
		restricted: false,
		func: 'RainflyClient_addServer',
		args: {
			addr: {
				required: true,
				type: 'string'
			}
		}
	});

	minSignatures = request.auto({
		restricted: false,
		func: 'RainflyClient_minSignatures',
		args: {
			nodeToQuery: {
				required: true,
				type: 'string'
			},
			target: {
				required: true,
				type: 'string'
			},
			timeout: {
				required: false,
				type: 'int'
			}
		}
	});

	admin.RainflyClient_addKey = addKey;
	admin.RainflyClient_addServer = addServer;
	admin.RainflyClient_minSignatures = minSignatures;

	admin.rainflyClient = {
		addKey: addKey,
		addServer: addServer,
		minSignatures: minSignatures
	};
	
};
