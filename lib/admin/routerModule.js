
module.exports = function(admin) {
	var request = admin.request,
		findNode,
		getPeers,
		lookup,
		nextHop,
		pingNode;

	findNode = request.auto({
		restricted: false,
		func: 'RouterModule_findNode',
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

	getPeers = request.auto({
		restricted: false,
		func: 'RouterModule_getPeers',
		args: {
			nearbyPath: {
				required: false,
				type: 'string'
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

	lookup = request.auto({
		restricted: false,
		func: 'RouterModule_lookup',
		args: {
			address: {
				required: true,
				type: 'string'
			}
		}
	});

	nextHop = request.auto({
		restricted: false,
		func: 'RouterModule_nextHop',
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

	pingNode = request.auto({
		restricted: false,
		func: 'RouterModule_pingNode',
		args: {
			path: {
				required: false,
				type: 'string'
			},
			timeout: {
				required: false,
				type: 'int'
			}
		}
	});

	admin.RouterModule_findNode = findNode;
	admin.RouterModule_getPeers = getPeers;
	admin.RouterModule_lookup = lookup;
	admin.RouterModule_nextHop = nextHop;
	admin.RouterModule_pingNode = pingNode;

	admin.routerModule = {
		findNode: findNode,
		getPeers: getPeers,
		lookup: lookup,
		nextHop: nextHop,
		pingNode: pingNode
	};

};
