
module.exports = function(admin) {
	var request = admin.request,
		allowConnection,
		connectTo,
		listConnections,
		showConnection;

	allowConnection = request.auto({
		restricted: true,
		func: 'IpTunnel_allowConnection',
		args: {
			ip4Address: {
				required: false,
				type: 'string'
			},
			ip6Address: {
				required: false,
				type: 'string'
			},
			publicKeyOfAuthorizedNode: {
				required: true,
				type: 'string'
			}
		}
	});

	connectTo = request.auto({
		restricted: true,
		func: 'IpTunnel_connectTo',
		args: {
			publicKeyOfAuthorizedNode: {
				required: true,
				type: 'string'
			}
		}
	});

	listConnections = request.auto({
		restricted: true,
		func: 'IpTunnel_listConnections'
	});

	removeConnection = request.auto({
		restricted: true,
		func: 'IpTunnel_removeConnection',
		args: {
			connection: {
				required: true,
				type: 'int'
			}
		}
	});

	showConnection = request.auto({
		restricted: false,
		func: 'IpTunnel_showConnection',
		args: {
			connection: {
				required: true,
				type: 'int'
			}
		}
	});

	admin.IpTunnel_allowConnection = allowConnection;
	admin.IpTunnel_connectTo = connectTo;
	admin.IpTunnel_listConnections = listConnections;
	admin.IpTunnel_removeConnection = removeConnection;
	admin.IpTunnel_showConnection = showConnection;

	admin.ipTunnel = {
		allowConnection: allowConnection,
		connectTo: connectTo,
		listConnections: listConnections,
		removeConnection: removeConnection,
		showConnection: showConnection
	};

};
