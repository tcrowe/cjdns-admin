
module.exports = function(admin) {
	var request = admin.request,
		dumpTable,
		getLink,
		getRouteLabel,
		nodeForAddr;

	dumpTable = request.auto({
		restricted: true,
		func: 'NodeStore_dumpTable',
		args: {
			page: {
				required: false,
				type: 'int'
			}
		}
	});

	getLink = request.auto({
		restricted: true,
		func: 'NodeStore_getLink',
		args: {
			linkNum: {
				required: true,
				type: 'int'
			},
			parent: {
				required: true,
				type: 'string'
			}
		}
	});

	getRouteLabel = request.auto({
		restricted: true,
		func: 'NodeStore_getRouteLabel',
		args: {
			pathParentToChild: {
				required: true,
				type: 'string'
			},
			pathToParent: {
				required: true,
				type: 'string'
			}
		}
	});

	nodeForAddr = request.auto({
		restricted: true,
		func: 'NodeStore_nodeForAddr',
		args: {
			ip: {
				required: false,
				type: 'string'
			}
		}
	});

	admin.NodeStore_dumpTable = dumpTable;
	admin.NodeStore_getLink = getLink;
	admin.NodeStore_getRouteLabel = getRouteLabel;
	admin.NodeStore_nodeForAddr = nodeForAddr;

	admin.nodeStore = {
		dumpTable: dumpTable,
		getLink: getLink,
		getRouteLabel: getRouteLabel,
		nodeForAddr: nodeForAddr
	};
};
