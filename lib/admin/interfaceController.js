
module.exports = function(admin) {
	var request = admin.request,
		disconnectPeer,
		peerStats;

	disconnectPeer = request.auto({
		restricted: true,
		func: 'InterfaceController_disconnectPeer',
		args: {
			pubkey: {
				required: true,
				type: 'string'
			}
		}
	});

	peerStats = request.auto({
		restricted: true,
		func: 'InterfaceController_peerStats',
		args: {
			page: {
				required: false,
				type: 'int'
			}
		}
	});

	admin.InterfaceController_disconnectPeer = disconnectPeer;
	admin.InterfaceController_peerStats = peerStats;

	admin.interfaceController = {
		disconnectPeer: disconnectPeer,
		peerStats: peerStats
	};
};
