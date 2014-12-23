module.exports = function(requestResponse, admin) {

	//
	// NodeStore_dumpTable
	//
	requestResponse({
		name: 'NodeStore_dumpTable',
		member: admin.NodeStore_dumpTable,
		options: {
			page: 0
		}
	});

	//
	// NodeStore_getLink
	//
	// TODO figure out how to use this
	/*requestResponse('NodeStore_getLink',
		admin.NodeStore_getLink);
	requestResponse('NodeStore_getLink, with arguments',
		admin.NodeStore_dumpTable,
		{ linkNum: 0, parent: '???' });*/

	//
	// NodeStore_getRouteLabel
	//
	// TODO figure out how to use this
	/*requestResponse('NodeStore_getRouteLabel',
		admin.NodeStore_getRouteLabel,
		{ pathParentToChild: '???', pathToParent: '???' });*/

	//
	// NodeStore_nodeForAddr
	//
	// TODO figure out how to use this
	/*requestResponse('NodeStore_nodeForAddr',
		admin.NodeStore_nodeForAddr,
		{ ip: '???' });*/
	
};
